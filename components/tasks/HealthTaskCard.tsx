'use client'

import * as React from 'react'
import { Check, Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type HealthTaskStatus = 'available' | 'completed' | 'claimed'

export interface HealthTaskCardProps {
  /** Task title — e.g. "Complete daily hydration check" */
  title: string
  /** XLM reward amount — e.g. 0.5 */
  reward: number
  /** Category label — e.g. "Nutrition", "Exercise", "Mental Health" */
  category: string
  /** Current task status */
  status: HealthTaskStatus
  /** Emoji or image path used as the task icon */
  icon: string
  /** Callback fired when the user clicks the claim button */
  onClaim?: () => void
  /** Additional class names forwarded to the root element */
  className?: string
}

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

/**
 * A reusable card that represents a single health task a user can complete to
 * earn XLM coins. Supports three visual states: **available**, **completed**,
 * and **claimed**.
 *
 * @example
 * ```tsx
 * <HealthTaskCard
 *   title="Complete daily hydration check"
 *   reward={0.5}
 *   category="Nutrition"
 *   status="available"
 *   icon="💧"
 *   onClaim={() => console.log('claimed!')}
 * />
 * ```
 */
export function HealthTaskCard({
  title,
  reward,
  category,
  status,
  icon,
  onClaim,
  className,
}: HealthTaskCardProps) {
  const isAvailable = status === 'available'
  const isCompleted = status === 'completed'
  const isClaimed = status === 'claimed'

  // Determine if the icon is an image path or an emoji
  const isImageIcon = icon.startsWith('/') || icon.startsWith('http')

  return (
    <div
      data-slot="health-task-card"
      data-status={status}
      className={cn(
        // ── Base ──────────────────────────────────────────────────────
        'group relative flex flex-col rounded-2xl border bg-[#FFFDF5] p-5 transition-all duration-300',

        // ── Available state ───────────────────────────────────────────
        isAvailable && [
          'border-[#E8D4C0] shadow-sm',
          'hover:border-[#C05A2B]/50 hover:shadow-md hover:-translate-y-0.5',
          'cursor-pointer',
        ],

        // ── Completed state ───────────────────────────────────────────
        isCompleted && 'border-[#5A7A4A]/30 bg-[#5A7A4A]/[0.03]',

        // ── Claimed state ─────────────────────────────────────────────
        isClaimed && 'border-[#F0C050]/40 bg-[#F0C050]/[0.04]',

        className,
      )}
    >
      {/* ── Top row: icon · text · reward badge ──────────────────────── */}
      <div className="flex items-start gap-4">
        {/* Icon container */}
        <div
          className={cn(
            'relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl transition-colors',
            isAvailable && 'bg-[#C05A2B]/10',
            isCompleted && 'bg-[#5A7A4A]/10',
            isClaimed && 'bg-[#F0C050]/15',
          )}
        >
          {isImageIcon ? (
            <img
              src={icon}
              alt=""
              className="h-7 w-7 object-contain"
              aria-hidden="true"
            />
          ) : (
            <span aria-hidden="true">{icon}</span>
          )}

          {/* Completed / claimed checkmark overlay */}
          {(isCompleted || isClaimed) && (
            <span
              className={cn(
                'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-white shadow-sm',
                isCompleted && 'bg-[#5A7A4A]',
                isClaimed && 'bg-[#F0C050]',
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
              'text-sm font-semibold leading-snug text-[#2E1503]',
              (isCompleted || isClaimed) && 'text-[#2E1503]/70',
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
            'shrink-0 gap-1 rounded-full border-0 px-3 py-1 text-xs font-bold tabular-nums',
            isAvailable &&
              'bg-[#C05A2B]/10 text-[#C05A2B]',
            isCompleted &&
              'bg-[#5A7A4A]/10 text-[#5A7A4A]',
            isClaimed &&
              'bg-[#F0C050]/15 text-[#B88A20]',
          )}
        >
          <Sparkles className="h-3 w-3" />
          {reward} XLM
        </Badge>
      </div>

      {/* ── Claim button row ─────────────────────────────────────────── */}
      <div className="mt-4">
        {isAvailable && (
          <Button
            size="sm"
            onClick={onClaim}
            className={cn(
              'w-full rounded-xl bg-[#C05A2B] text-sm font-semibold text-white',
              'hover:bg-[#A04A22] active:bg-[#8E4020]',
              'transition-colors',
            )}
          >
            Claim Reward
          </Button>
        )}

        {isCompleted && (
          <Button
            size="sm"
            disabled
            className={cn(
              'w-full rounded-xl bg-[#5A7A4A]/20 text-sm font-semibold text-[#5A7A4A]',
              'cursor-not-allowed',
            )}
          >
            <Check className="h-4 w-4" />
            Completed
          </Button>
        )}

        {isClaimed && (
          <Button
            size="sm"
            disabled
            className={cn(
              'w-full rounded-xl bg-[#F0C050]/20 text-sm font-semibold text-[#B88A20]',
              'cursor-not-allowed',
            )}
          >
            <Check className="h-4 w-4" />
            Claimed
          </Button>
        )}
      </div>
    </div>
  )
}
