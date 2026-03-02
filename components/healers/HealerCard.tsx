"use client";

import { MapPin, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export function HealerCard({ healer, onBook }: HealerCardProps) {
  return (
    <article className="flex flex-col rounded-3xl border border-terra/15 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar className="h-11 w-11 rounded-2xl border border-terra/15 bg-terra/5">
          {healer.imageUrl && (
            <AvatarImage
              src={healer.imageUrl}
              alt={healer.name}
              className="object-cover"
            />
          )}
          <AvatarFallback className="bg-terra/10 text-xs font-semibold text-earth">
            {getInitials(healer.name, healer.avatar)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-earth">{healer.name}</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="inline-flex items-center gap-1.5 rounded-full border-gold/40 bg-gold/15 px-2 py-0.5 text-[10px] font-semibold text-earth">
                  <CheckCircle2 className="h-3 w-3 text-gold" />
                  Verified traditional healer
                </Badge>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={4}>
                Verified by Stellar Uzima for experience, community reputation,
                and safe traditional practice.
              </TooltipContent>
            </Tooltip>
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

      <div className="mt-3 space-y-3">
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
                className="rounded-full bg-terra/8 px-2 py-0.5 text-[11px] font-medium text-terra"
              >
                {specialty}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5 text-terra/80" />
            <span className="truncate">
              Languages:{" "}
              <span className="font-medium text-earth">
                {healer.languages.join(", ")}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          size="sm"
          className="rounded-full bg-terra text-xs font-semibold text-white hover:bg-earth"
          onClick={() => onBook(healer.id)}
        >
          Book session
        </Button>
      </div>
    </article>
  );
}
