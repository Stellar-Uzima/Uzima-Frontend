'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type Milestone = 7 | 14 | 30;

interface StreakCelebrationModalProps {
  streakDays: number;
}

const PROVERBS = [
  'Health is wealth; a strong body builds a strong village.',
  'When the body is well, the mind dances.',
  'A river that forgets its source will dry; care for yourself.',
  'The child who is loved grows strong; love your health.',
  'Morning steps plant seeds of long life.',
];

const BONUS_BY_MILESTONE: Record<Milestone, number> = {
  7: 2.0,
  14: 5.0,
  30: 12.0,
};

export default function StreakCelebrationModal({
  streakDays,
}: StreakCelebrationModalProps) {
  const isMilestone = (streakDays === 7 || streakDays === 14 || streakDays === 30) as boolean;
  const milestone = useMemo(() => {
    if (streakDays === 7 || streakDays === 14 || streakDays === 30) return streakDays as Milestone;
    return null;
  }, [streakDays]);

  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [proverb, setProverb] = useState<string>('');
  const [bonusDisplay, setBonusDisplay] = useState<number>(0);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mql = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)')
      : null;
    reduceMotionRef.current = !!mql?.matches;
  }, []);

  useEffect(() => {
    if (!isMilestone || dismissed) return;
    const pick = PROVERBS[Math.floor(Math.random() * PROVERBS.length)];
    setProverb(pick);
  }, [isMilestone, dismissed]);

  useEffect(() => {
    if (!milestone || dismissed) return;
    const target = BONUS_BY_MILESTONE[milestone];
    if (reduceMotionRef.current) {
      setBonusDisplay(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setBonusDisplay(parseFloat((target * eased).toFixed(2)));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setBonusDisplay(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [milestone, dismissed]);

  const handleShare = async () => {
    if (!milestone) return;
    const text = `${milestone}-Day Streak on Stellar Uzima! I earned +${BONUS_BY_MILESTONE[milestone].toFixed(
      1,
    )} XLM.`;
    const shareData = {
      title: 'Stellar Uzima Streak',
      text,
      url: typeof window !== 'undefined' ? window.location.href : '',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(`${text} ${shareData.url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        setCopied(false);
      }
    }
  };

  const close = () => {
    setDismissed(true);
  };

  const confettiPieces = useMemo(() => {
    if (reduceMotionRef.current) return [];
    return Array.from({ length: 60 }).map((_, i) => {
      const size = Math.floor(Math.random() * 6) + 6;
      const left = Math.random() * 100;
      const delay = Math.random() * 0.6;
      const duration = 3.5 + Math.random() * 2.5;
      const colors = ['#F0C050', '#B84E20', '#E08B2E', '#5A7A4A', '#FFFDF5'];
      const color = colors[i % colors.length];
      return { id: i, size, left, delay, duration, color };
    });
  }, [dismissed]);

  if (!isMilestone || dismissed || !milestone) return null;

  const title = `${milestone}-Day Streak! Incredible!`;
  const description = `You've been taking care of your health for ${milestone} days in a row`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-black/70" />

      <div
        className="relative w-[92vw] max-w-xl rounded-[20px] shadow-2xl border border-white/10 overflow-hidden"
        style={{
          background:
            'linear-gradient(160deg, rgba(184,78,32,0.95) 0%, rgba(224,139,46,0.90) 45%, rgba(240,192,80,0.90) 100%)',
        }}
      >
        <div className="absolute -top-24 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

        <div className="relative p-8 text-white">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 rounded-full bg-white/15 flex items-center justify-center animate-flicker">
              <span className="text-5xl">🔥</span>
            </div>

            <h2 className="font-serif text-3xl font-black tracking-tight drop-shadow-sm">
              {title}
            </h2>
            <p className="text-sm text-white/85">{description}</p>

            <div className="mt-3 mb-2 text-cream font-extrabold text-3xl tracking-tight">
              +{bonusDisplay.toFixed(1)} XLM Streak Bonus
            </div>

            <p className="text-xs text-white/85 italic">
              “{proverb}”
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={handleShare}
              className="bg-white text-earth hover:bg-cream rounded-full px-5"
            >
              {copied ? 'Copied!' : 'Share My Achievement'}
            </Button>
            <Button
              variant="outline"
              onClick={close}
              className="rounded-full border-white/50 text-white hover:bg-white/10"
            >
              Keep Going →
            </Button>
          </div>
        </div>
      </div>

      {!reduceMotionRef.current && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {confettiPieces.map((p) => (
            <span
              key={p.id}
              className="absolute"
              style={{
                left: `${p.left}%`,
                top: `-10vh`,
                width: p.size,
                height: p.size * 0.6,
                backgroundColor: p.color,
                borderRadius: 2,
                opacity: 0.9,
                transform: 'translateY(-100vh)',
                animation: `confettiFall ${p.duration}s linear ${p.delay}s forwards`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
