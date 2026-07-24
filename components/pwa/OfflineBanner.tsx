"use client";

import React, { useEffect, useRef, useState } from "react";
import { WifiOff, Wifi, X } from "lucide-react";
import { cn } from "@/lib/utils";

const SESSION_KEY = "offline-banner-dismissed";

function getDismissed(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "true";
  } catch {
    return false;
  }
}

function setDismissed(value: boolean) {
  try {
    if (value) {
      sessionStorage.setItem(SESSION_KEY, "true");
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {}
}

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initOnline = navigator.onLine;
    setIsOnline(initOnline);

    if (!initOnline) {
      setHasBeenOffline(true);
      setShowBanner(!getDismissed());
    }

    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
      setShowBanner(true);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }

      reconnectTimeoutRef.current = setTimeout(() => {
        setShowBanner(false);
        // Delay clearing hasBeenOffline until after the CSS transition finishes
        // (300 ms matches the `duration-300` on the banner's transform).
        setTimeout(() => setHasBeenOffline(false), 300);
      }, 5000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasBeenOffline(true);
      setDismissed(false);
      setShowBanner(true);
    };

    const handleNavigation = () => {
      if (!navigator.onLine) {
        setDismissed(false);
        setShowBanner(true);
      }
    };

    const originalPushState = history.pushState.bind(history);
    history.pushState = (...args) => {
      originalPushState(...args);
      handleNavigation();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("popstate", handleNavigation);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("popstate", handleNavigation);
      history.pushState = originalPushState;

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const clearOffset = () => {
      root.style.setProperty("--offline-banner-offset", "0px");
    };

    if (!showBanner) {
      clearOffset();
      return;
    }

    const updateBannerOffset = () => {
      const height = bannerRef.current?.offsetHeight ?? 0;
      root.style.setProperty("--offline-banner-offset", `${height}px`);
    };

    updateBannerOffset();

    const observer =
      typeof ResizeObserver !== "undefined" && bannerRef.current
        ? new ResizeObserver(updateBannerOffset)
        : null;

    if (observer && bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    window.addEventListener("resize", updateBannerOffset);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateBannerOffset);
      clearOffset();
    };
  }, [isOnline, showBanner]);

  const handleDismiss = () => {
    setShowBanner(false);
    if (!isOnline) {
      setDismissed(true);
    }
  };

  // Only unmount after the slide-out transition has completed.
  // Keeping the node in the DOM while `showBanner` is false lets the
  // `-translate-y-full` class animate the banner off screen rather than
  // snapping it away immediately.
  if (!showBanner && !hasBeenOffline) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "fixed left-0 right-0 z-20 transform transition-all duration-300",
        showBanner ? "translate-y-0" : "-translate-y-full"
      )}
      style={{ top: "var(--navbar-height)" }}
    >
      <div
        className={cn(
          "px-4 py-3 text-sm font-medium shadow-lg",
          isOnline
            ? "bg-[#5A7A4A] text-white"
            : "bg-[#F0C050] text-[#1A1A1A]"
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            {isOnline ? (
              <>
                <Wifi className="h-5 w-5 flex-shrink-0" />
                <span>
                  <strong>You&apos;re back online!</strong> Syncing your
                  data&hellip;
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 flex-shrink-0 animate-pulse" />
                <span>
                  <strong>You&apos;re offline</strong> &ndash; Tasks you
                  complete will be saved and synced automatically when you
                  reconnect.
                </span>
              </>
            )}
          </div>

          <button
            onClick={handleDismiss}
            className="flex-shrink-0 rounded p-1 transition-colors hover:bg-black/10"
            aria-label="Dismiss network status banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}