'use client'

/**
 * TipButton
 *
 * Sends an anonymous tip for a confession with toast feedback.
 *
 * Toast integration points:
 *   - Tip sent     → successToast('tip.sent')
 *   - Low balance  → warningToast('tip.lowBalance')
 *   - Pending      → infoToast('tip.pending')
 *   - Error        → errorToast('tip.sendFailed')
 */

import * as React from 'react'
import { useAppToast } from './use-app-toast'

interface TipButtonProps {
  confessionId: string
  recipientAddress: string
  /** Tip amount in stroops (1 XLM = 10_000_000 stroops) */
  amount: number
  userBalance: number
}

export function TipButton({
  confessionId,
  recipientAddress,
  amount,
  userBalance,
}: TipButtonProps) {
  const [isSending, setIsSending] = React.useState(false)
  const { successToast, errorToast, infoToast, warningToast } = useAppToast()

  async function handleTip() {
    if (isSending) return

    // Warn but don't block if balance is low
    if (userBalance < amount * 1.05) {
      warningToast('tip.lowBalance')
    }

    setIsSending(true)
    infoToast('tip.pending')

    try {
      await sendTip({ confessionId, recipientAddress, amount })
      successToast('tip.sent')
    } catch (err) {
      errorToast('tip.sendFailed', err)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleTip}
      disabled={isSending}
      aria-label="Send anonymous tip"
      className="inline-flex items-center gap-1.5 rounded-full border border-input px-3 py-1.5 text-xs font-medium hover:bg-accent disabled:opacity-50"
    >
      {isSending ? 'Sending…' : '💸 Tip'}
    </button>
  )
}

// ── Stub API call ─────────────────────────────────────────────────────────────

async function sendTip(params: {
  confessionId: string
  recipientAddress: string
  amount: number
}): Promise<void> {
  const res = await fetch('/api/tips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) throw await res.json()
}