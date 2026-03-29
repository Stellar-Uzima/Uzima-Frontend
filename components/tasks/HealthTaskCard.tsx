'use client'

import * as React from 'react'
import Image from 'next/image'
import { Check, Loader2, Sparkles, Bookmark } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type HealthTaskStatus = 'available' | 'completed' | 'claimed'

export interface HealthTaskCardProps {
  title: string
  reward: number
  category: string
  status: HealthTaskStatus
  icon: string
  onClaim?: () => void
  className?: string
  // Issue #215 — Add Task Bookmarking
  taskId?: string
  isBookmarked?: boolean
  onToggleBookmark?: (taskId: string) => void
}

// ---------------------------------------------------------------------------
// Animation state machine
// idle → loading (300ms) → animating (700ms) → done
// ---------------------------------------------------------------------------
type AnimState = 'idle' | 'loading' | 'animating' | 'done'

// ---------------------------------------------------------------------------
// Confetti particle config
// ---------------------------------------------------------------------------
const PARTICLE_COUNT = 10

const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
  const angle = (360 / PARTICLE_COUNT) * i
  const rad = (angle * Math.PI) / 180
  const dist = 45 + Math.random() * 25
  const dx = Math.round(Math.cos(rad) * dist)
  const dy = Math.round(Math.sin(rad) * dist)
  const shapes = ['rounded-full', 'rounded-sm', 'rotate-45']
  const colors = [
    'bg-[#F0C050]',
    'bg-[#C05A2B]',
    'bg-[#5A7A4A]',
    'bg-[#4A8CAA]',
    'bg-[#E08B2E]',
  ]
  return {
    id: i,
    dx,
    dy,
    shape: shapes[i % shapes.length],
    color: colors[i % colors.length],
    size: i % 2 === 0 ? 'h-2 w-2' : 'h-1.5 w-1.5',
    delay: `${(i * 30)}ms`,
  }
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const CATEGORY_COLORS: Record<string, string> = {
  Nutrition: 'bg-[#5A7A4A]/10 text-[#5A7A4A]',
  Exercise: 'bg-[#C05A2B]/10 text-[#C05A2B]',
  'Mental Health': 'bg-[#4A8CAA]/10 text-[#4A8CAA]',
}

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? 'bg-[#8A6040]/10 text-[#8A6040]'
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function HealthTaskCard({
  title,
  reward,
  category,
  status,
  icon,
  onClaim,
  className,
  taskId,
  isBookmarked = false,
  onToggleBookmark,
}: HealthTaskCardProps) {
  const [animState, setAnimState] = React.useState<AnimState>('idle')
  const hasAnimated = React.useRef(false)

  const prefersReduced = React.useRef(false)
  React.useEffect(() => {
    prefersReduced.current =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const displayStatus: HealthTaskStatus =
    animState === 'done' ? 'completed' : status

  const isAvailable = displayStatus === 'available'
  const isCompleted = displayStatus === 'completed'
  const isClaimed   = displayStatus === 'claimed'

  const isImageIcon = icon?.startsWith('/') || icon?.startsWith('http')

  function handleMarkComplete() {
    if (hasAnimated.current || animState !== 'idle') return
    hasAnimated.current = true

    if (prefersReduced.current) {
      setAnimState('done')
      onClaim?.()
      return
    }

    setAnimState('loading')

    setTimeout(() => {
      setAnimState('animating')

      setTimeout(() => {
        setAnimState('done')
        onClaim?.()
      }, 700)
    }, 300)
  }

  // Issue #215 — Bookmark toggle handler
  function handleBookmarkClick(e: React.MouseEvent) {
    e.stopPropagation()
    if (taskId && onToggleBookmark) {
      onToggleBookmark(taskId)
    }
  }

  const isAnimating = animState === 'animating'
  const isLoading   = animState === 'loading'

  return (
    <div
      data-slot="health-task-card"
      data-status={displayStatus}
      className={cn(
        'group relative flex flex-col rounded-2xl border bg-[#FFFDF5] p-5 transition-all duration-300',

        isAvailable && [
          'border-[#E8D4C0] shadow-sm',
          'hover:border-[#C05A2B]/50 hover:shadow-md hover:-translate-y-0.5',
          'cursor-pointer',
        ],
        isCompleted && 'border-[#C05A2B]/40 bg-[#C05A2B]/[0.03]',
        isClaimed   && 'border-[#F0C050]/40 bg-[#F0C050]/[0.04]',
        isAnimating && 'animate-task-ping',

        className,
      )}
    >
      {/* Issue #215 — Bookmark toggle button */}
      {taskId && onToggleBookmark && (
        <div className="absolute right-3 top-3 z-10">
          <div
            role="button"
            tabIndex={0}
            onClick={handleBookmarkClick}
            onKeyDown={(e) => e.key === 'Enter' && handleBookmarkClick(e as any)}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this task'}
            aria-pressed={isBookmarked}
            className={cn(
              'flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 cursor-pointer',
              'hover:bg-[#C05A2B]/10 focus:outline-none focus:ring-2 focus:ring-[#C05A2B]/40',
              isBookmarked
                ? 'text-[#C05A2B]'
                : 'text-[#8A6040]/30 hover:text-[#C05A2B]',
            )}
          >
            <Bookmark
              className="h-3.5 w-3.5 transition-all duration-200"
              fill={isBookmarked ? 'currentColor' : 'none'}
              strokeWidth={2}
            />
          </div>
        </div>
      )}
      {/* Confetti particles */}
      {isAnimating && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible"
        >
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className={cn(
                'absolute animate-task-confetti',
                p.shape,
                p.color,
                p.size,
              )}
              style={{
                ['--dx' as string]: `${p.dx}px`,
                ['--dy' as string]: `${p.dy}px`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </span>
      )}

      {/* Top row */}
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div
          className={cn(
            'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors',
            isAvailable && 'bg-[#C05A2B]/10',
            isCompleted && 'bg-[#5A7A4A]/10',
            isClaimed   && 'bg-[#F0C050]/15',
          )}
        >
          {isImageIcon ? (
            <Image
              src={icon}
              alt={`${title} task category icon`}
              width={28}
              height={28}
              unoptimized={icon.startsWith('http')}
              loading="lazy"
              className="h-7 w-7 object-contain"
              aria-hidden="true"
            />
          ) : (
            <span aria-hidden="true">{icon}</span>
          )}

          {(isCompleted || isClaimed) && (
            <span
              className={cn(
                'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm',
                isCompleted ? 'bg-[#5A7A4A]' : 'bg-[#F0C050]',
                animState === 'done' && 'animate-task-check-pop',
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
          )}
        </div>

        {/* Title & category */}
        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              'text-sm font-semibold leading-snug text-[#2E1503] transition-all duration-300',
              (isCompleted || isClaimed) && 'text-[#2E1503]/70 line-through',
            )}
          >
            {title}
          </h3>
          <span
            className={cn(
              'mt-1 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
              getCategoryColor(category),
            )}
          >
            {category}
          </span>
        </div>

        {/* Reward badge */}
        <Badge
          className={cn(
            'shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-xs font-bold tabular-nums transition-colors duration-300',
            isAvailable && 'bg-[#C05A2B]/10 text-[#C05A2B]',
            isCompleted && 'bg-[#5A7A4A]/10 text-[#5A7A4A]',
            isClaimed   && 'bg-[#F0C050]/15 text-[#B88A20]',
            isAnimating && 'animate-task-badge-pulse',
          )}
        >
          <Sparkles className="h-3 w-3" />
          {reward} XLM
        </Badge>
      </div>

      {/* Button row */}
      <div className="mt-4">
        {isAvailable && (
          <Button
            size="sm"
            onClick={handleMarkComplete}
            disabled={isLoading || isAnimating}
            className={cn(
              'w-full rounded-xl text-sm font-semibold text-white transition-all duration-200',
              'bg-[#C05A2B] hover:bg-[#A04A22] active:bg-[#8E4020]',
              (isLoading || isAnimating) && 'cursor-not-allowed opacity-90',
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying…</span>
              </>
            ) : isAnimating ? (
              <>
                <Check className="h-4 w-4" />
                <span>Complete!</span>
              </>
            ) : (
              'Mark Complete'
            )}
          </Button>
        )}

        {isCompleted && (
          <Button
            size="sm"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-[#5A7A4A]/20 text-sm font-semibold text-[#5A7A4A]"
          >
            <Check className="h-4 w-4" />
            Completed
          </Button>
        )}

        {isClaimed && (
          <Button
            size="sm"
            disabled
            className="w-full cursor-not-allowed rounded-xl bg-[#F0C050]/20 text-sm font-semibold text-[#B88A20]"
          >
            <Check className="h-4 w-4" />
            Claimed
          </Button>
        )}
      </div>
    </div>
  )
}