'use client'

/**
 * ConfessionForm
 *
 * Handles confession submission (create) and editing (update) with toast
 * feedback for every terminal outcome: posted, updated, drafted, or failed.
 *
 * Toast integration points:
 *   - Submit success  → successToast('confession.submitted')
 *   - Update success  → successToast('confession.updated')
 *   - Save draft      → successToast('confession.drafted')
 *   - Rate limited    → infoToast('confession.rateLimited')
 *   - Any error       → errorToast('confession.submitFailed' | 'confession.updateFailed')
 */

import * as React from 'react'
import { useAppToast } from './ui/use-app-toast'

interface ConfessionFormProps {
  /** If provided, the form is in edit mode for this confession ID */
  confessionId?: string
  initialContent?: string
  onSuccess?: () => void
}

export function ConfessionForm({
  confessionId,
  initialContent = '',
  onSuccess,
}: ConfessionFormProps) {
  const [content, setContent] = React.useState(initialContent)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSavingDraft, setIsSavingDraft] = React.useState(false)

  const { successToast, errorToast, infoToast } = useAppToast()

  const isEditing = Boolean(confessionId)

  // ── Submit / Update ─────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      if (isEditing) {
        await updateConfession(confessionId!, content)
        successToast('confession.updated')
      } else {
        await submitConfession(content)
        successToast('confession.submitted')
        setContent('')
      }
      onSuccess?.()
    } catch (err) {
      if (isRateLimitError(err)) {
        infoToast('confession.rateLimited')
      } else {
        errorToast(
          isEditing ? 'confession.updateFailed' : 'confession.submitFailed',
          err,
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Save draft ──────────────────────────────────────────────────────────────

  async function handleSaveDraft() {
    if (!content.trim() || isSavingDraft) return

    setIsSavingDraft(true)
    try {
      await saveDraft(content)
      successToast('confession.drafted')
    } catch (err) {
      errorToast('confession.submitFailed', err)
    } finally {
      setIsSavingDraft(false)
    }
  }

  // ── Delete (edit mode only) ─────────────────────────────────────────────────

  async function handleDelete() {
    if (!confessionId) return
    try {
      await deleteConfession(confessionId)
      successToast('confession.deleted')
      onSuccess?.()
    } catch (err) {
      errorToast('confession.deleteFailed', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="min-h-[120px] w-full resize-none rounded-md border border-input bg-background p-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        disabled={isSubmitting}
        maxLength={2000}
        aria-label="Confession content"
      />

      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          {!isEditing && (
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSavingDraft || !content.trim()}
              className="rounded-md border border-input px-4 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50"
            >
              {isSavingDraft ? 'Saving…' : 'Save draft'}
            </button>
          )}

          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-md px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
            >
              Delete
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting
            ? isEditing
              ? 'Saving…'
              : 'Posting…'
            : isEditing
              ? 'Save changes'
              : 'Post confession'}
        </button>
      </div>
    </form>
  )
}

// ── Stub API calls (replace with your actual service calls) ──────────────────

async function submitConfession(content: string): Promise<void> {
  const res = await fetch('/api/confessions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw await res.json()
}

async function updateConfession(id: string, content: string): Promise<void> {
  const res = await fetch(`/api/confessions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw await res.json()
}

async function saveDraft(content: string): Promise<void> {
  const res = await fetch('/api/confessions/drafts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  })
  if (!res.ok) throw await res.json()
}

async function deleteConfession(id: string): Promise<void> {
  const res = await fetch(`/api/confessions/${id}`, { method: 'DELETE' })
  if (!res.ok) throw await res.json()
}

function isRateLimitError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    (err as { status: number }).status === 429
  )
}