import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from './button'

export type EmptyStateIllustration = 'tasks' | 'rewards' | 'consultations' | 'history'

export interface EmptyStateProps {
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  icon?: React.ReactNode | string
  illustration?: EmptyStateIllustration
  className?: string
}

function TasksIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" className="fill-muted/30" />
      {/* Clipboard */}
      <rect x="35" y="25" width="50" height="65" rx="4" className="fill-primary/20 stroke-primary" strokeWidth="2" />
      {/* Clipboard clip */}
      <rect x="45" y="20" width="30" height="12" rx="2" className="fill-primary/40 stroke-primary" strokeWidth="2" />
      {/* Lines representing tasks */}
      <line x1="45" y1="45" x2="75" y2="45" className="stroke-primary/60" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="55" x2="70" y2="55" className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="65" x2="65" y2="65" className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
      <line x1="45" y1="75" x2="60" y2="75" className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
      {/* Checkmark */}
      <path d="M70 70 L75 75 L85 60" className="stroke-emerald-500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function RewardsIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" className="fill-muted/30" />
      {/* Star shape */}
      <path
        d="M60 20 L67 40 L88 42 L72 56 L76 78 L60 68 L44 78 L48 56 L32 42 L53 40 Z"
        className="fill-amber-400/30 stroke-amber-500"
        strokeWidth="2"
      />
      {/* Inner star */}
      <path
        d="M60 32 L64 44 L77 46 L67 55 L70 68 L60 61 L50 68 L53 55 L43 46 L56 44 Z"
        className="fill-amber-500/50"
      />
      {/* Sparkles */}
      <path d="M35 30 L38 35 L43 32 L38 29 Z" className="fill-amber-400" />
      <path d="M82 25 L85 30 L90 27 L85 24 Z" className="fill-amber-400" />
      <path d="M80 70 L83 75 L88 72 L83 69 Z" className="fill-amber-400" />
    </svg>
  )
}

function ConsultationsIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" className="fill-muted/30" />
      {/* Person outline */}
      <circle cx="60" cy="40" r="12" className="fill-primary/20 stroke-primary" strokeWidth="2" />
      {/* Body */}
      <path d="M40 80 Q40 60 60 60 Q80 60 80 80" className="fill-none stroke-primary" strokeWidth="2" />
      {/* Calendar */}
      <rect x="30" y="75" width="30" height="30" rx="3" className="fill-blue-400/30 stroke-blue-500" strokeWidth="2" />
      <line x1="30" y1="83" x2="60" y2="83" className="stroke-blue-500" strokeWidth="2" />
      {/* Clock on calendar */}
      <circle cx="45" cy="90" r="6" className="fill-none stroke-blue-500" strokeWidth="1.5" />
      <path d="M45 87 L45 90 L47 92" className="stroke-blue-500" strokeWidth="1.5" strokeLinecap="round" />
      {/* Speech bubble */}
      <path d="M70 25 Q70 15 80 15 Q90 15 90 25 Q90 30 85 33 L82 38 L82 33 Q90 30 90 25" className="fill-primary/20 stroke-primary" strokeWidth="2" />
    </svg>
  )
}

function HistoryIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Background circle */}
      <circle cx="60" cy="60" r="50" className="fill-muted/30" />
      {/* Clock face */}
      <circle cx="60" cy="60" r="28" className="fill-primary/10 stroke-primary" strokeWidth="2" />
      {/* Clock center */}
      <circle cx="60" cy="60" r="3" className="fill-primary" />
      {/* Hour hand */}
      <line x1="60" y1="60" x2="60" y2="45" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="60" y1="60" x2="72" y2="60" className="stroke-primary" strokeWidth="2" strokeLinecap="round" />
      {/* Clock markers */}
      <line x1="60" y1="35" x2="60" y2="38" className="stroke-primary/60" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="82" x2="60" y2="85" className="stroke-primary/60" strokeWidth="2" strokeLinecap="round" />
      <line x1="35" y1="60" x2="38" y2="60" className="stroke-primary/60" strokeWidth="2" strokeLinecap="round" />
      <line x1="82" y1="60" x2="85" y2="60" className="stroke-primary/60" strokeWidth="2" strokeLinecap="round" />
      {/* Refresh arrows */}
      <path d="M30 45 Q25 35 35 30" className="fill-none stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
      <path d="M90 45 Q95 35 85 30" className="fill-none stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const illustrationComponents: Record<EmptyStateIllustration, React.ComponentType<{ className?: string }>> = {
  tasks: TasksIllustration,
  rewards: RewardsIllustration,
  consultations: ConsultationsIllustration,
  history: HistoryIllustration,
}

export function EmptyState({
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  icon,
  illustration,
  className,
}: EmptyStateProps) {
  const IllustrationComponent = illustration ? illustrationComponents[illustration] : null

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-3xl border border-dashed p-10 text-center',
        'bg-white/50 dark:bg-background/20',
        'border-terra/15 group',
        'transition-all duration-300 animate-in fade-in zoom-in-95',
        className,
      )}
      role="region"
      aria-label={title}
    >
      {/* Icon / Illustration */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-terra/5 rounded-full blur-2xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-linear-to-br from-terra/10 to-amber/5 border border-terra/10 transition-transform group-hover:scale-110 duration-500 shadow-sm">
          {icon ? (
            typeof icon === 'string' ? (
              <span className="text-4xl sm:text-5xl" role="img" aria-hidden="true">{icon}</span>
            ) : (
              <div className="text-terra/80 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                {icon}
              </div>
            )
          ) : IllustrationComponent ? (
            <IllustrationComponent className="h-16 w-16 sm:h-20 sm:w-20" />
          ) : (
            <span className="text-5xl" role="img" aria-hidden="true">🏥</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex max-w-md flex-col items-center gap-3 px-2">
        {/* Title - using h3 for proper heading hierarchy */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-earth dark:text-foreground">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm sm:text-base text-earth/60 dark:text-muted-foreground leading-relaxed text-balance max-w-sm">
          {description}
        </p>

        {/* Optional CTA Button */}
        {ctaLabel && ctaHref && (
          <Button
            asChild
            className="mt-6 h-12 rounded-full bg-terra px-10 font-bold text-white shadow-lg shadow-terra/15 transition-all hover:scale-[1.02] hover:bg-terra/90 active:scale-[0.98]"
            size="lg"
          >
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        )}
        {ctaLabel && onCtaClick && !ctaHref && (
          <Button
            onClick={onCtaClick}
            className="mt-6 rounded-full px-10 bg-terra hover:bg-terra/90 text-white font-bold shadow-lg shadow-terra/15 transition-all hover:scale-[1.02] active:scale-[0.98] h-12"
            size="lg"
          >
            {ctaLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
