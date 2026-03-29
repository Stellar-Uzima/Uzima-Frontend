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

function isIosSafari() {
  const ua = window.navigator.userAgent;
  const isIOS = /iPhone|iPad|iPod/.test(ua);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS/.test(ua);
  return isIOS && isSafari;
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [canShowPrompt, setCanShowPrompt] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    // 1. Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    // 2. Detect iOS Safari
    if (isIosSafari()) {
      setIsIos(true);
    }

    // 3. Track visits
    const visits = parseInt(localStorage.getItem(STORAGE_KEYS.VISITS) || "0", 10);
    localStorage.setItem(STORAGE_KEYS.VISITS, (visits + 1).toString());

    // 4. Listen for Android beforeinstallprompt
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

    // 5. Time tracking (60s)
    let timeElapsed = 0;
    const timer = setInterval(() => {
      timeElapsed += 1;
      if (timeElapsed >= TIME_REQUIREMENT_SECONDS) {
        checkCriteria();
      }
    }, 1000);

    // 6. Interaction Tracking
    const handleInteraction = () => {
      localStorage.setItem(STORAGE_KEYS.HAS_INTERACTED, "true");
      checkCriteria();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    // 7. Criteria check
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

  // Show prompt when criteria are met
  useEffect(() => {
    if (canShowPrompt && !isInstalled) {
      if (isIos) {
        setShowPrompt(true); // show custom iOS instructions
      } else if (deferredPrompt) {
        setShowPrompt(true); // show Android native prompt
      }
    }
  }, [canShowPrompt, deferredPrompt, isInstalled, isIos]);

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
    isIos,
    deferredPrompt: !!deferredPrompt,
    handleInstall,
    dismissPrompt,
  };
}
