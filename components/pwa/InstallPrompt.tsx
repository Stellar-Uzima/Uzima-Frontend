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
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-40 animate-in slide-in-from-bottom-5 duration-500">
      <Card className="shadow-2xl border-2 border-[#B84E20]/20 bg-white">
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1 text-[#1A1A1A]">
                Install Stellar Uzima
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Install for offline access and faster loading
              </p>
            </div>
            <button
              onClick={dismissPrompt}
              className="p-1 hover:bg-black/5 rounded transition-colors flex-shrink-0"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleInstall}
              className="flex-1 bg-[#B84E20] hover:bg-[#A04020] text-white font-semibold rounded-xl"
            >
              <Download className="w-4 h-4 mr-2" />
              Install App
            </Button>
            <Button
              onClick={dismissPrompt}
              variant="outline"
              className="border-[#B84E20]/20 hover:bg-[#B84E20]/5 rounded-xl"
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
