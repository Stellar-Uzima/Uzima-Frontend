"use client";

import React, { useEffect, useState } from "react";
import { WifiOff, Wifi, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    // Initialize with current online status
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      // Show reconnection message briefly
      if (hasBeenOffline) {
        setShowBanner(true);
        setTimeout(() => {
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
    };
  }, [hasBeenOffline]);

  if (!showBanner && isOnline) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform",
        showBanner ? "translate-y-0" : "-translate-y-full"
      )}
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
          <div className="flex items-center gap-3 flex-1">
            {isOnline ? (
              <>
                <Wifi className="w-5 h-5 flex-shrink-0" />
                <span>
                  <strong>You're back online!</strong> Syncing your data...
                </span>
              </>
            ) : (
              <>
                <WifiOff className="w-5 h-5 flex-shrink-0 animate-pulse" />
                <span>
                  <strong>You're offline</strong> — Tasks you complete will be
                  saved and synced automatically when you reconnect
                </span>
              </>
            )}
          </div>
          
          <button
            onClick={() => setShowBanner(false)}
            className="p-1 hover:bg-black/10 rounded transition-colors flex-shrink-0"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
