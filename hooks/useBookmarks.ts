"use client";

import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "uzima-bookmarked-tasks";

function getStoredBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === "string");
  } catch {
    return [];
  }
}

function persistBookmarks(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

export interface UseBookmarksReturn {
  /** Array of bookmarked task IDs */
  bookmarkedIds: string[];
  /** Toggle bookmark for a given task ID */
  toggleBookmark: (taskId: string) => void;
  /** Check if a task ID is bookmarked */
  isBookmarked: (taskId: string) => boolean;
  /** Number of bookmarks */
  bookmarkCount: number;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    // Initialise synchronously from localStorage on mount
    if (typeof window !== "undefined") {
      return getStoredBookmarks();
    }
    return [];
  });

  // Keep localStorage in sync
  useEffect(() => {
    persistBookmarks(bookmarkedIds);
  }, [bookmarkedIds]);

  const toggleBookmark = useCallback((taskId: string) => {
    setBookmarkedIds((prev) => {
      if (prev.includes(taskId)) {
        return prev.filter((id) => id !== taskId);
      }
      return [...prev, taskId];
    });
  }, []);

  const isBookmarked = useCallback(
    (taskId: string) => bookmarkedIds.includes(taskId),
    [bookmarkedIds],
  );

  return {
    bookmarkedIds,
    toggleBookmark,
    isBookmarked,
    bookmarkCount: bookmarkedIds.length,
  };
}
