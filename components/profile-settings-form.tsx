'use client'

/**
 * ProfileSettingsForm
 *
 * Handles profile update with toast feedback.
 *
 * Toast integration points:
 *   - Save success → successToast('profile.updated')
 *   - Save error   → errorToast('profile.updateFailed')
 */

import * as React from 'react'
import { useAppToast } from './ui/use-app-toast'

interface ProfileFormData {
  displayName: string
  bio: string
  avatarUrl: string
}

interface ProfileSettingsFormProps {
  initialData: ProfileFormData
}

export function ProfileSettingsForm({ initialData }: ProfileSettingsFormProps) {
  const [form, setForm] = React.useState<ProfileFormData>(initialData)
  const [isSaving, setIsSaving] = React.useState(false)

  const { successToast, errorToast } = useAppToast()

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSaving(true)
    try {
      await updateProfile(form)
      successToast('profile.updated')
    } catch (err) {
      errorToast('profile.updateFailed', err)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-lg">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="displayName" className="text-sm font-medium">
          Display name
        </label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={form.displayName}
          onChange={handleChange}
          maxLength={50}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bio" className="text-sm font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChange}
          rows={3}
          maxLength={200}
          className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="self-end rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isSaving ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  )
}

// ── Stub API call ─────────────────────────────────────────────────────────────

async function updateProfile(data: ProfileFormData): Promise<void> {
  const res = await fetch('/api/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw await res.json()
}