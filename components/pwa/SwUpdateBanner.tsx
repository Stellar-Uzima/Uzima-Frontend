"use client";

import { useState } from "react";
import { RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useServiceWorker } from "@/hooks/useServiceWorker";

export function SwUpdateBanner() {
  const { updateAvailable, updateServiceWorker } = useServiceWorker();
  const [dismissed, setDismissed] = useState(false);

  if (!updateAvailable || dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3",
        "rounded-lg border bg-background px-4 py-3 shadow-lg"
      )}
    >
      <RefreshCw className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="text-sm">New version available</span>

      <button
        type="button"
        onClick={updateServiceWorker}
        className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground"
      >
        Refresh
      </button>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss update notification"
        className="text-muted-foreground hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}