"use client";

import React, { useEffect, useRef, useState } from "react";
import { WifiOff, Wifi, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const initializeOnlineState = navigator.onLine;
    setIsOnline(initializeOnlineState);
    setShowBanner(!initializeOnlineState);
    setHasBeenOffline(!initializeOnlineState);

    const handleOnline = () => {
      setIsOnline(true);

      if (hasBeenOffline) {
        setShowBanner(true);

        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
        }

        reconnectTimeoutRef.current = setTimeout(() => {
          setShowBanner(false);
          setHasBeenOffline(false);
        }, 5000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      setHasBeenOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [hasBeenOffline]);

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

  if (!showBanner && isOnline) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
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
                  <strong>You&apos;re back online!</strong> Syncing your data...
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 flex-shrink-0 animate-pulse" />
                <span>
                  <strong>You&apos;re offline</strong> - Tasks you complete will
                  be saved and synced automatically when you reconnect
                </span>
              </>
            )}
          </div>

          <button
            onClick={() => setShowBanner(false)}
            className="flex-shrink-0 rounded p-1 transition-colors hover:bg-black/10"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
