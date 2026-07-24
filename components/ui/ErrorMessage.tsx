"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  /** The error text to display. If falsy, renders nothing. */
  message: string | null | undefined;
  /** Optional dismiss callback. When provided, an ✕ button is rendered. */
  onDismiss?: () => void;
  /** Optional extra class names for the outer wrapper. */
  className?: string;
  /** Size variant — 'sm' suits inline field errors, 'md' (default) suits banners. */
  size?: "sm" | "md";
  /** Unique id used for aria-describedby linkage from the triggering input. */
  id?: string;
}

/**
 * ErrorMessage — reusable, accessible error banner for Stellar Uzima.
 *
 * Design:
 *  - Red-tinted background with a left terracotta accent border
 *  - ⚠ warning icon to the left of the text
 *  - Dismissible via optional onDismiss prop
 *  - role="alert" so screen readers announce it immediately
 */
export function ErrorMessage({
  message,
  onDismiss,
  className,
  size = "md",
  id,
}: ErrorMessageProps) {
  if (!message) return null;

  const isSmall = size === "sm";

  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      className={cn(
        // Base layout
        "flex items-start gap-2.5 rounded-xl border-l-4",
        // Colours — warm terracotta-red palette to match the earth-tone system
        "border-l-[#b84e20] bg-[#fef3ee] text-[#7a2e0e]",
        // Border & shadow
        "border border-[#f5c6b0] shadow-sm",
        // Spacing
        isSmall ? "px-3 py-2 text-xs" : "px-4 py-3 text-sm",
        // Entrance animation (respects prefers-reduced-motion via globals.css)
        "animate-slideUp",
        className,
      )}
    >
      {/* Warning icon */}
      <span
        aria-hidden="true"
        className={cn(
          "shrink-0 select-none leading-none",
          isSmall ? "mt-px text-sm" : "mt-0.5 text-base",
        )}
      >
        ⚠
      </span>

      {/* Message text */}
      <span className={cn("flex-1 font-medium leading-snug", isSmall ? "text-xs" : "text-sm")}>
        {message}
      </span>

      {/* Optional dismiss button */}
      {onDismiss && (
        <button
          type="button"
          aria-label="Dismiss error"
          onClick={onDismiss}
          className={cn(
            "shrink-0 rounded-md p-0.5 transition-colors",
            "text-[#b84e20]/60 hover:text-[#b84e20] hover:bg-[#b84e20]/10",
            "focus:outline-none focus:ring-2 focus:ring-[#b84e20]/40",
          )}
        >
          <X className={isSmall ? "h-3 w-3" : "h-3.5 w-3.5"} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
