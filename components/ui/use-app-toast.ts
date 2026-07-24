'use client'

/**
 * use-app-toast
 *
 * Typed wrapper around `use-toast` that exposes semantic helpers for every
 * action outcome in the app.  All user-facing copy lives here so it stays
 * consistent and is easy to audit.
 *
 * Usage:
 *   const { successToast, errorToast } = useAppToast()
 *   successToast('confession.submitted')
 *   errorToast('confession.submitFailed', error)
 */

import { useToast } from '@/components/ui/use-toast'

// ── Toast message catalogue ──────────────────────────────────────────────────
// Add a new key here whenever a new action needs feedback.
// Titles are short (≤ 40 chars). Descriptions explain what to do next.

type SuccessKey =
  | 'confession.submitted'
  | 'confession.updated'
  | 'confession.deleted'
  | 'confession.drafted'
  | 'tip.sent'
  | 'profile.updated'
  | 'badge.earned'
  | 'reaction.added'

type ErrorKey =
  | 'confession.submitFailed'
  | 'confession.updateFailed'
  | 'confession.deleteFailed'
  | 'tip.sendFailed'
  | 'profile.updateFailed'
  | 'badge.earnFailed'
  | 'reaction.addFailed'
  | 'generic'

type InfoKey =
  | 'confession.rateLimited'
  | 'tip.pending'

type WarningKey =
  | 'confession.contentWarning'
  | 'tip.lowBalance'

interface ToastCopy {
  title: string
  description: string
}

const SUCCESS_COPY: Record<SuccessKey, ToastCopy> = {
  'confession.submitted': {
    title: 'Confession posted',
    description: 'Your confession is now live and anonymous.',
  },
  'confession.updated': {
    title: 'Confession updated',
    description: 'Your changes have been saved.',
  },
  'confession.deleted': {
    title: 'Confession removed',
    description: 'It has been permanently deleted.',
  },
  'confession.drafted': {
    title: 'Draft saved',
    description: 'You can pick this up later from your drafts.',
  },
  'tip.sent': {
    title: 'Tip sent',
    description: 'Your anonymous tip has been delivered.',
  },
  'profile.updated': {
    title: 'Profile saved',
    description: 'Your changes are live.',
  },
  'badge.earned': {
    title: 'Badge earned!',
    description: 'Check your profile to see your new badge.',
  },
  'reaction.added': {
    title: 'Reaction added',
    description: '',
  },
}

const ERROR_COPY: Record<ErrorKey, ToastCopy> = {
  'confession.submitFailed': {
    title: 'Could not post confession',
    description: 'Check your connection and try again.',
  },
  'confession.updateFailed': {
    title: 'Update failed',
    description: 'Your changes were not saved. Try again.',
  },
  'confession.deleteFailed': {
    title: 'Could not delete confession',
    description: 'Try again in a moment.',
  },
  'tip.sendFailed': {
    title: 'Tip not sent',
    description: 'Something went wrong. Your balance is unchanged.',
  },
  'profile.updateFailed': {
    title: 'Profile not saved',
    description: 'Check your connection and try again.',
  },
  'badge.earnFailed': {
    title: 'Could not award badge',
    description: 'Try again or contact support.',
  },
  'reaction.addFailed': {
    title: 'Reaction not registered',
    description: 'Try again.',
  },
  generic: {
    title: 'Something went wrong',
    description: 'Try again in a moment.',
  },
}

const INFO_COPY: Record<InfoKey, ToastCopy> = {
  'confession.rateLimited': {
    title: 'Slow down',
    description: 'You can post again in a few minutes.',
  },
  'tip.pending': {
    title: 'Tip processing',
    description: 'This usually takes a few seconds.',
  },
}

const WARNING_COPY: Record<WarningKey, ToastCopy> = {
  'confession.contentWarning': {
    title: 'Heads up',
    description: 'This confession may contain sensitive content.',
  },
  'tip.lowBalance': {
    title: 'Low balance',
    description: 'You may not have enough to complete this tip.',
  },
}

// ── Duration constants ────────────────────────────────────────────────────────

const DURATION = {
  short: 3000,    // non-critical info (reaction added)
  default: 5000,  // success / warning
  long: 8000,     // errors (user needs time to read)
} as const

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAppToast() {
  const { toast } = useToast()

  /**
   * Show a green success toast.
   * @param key    - Catalogue key for the success message.
   * @param override - Optional partial copy to override title/description.
   */
  function successToast(key: SuccessKey, override?: Partial<ToastCopy>) {
    const copy = { ...SUCCESS_COPY[key], ...override }
    toast({
      title: copy.title,
      description: copy.description || undefined,
      variant: 'default',
      duration: key === 'reaction.added' ? DURATION.short : DURATION.default,
      className: 'border-green-500 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100',
    })
  }

  /**
   * Show a red destructive error toast.
   * @param key   - Catalogue key for the error message.
   * @param error - Optional raw error (message appended in dev only).
   */
  function errorToast(key: ErrorKey, error?: unknown) {
    const copy = ERROR_COPY[key]
    const devDetail =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? ` (${error.message})`
        : ''

    toast({
      title: copy.title,
      description: copy.description + devDetail,
      duration: DURATION.long,
    })
  }

  /**
   * Show a neutral info toast.
   */
  function infoToast(key: InfoKey, override?: Partial<ToastCopy>) {
    const copy = { ...INFO_COPY[key], ...override }
    toast({
      title: copy.title,
      description: copy.description || undefined,
      variant: 'default',
      duration: DURATION.default,
    })
  }

  /**
   * Show a yellow warning toast.
   */
  function warningToast(key: WarningKey, override?: Partial<ToastCopy>) {
    const copy = { ...WARNING_COPY[key], ...override }
    toast({
      title: copy.title,
      description: copy.description || undefined,
      variant: 'default',
      duration: DURATION.long,
      className:
        'border-yellow-500 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100',
    })
  }

  return { successToast, errorToast, infoToast, warningToast }
}