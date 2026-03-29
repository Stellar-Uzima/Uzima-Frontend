"use client";

import { useEffect, useState, useRef } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useServiceWorker } from '@/hooks/useServiceWorker';

export function UpdateBanner() {
  const { updateAvailable, updateServiceWorker } = useServiceWorker();
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dismissedFlag = localStorage.getItem('uzima-update-dismissed');
    if (dismissedFlag) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('uzima-update-dismissed', 'true');
  };

 const isVisible = true;
  // const isVisible = updateAvailable && !dismissed;

  useEffect(() => {
    const updateCssVar = () => {
      const height = isVisible && bannerRef.current ? bannerRef.current.offsetHeight : 0;
      document.documentElement.style.setProperty('--update-banner-height', `${height}px`);
    };

    updateCssVar();

    const observer = new ResizeObserver(() => {
      updateCssVar();
    });

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--update-banner-height', '0px');
    };
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={bannerRef}
      id="pwa-update-banner"
      className="w-full bg-[#B84E20] text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between min-h-[48px]">
        <div className="flex-1">
          <p className="text-sm font-medium">
            A new version of Stellar Uzima is available.
          </p>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <Button
            onClick={updateServiceWorker}
            size="sm"
            variant="secondary"
            className="bg-white text-[#B84E20] hover:bg-gray-100 text-xs px-3 py-1"
          >
            <RefreshCw className="w-3 h-3 mr-1" />
            Refresh to update
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}