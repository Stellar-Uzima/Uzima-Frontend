'use client';

import { useState, useEffect, useCallback } from 'react';
import { NotificationCategory, NotificationPreferences } from '../components/notifications/types';

const STORAGE_KEY = 'notification_preferences';

const DEFAULT_PREFERENCES: NotificationPreferences = {
  categories: {
    task: true,
    streak: true,
    badge: true,
    appointment: true,
  },
  channels: {
    inApp: true,
    push: false,
  },
};

export function useNotificationPreferences() {
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          categories: { ...DEFAULT_PREFERENCES.categories, ...parsed.categories },
          channels: { ...DEFAULT_PREFERENCES.channels, ...parsed.channels },
        });
      }
    } catch (e) {
      console.error('Failed to parse notification preferences:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  const updatePreferences = useCallback((newPrefs: NotificationPreferences) => {
    setPreferences(newPrefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.error('Failed to save notification preferences:', e);
    }
  }, []);

  const toggleCategory = useCallback((category: keyof NotificationPreferences['categories']) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        categories: {
          ...prev.categories,
          [category]: !prev.categories[category],
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save category preference:', e);
      }
      return updated;
    });
  }, []);

  const toggleChannel = useCallback((channel: keyof NotificationPreferences['channels']) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        channels: {
          ...prev.channels,
          [channel]: !prev.channels[channel],
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save channel preference:', e);
      }
      return updated;
    });
  }, []);

  const isCategoryEnabled = useCallback((category?: NotificationCategory): boolean => {
    if (!category || category === 'system') return true;
    if (category in preferences.categories) {
      return preferences.categories[category as keyof NotificationPreferences['categories']];
    }
    return true;
  }, [preferences.categories]);

  return {
    preferences,
    isLoaded,
    toggleCategory,
    toggleChannel,
    updatePreferences,
    isCategoryEnabled,
  };
}