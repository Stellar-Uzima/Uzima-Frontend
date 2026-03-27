"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const STORAGE_KEYS = {
    VISITS: "uzima-pwa-visits",
    DISMISSED_UNTIL: "uzima-pwa-dismissed-until",
    HAS_INTERACTED: "uzima-pwa-has-interacted",
};

const DISMISS_DURATION_DAYS = 7;
const TIME_REQUIREMENT_SECONDS = 60;

export function usePwaInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);
    const [canShowPrompt, setCanShowPrompt] = useState(false);

    // Initialize tracking
    useEffect(() => {
        // 1. Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
            return;
        }

        // 2. Track visits
        const visits = parseInt(localStorage.getItem(STORAGE_KEYS.VISITS) || "0", 10);
        localStorage.setItem(STORAGE_KEYS.VISITS, (visits + 1).toString());

        // 3. Listen for events
        const handleBeforePrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        const handleAppInstalled = () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        };

        window.addEventListener("beforeinstallprompt", handleBeforePrompt);
        window.addEventListener("appinstalled", handleAppInstalled);

        // 4. Time tracking (60s)
        let timeElapsed = 0;
        const timer = setInterval(() => {
            timeElapsed += 1;
            if (timeElapsed >= TIME_REQUIREMENT_SECONDS) {
                checkCriteria();
            }
        }, 1000);

        // 5. Interaction Tracking
        const handleInteraction = () => {
            localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, "true");
            checkCriteria();
            // Remove listeners once interaction is recorded
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
        };

        window.addEventListener("click", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);

        // Initial check
        const checkCriteria = () => {
            const currentVisits = parseInt(localStorage.getItem(STORAGE_KEYS.VISITS) || "0", 10);
            const hasInteracted = localStorage.getItem(STORAGE_KEYS.HAS_INTERACTED) === "true";
            const dismissedUntil = parseInt(localStorage.getItem(STORAGE_KEYS.DISMISSED_UNTIL) || "0", 10);
            const isCoolingDown = Date.now() < dismissedUntil;

            const meetsVisits = currentVisits >= 2;
            const meetsTime = timeElapsed >= TIME_REQUIREMENT_SECONDS;

            if (meetsVisits && meetsTime && hasInteracted && !isCoolingDown) {
                setCanShowPrompt(true);
            }
        };

        checkCriteria();

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforePrompt);
            window.removeEventListener("appinstalled", handleAppInstalled);
            window.removeEventListener("click", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            clearInterval(timer);
        };
    }, []);

    // Show prompt when criteria are met and we have a deferred prompt
    useEffect(() => {
        if (canShowPrompt && deferredPrompt && !isInstalled) {
            setShowPrompt(true);
        }
    }, [canShowPrompt, deferredPrompt, isInstalled]);

    const handleInstall = useCallback(async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    }, [deferredPrompt]);

    const dismissPrompt = useCallback(() => {
        setShowPrompt(false);
        const retryDate = Date.now() + DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEYS.DISMISSED_UNTIL, retryDate.toString());
    }, []);

    return {
        isInstalled,
        showPrompt,
        deferredPrompt: !!deferredPrompt,
        handleInstall,
        dismissPrompt,
    };
}
