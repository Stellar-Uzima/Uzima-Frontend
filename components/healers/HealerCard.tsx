"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { StarRating } from "@/components/ui/StarRating";
import type { Healer } from "@/lib/mock/healers";

interface HealerCardProps {
  healer: Healer;
  onBook: (id: string) => void;
}

function countryCodeToFlagEmoji(code: string) {
  if (!code || code.length !== 2) return "🌍";
  const base = 0x1f1e6;
  const first = code.charCodeAt(0) - 65 + base;
  const second = code.charCodeAt(1) - 65 + base;
  return String.fromCodePoint(first, second);
}

function getInitials(name?: string, fallback?: string) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
    return (parts[0]![0] + parts[1]![0]).toUpperCase();
  }
  return (fallback ?? "").slice(0, 2).toUpperCase() || "--";
}

function HealerAvatar({ healer }: { healer: Healer }) {
  const [loaded, setLoaded] = useState(false);
  const initials = getInitials(healer.name);

  if (!healer.imageUrl) {
    return (
      <div className="relative h-11 w-11 rounded-2xl border border-terra/15 bg-terra/10 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-earth">{initials}</span>
      </div>
    );
  }

  return (
    <div className="relative h-11 w-11 rounded-2xl border border-terra/15 bg-terra/5 flex-shrink-0 overflow-hidden">
      {!loaded && (
        <Skeleton className="absolute inset-0 rounded-2xl" />
      )}
      <Image
        src={healer.imageUrl}
        alt={healer.name}
        width={44}
        height={44}
        loading="lazy"
        className={cn(
          "object-cover rounded-2xl transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        )}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-earth bg-terra/10 rounded-2xl">
          {initials}
        </span>
      )}
    </div>
  );
}

function HealerCardSkeleton() {
  return (
    <article className="flex flex-col h-full rounded-3xl border border-terra/15 bg-white p-4 shadow-sm" aria-hidden="true">
      <div className="flex items-start gap-3">
        <Skeleton className="h-11 w-11 rounded-2xl flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-28 rounded" />
          <Skeleton className="h-3 w-36 rounded" />
        </div>
      </div>
      <div className="mt-3 space-y-3 flex-1">
        <Skeleton className="h-3 w-32 rounded" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-40 rounded" />
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 pt-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </article>
  );
}

export const HealerCard = memo(function HealerCard({
  healer,
  onBook,
}: HealerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleBook = useCallback(() => {
    onBook(healer.id);
  }, [onBook, healer.id]);

  if (!isVisible) {
    return (
      <div ref={cardRef}>
        <HealerCardSkeleton />
      </div>
    );
  }

  return (
    <article ref={cardRef} className="flex flex-col h-full rounded-3xl border border-terra/15 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <HealerAvatar healer={healer} />

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="text-sm font-semibold text-earth truncate">{healer.name}</h2>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <span>
              {countryCodeToFlagEmoji(healer.countryCode)} {healer.country}
            </span>
            <span className="h-1 w-1 rounded-full bg-muted" />
            <span>{healer.region}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-3 flex-1">
        <div className="flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1 text-amber-600">
            <StarRating rating={healer.rating} />
            <span className="font-semibold text-earth">
              {healer.rating.toFixed(1)}
            </span>
            <span className="text-muted">({healer.reviewCount} reviews)</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {healer.specialties.slice(0, 3).map((specialty) => (
              <Badge
                key={specialty}
                className="rounded-full bg-terra/8 px-2 py-0.5 text-[11px] font-medium text-terra whitespace-nowrap"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-terra/80 flex-shrink-0" />
            <span className="truncate">
              Languages:{" "}
              <span className="font-medium text-earth">
                {healer.languages.join(", ")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge className="inline-flex items-center gap-1.5 rounded-full border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-earth cursor-help">
              <CheckCircle2 className="h-3 w-3 text-gold" />
              <span className="hidden sm:inline">Verified</span>
              <span className="sm:hidden">✓</span>
            </Badge>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4}>
            Verified by Stellar Uzima for experience, community reputation,
            and safe traditional practice.
          </TooltipContent>
        </Tooltip>

        <Button
          size="sm"
          className="rounded-full bg-terra text-xs font-semibold text-white hover:bg-earth whitespace-nowrap"
          onClick={handleBook}
        >
          Book session
        </Button>
      </div>
    </article>
  );
});
