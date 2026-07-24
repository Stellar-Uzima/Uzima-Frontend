"use client";

import React from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePwaInstall } from "@/hooks/usePwaInstall";

export function InstallPrompt() {
  const { isInstalled, showPrompt, deferredPrompt, handleInstall, dismissPrompt } = usePwaInstall();

  // Don't show if installed or no prompt available or explicitly hidden
  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="relative z-20 mx-4 mb-4 mt-[calc(var(--update-banner-height,0px)+var(--navbar-height,80px)+0.75rem)] md:fixed md:bottom-[calc(env(safe-area-inset-bottom,0px)+1rem)] md:left-auto md:right-4 md:mt-0 md:max-w-sm motion-safe:animate-in motion-safe:slide-in-from-bottom-5 motion-safe:duration-500">
      <Card className="border border-terra/20 bg-white shadow-lg md:shadow-2xl">
        <div className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="mb-1 text-base font-bold text-earth">
                Install Stellar Uzima
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Install for offline access and faster loading.
              </p>
            </div>
            <button
              type="button"
              onClick={dismissPrompt}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-earth transition-colors hover:bg-earth/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-terra focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Dismiss install prompt"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:flex">
            <Button
              type="button"
              onClick={handleInstall}
              className="h-10 w-full rounded-xl bg-terra font-semibold text-white hover:bg-terra/90 sm:flex-1"
            >
              <Download className="mr-2 h-4 w-4" aria-hidden="true" />
              Install App
            </Button>
            <Button
              type="button"
              onClick={dismissPrompt}
              variant="outline"
              className="h-10 w-full rounded-xl border-terra/20 hover:bg-terra/5 sm:w-auto"
            >
              Not Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Navbar Install Button Component
export function InstallButton() {
  const { isInstalled, deferredPrompt, handleInstall } = usePwaInstall();

  // Don't show if installed or no prompt available
  if (isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <Button
      onClick={handleInstall}
      variant="outline"
      size="sm"
      className="border-[#B84E20] text-[#B84E20] hover:bg-[#B84E20] hover:text-white transition-colors"
    >
      <Download className="w-4 h-4 mr-2" />
      Install App
    </Button>
  );
}
