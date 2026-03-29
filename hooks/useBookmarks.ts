/**
 * hooks/useBookmarks.ts
 *
 * Issue #215 — Add Task Bookmarking
 * Stellar-Uzima/Uzima-Frontend
 *
 * Manages bookmarked task IDs in localStorage.
 * Persists across page refreshes and browser sessions.
 */

'use client'

import * as React from 'react'

const STORAGE_KEY = 'uzima:bookmarked-tasks'

function readFromStorage(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as string[]
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

function writeToStorage(ids: Set<string>): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)))
  } catch {
    // Storage quota exceeded — fail silently
  }
}

export interface UseBookmarksReturn {
  /** Set of bookmarked task IDs */
  bookmarkedIds: Set<string>
  /** Total count of bookmarked tasks */
  bookmarkCount: number
  /** Whether a given task ID is bookmarked */
  isBookmarked: (taskId: string) => boolean
  /** Toggle bookmark state for a task ID */
  toggleBookmark: (taskId: string) => void
  /** Clear all bookmarks */
  clearBookmarks: () => void
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarkedIds, setBookmarkedIds] = React.useState<Set<string>>(
    () => new Set(),
  )

  // Hydrate from localStorage on mount
  React.useEffect(() => {
    setBookmarkedIds(readFromStorage())
  }, [])

  const toggleBookmark = React.useCallback((taskId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) {
        next.delete(taskId)
      } else {
        next.add(taskId)
      }
      writeToStorage(next)
      return next
    })
  }, [])

  const isBookmarked = React.useCallback(
    (taskId: string) => bookmarkedIds.has(taskId),
    [bookmarkedIds],
  )

  const clearBookmarks = React.useCallback(() => {
    setBookmarkedIds(new Set())
    writeToStorage(new Set())
  }, [])

  return {
    bookmarkedIds,
    bookmarkCount: bookmarkedIds.size,
    isBookmarked,
    toggleBookmark,
    clearBookmarks,
  }
}