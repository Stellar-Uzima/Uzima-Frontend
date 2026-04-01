"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Users } from "lucide-react";

import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TaskStats {
  completedToday: number;
  recentCompleters: { name: string; country: string }[];
  tip: { author: string; country: string; text: string };
}

interface TaskCommunityProps {
  taskId: string;
  taskTitle: string;
}

// ---------------------------------------------------------------------------
// Mock data (mirrors what GET /api/tasks/:id/stats would return)
// ---------------------------------------------------------------------------

const MOCK_STATS: Record<string, TaskStats> = {
  "hydration-check": {
    completedToday: 234,
    recentCompleters: [
      { name: "Amara", country: "GH" },
      { name: "Kofi", country: "GH" },
      { name: "Fatima", country: "NG" },
      { name: "Zara", country: "KE" },
      { name: "Emeka", country: "NG" },
    ],
    tip: {
      author: "Amara",
      country: "Ghana",
      text: "Drink water before checking your phone 💧",
    },
  },
  "neighbourhood-walk-photo": {
    completedToday: 187,
    recentCompleters: [
      { name: "Lena", country: "TZ" },
      { name: "Kwame", country: "GH" },
      { name: "Aisha", country: "SN" },
      { name: "Tunde", country: "NG" },
      { name: "Nadia", country: "ET" },
    ],
    tip: {
      author: "Kwame",
      country: "Ghana",
      text: "Walk right after sunrise — the air is cooler and the streets are quiet 🌅",
    },
  },
  "traditional-remedy-log": {
    completedToday: 98,
    recentCompleters: [
      { name: "Miriam", country: "KE" },
      { name: "Seun", country: "NG" },
      { name: "Hana", country: "ET" },
      { name: "Olu", country: "NG" },
      { name: "Zawadi", country: "TZ" },
    ],
    tip: {
      author: "Miriam",
      country: "Kenya",
      text: "Write your log right after you take the remedy while the feeling is fresh 📝",
    },
  },
};

const DEFAULT_STATS: TaskStats = {
  completedToday: 142,
  recentCompleters: [
    { name: "Amara", country: "GH" },
    { name: "Kofi", country: "GH" },
    { name: "Fatima", country: "NG" },
    { name: "Zara", country: "KE" },
    { name: "Emeka", country: "NG" },
  ],
  tip: {
    author: "Fatima",
    country: "Nigeria",
    text: "Small steps every day add up to big changes 🌱",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

// Deterministic pastel colour per name
const AVATAR_COLOURS = [
  "bg-terra/20 text-terra",
  "bg-gold/20 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-sky-100 text-sky-700",
  "bg-violet-100 text-violet-700",
];

function avatarColour(index: number) {
  return AVATAR_COLOURS[index % AVATAR_COLOURS.length];
}

// ---------------------------------------------------------------------------
// Animated count-up hook
// ---------------------------------------------------------------------------

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return count;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TaskCommunity({ taskId, taskTitle }: TaskCommunityProps) {
  const [stats, setStats] = useState<TaskStats | null>(null);
  const animatedCount = useCountUp(stats?.completedToday ?? 0);

  // Simulate GET /api/tasks/:id/stats
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats(MOCK_STATS[taskId] ?? DEFAULT_STATS);
    }, 300);
    return () => clearTimeout(timer);
  }, [taskId]);

  const handleChallengeFriend = () => {
    const text = encodeURIComponent(
      `Hey! I just completed the "${taskTitle}" health task on Stellar Uzima and earned XLM rewards. Join me and let's build healthy habits together 💪 https://uzima.app/tasks/${taskId}`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const AVATAR_LIMIT = 5;
  const overflow = stats ? Math.max(0, stats.completedToday - AVATAR_LIMIT) : 0;

  return (
    <section
      aria-labelledby="community-heading"
      className="rounded-3xl border border-terra/10 bg-white p-5 sm:p-6 space-y-5"
    >
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-terra" aria-hidden="true" />
        <h2
          id="community-heading"
          className="text-sm font-semibold tracking-wide text-terra uppercase"
        >
          Community
        </h2>
      </div>

      {/* Completion counter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-3xl font-bold text-earth tabular-nums">
            {stats ? animatedCount.toLocaleString() : "—"}
          </p>
          <p className="text-xs text-muted mt-0.5">
            people completed this task today
          </p>
        </div>

        {/* Avatar stack */}
        {stats && (
          <div className="flex items-center gap-1.5" aria-label="Recent completers">
            <div className="flex -space-x-2">
              {stats.recentCompleters.slice(0, AVATAR_LIMIT).map((person, i) => (
                <div
                  key={person.name}
                  title={`${person.name} (${person.country})`}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-[11px] font-bold ring-0 ${avatarColour(i)}`}
                >
                  {getInitials(person.name)}
                </div>
              ))}
            </div>
            {overflow > 0 && (
              <span className="text-xs font-semibold text-muted">
                +{overflow.toLocaleString()} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Community tip */}
      {stats && (
        <div className="rounded-2xl bg-cream/80 border border-terra/10 px-4 py-3.5 space-y-1">
          <p className="text-[11px] font-semibold text-terra uppercase tracking-wide">
            Top community tip
          </p>
          <p className="text-sm text-earth leading-relaxed">
            &ldquo;{stats.tip.text}&rdquo;
          </p>
          <p className="text-[11px] text-muted">
            — {stats.tip.author}, {stats.tip.country}
          </p>
        </div>
      )}

      {/* Challenge a friend */}
      <Button
        type="button"
        onClick={handleChallengeFriend}
        variant="outline"
        className="w-full sm:w-auto rounded-2xl border-terra/30 text-terra hover:bg-terra/5 text-sm font-semibold gap-2"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Challenge a friend on WhatsApp
      </Button>
    </section>
  );
}
