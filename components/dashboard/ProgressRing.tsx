'use client';

import { useEffect, useMemo, useState } from 'react';

type ProgressRingSize = 'sm' | 'md' | 'lg';

interface ProgressRingProps {
  percentage: number;
  size?: ProgressRingSize;
  color?: string;
  label?: string;
}

const SIZE_MAP: Record<ProgressRingSize, number> = {
  sm: 60,
  md: 100,
  lg: 140,
};

export default function ProgressRing({
  percentage,
  size = 'md',
  color = 'var(--terra, #B84E20)',
  label = 'Daily health goal progress',
}: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setAnimatedPercentage(clamped);
    });
    return () => cancelAnimationFrame(id);
  }, [clamped]);

  const dimension = SIZE_MAP[size];
  const strokeWidth = Math.max(6, Math.round(dimension * 0.1));
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const progressOffset = useMemo(() => {
    return circumference - (animatedPercentage / 100) * circumference;
  }, [animatedPercentage, circumference]);

  return (
    <div
      role="img"
      aria-label={`${label}: ${clamped}% complete`}
      className="relative inline-flex items-center justify-center"
      style={{ width: dimension, height: dimension }}
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        className="-rotate-90"
      >
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border/70"
        />
        <circle
          cx={dimension / 2}
          cy={dimension / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
        />
      </svg>

      <span
        aria-hidden="true"
        className="absolute font-semibold text-earth"
        style={{ fontSize: Math.max(12, Math.round(dimension * 0.2)) }}
      >
        {clamped}%
      </span>
    </div>
  );
}
