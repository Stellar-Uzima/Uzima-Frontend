"use client";

import * as React from "react";
import { useState, useMemo } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  leaderboardRegions,
  leaderboardLanguages,
  fetchLeaderboard,
  type LeaderboardEntry,
} from "@/lib/mock/leaderboard";
import LeaderboardRowSkeleton from "@/components/ui/skeletons/LeaderboardRowSkeleton";

export function Leaderboard() {
  const [region, setRegion] = useState<string>("");
  const [languages, setLanguages] = useState<string[]>([]);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetchLeaderboard().then((data) => {
      setEntries(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = entries;
    if (region) {
      result = result.filter((e) => e.region === region);
    }
    if (languages.length > 0) {
      result = result.filter((e) =>
        languages.some((lang) => e.language.includes(lang))
      );
    }
    return [...result].sort((a, b) => b.xlmEarned - a.xlmEarned).slice(0, 10);
  }, [entries, region, languages]);

  function toggleLanguage(lang: string) {
    setLanguages((prev) => {
      const next = new Set(prev);
      if (next.has(lang)) next.delete(lang);
      else next.add(lang);
      return Array.from(next);
    });
  }

  function clearFilters() {
    setRegion("");
    setLanguages([]);
  }

  return (
    <section className="bg-cream px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl font-bold text-earth mb-2">
          Top Contributors
        </h2>
        <p className="text-muted text-sm mb-6">
          Ranked by XLM earned across all tasks
        </p>

        <div className="flex flex-wrap gap-4 mb-8 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Region
            </label>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All regions</SelectItem>
                {leaderboardRegions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted uppercase tracking-wider">
              Language
            </label>
            <div className="flex flex-wrap gap-1.5">
              {leaderboardLanguages.map((lang) => {
                const active = languages.includes(lang);
                return (
                  <Button
                    type="button"
                    key={lang}
                    variant={active ? "default" : "outline"}
                    className={cn(
                      "h-8 rounded-full px-3 text-xs",
                      active && "bg-primary text-primary-foreground"
                    )}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                  </Button>
                );
              })}
            </div>
          </div>

          {(region || languages.length > 0) && (
            <Button
              variant="ghost"
              className="text-xs text-muted underline h-8"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          )}
        </div>

        {loading ? (
          <div className="space-y-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <LeaderboardRowSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-8 text-muted text-sm">
            No contributors match the selected filters.
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-earth/10 shadow-sm overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[40px_48px_1fr_80px_60px] gap-2 px-4 py-3 text-xs font-semibold text-muted uppercase tracking-wider border-b">
              <span>Rank</span>
              <span></span>
              <span>Contributor</span>
              <span className="text-right">XLM</span>
              <span className="text-right">Tasks</span>
            </div>

            {filtered.map((entry, index) => {
              const rank = index + 1;
              const isYou = entry.isCurrentUser;
              return (
                <div
                  key={entry.id}
                  className={cn(
                    "grid grid-cols-[40px_48px_1fr_80px_60px] gap-2 px-4 py-3 items-center border-b last:border-0 transition-colors",
                    isYou
                      ? "bg-gold/10 border-gold/20"
                      : "hover:bg-cream/50"
                  )}
                >
                  <span className={cn(
                    "font-bold text-sm",
                    rank === 1
                      ? "text-gold"
                      : rank === 2
                      ? "text-earth/60"
                      : rank === 3
                      ? "text-terra/60"
                      : "text-muted"
                  )}>
                    {rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : rank}
                  </span>

                  <Avatar className="size-9">
                    {entry.avatarUrl && (
                      <AvatarImage
                        src={entry.avatarUrl}
                        alt={entry.name}
                      />
                    )}
                    <AvatarFallback>
                      {entry.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={cn(
                        "font-medium text-sm truncate",
                        isYou && "text-primary"
                      )}
                    >
                      {entry.name}
                    </span>
                    {isYou && (
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[10px] bg-gold/20 text-gold border-gold/30"
                      >
                        You
                      </Badge>
                    )}
                  </div>

                  <div className="text-right font-semibold text-sm text-earth">
                    {entry.xlmEarned.toLocaleString()}
                  </div>

                  <div className="text-right text-xs text-muted">
                    {entry.tasksCompleted}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}