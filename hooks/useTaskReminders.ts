/**
 * hooks/useTaskReminders.ts
 *
 * Issue #326 — Task reminder scheduling (in-app + push)
 * Stellar-Uzima/Uzima-Frontend
 *
 * Owns the user's preferred daily reminder time / days, persists it in
 * localStorage, computes the next fire time, and — when push delivery is not
 * available — falls back to an in-app reminder on the next visit.
 */

'use client';

import * as React from 'react';
import { useNotificationContext } from '../context/NotificationContext';
import type { PushScheduleMetadata } from './usePushNotifications';

const STORAGE_KEY = 'uzima:task-reminders';

/** How often we re-check whether a scheduled reminder has come due. */
const CHECK_INTERVAL_MS = 30_000;

/** Reminders older than this are considered stale and are not delivered late. */
const MAX_LATE_DELIVERY_MS = 24 * 60 * 60 * 1000;

/** Tag/topic the backend uses to address task-reminder pushes specifically. */
export const TASK_REMINDER_TAG = 'task-reminder';
export const TASK_REMINDER_TOPIC = 'task-reminders';

/** 0 = Sunday … 6 = Saturday, matching `Date.prototype.getDay()`. */
export type ReminderDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const DAY_LABELS: Record<ReminderDay, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export const REMINDER_DAYS: ReminderDay[] = [0, 1, 2, 3, 4, 5, 6];

export interface ReminderSchedule {
  /** Whether the user wants a daily reminder at all. */
  enabled: boolean;
  /** Preferred time of day, "HH:mm" in 24h form (matches `<input type="time">`). */
  time: string;
  /** Days the reminder applies to. */
  days: ReminderDay[];
}

export const DEFAULT_REMINDER_SCHEDULE: ReminderSchedule = {
  enabled: false,
  time: '08:00',
  days: [1, 2, 3, 4, 5],
};

/**
 * Schedule metadata handed to the push subscription so the backend knows when
 * to send. Keyed by `tag` so disabling reminders never affects other types.
 */
export interface TaskReminderMetadata extends PushScheduleMetadata {
  tag: typeof TASK_REMINDER_TAG;
  topic: typeof TASK_REMINDER_TOPIC;
  enabled: boolean;
  time: string;
  days: ReminderDay[];
  timeZone: string;
  nextFireAt: number | null;
}

function parseTime(time: string): { hours: number; minutes: number } | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return { hours, minutes };
}

function isReminderDay(value: unknown): value is ReminderDay {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 6;
}

/** Formats "08:00" using the visitor's locale, e.g. "8:00 AM". */
export function formatReminderTime(time: string): string {
  const parsed = parseTime(time);
  if (!parsed) return time;
  const date = new Date();
  date.setHours(parsed.hours, parsed.minutes, 0, 0);
  return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

/**
 * The first moment strictly after `from` at which the schedule fires,
 * or `null` when the schedule can never fire (disabled / no days / bad time).
 */
export function computeNextFireTime(
  schedule: ReminderSchedule,
  from: number = Date.now(),
): number | null {
  if (!schedule.enabled || schedule.days.length === 0) return null;
  const parsed = parseTime(schedule.time);
  if (!parsed) return null;

  const base = new Date(from);
  // Look ahead 8 days: today's slot may already have passed, and the only
  // selected day may be today (i.e. a week from now).
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() + offset,
      parsed.hours,
      parsed.minutes,
      0,
      0,
    );
    if (candidate.getTime() > from && schedule.days.includes(candidate.getDay() as ReminderDay)) {
      return candidate.getTime();
    }
  }
  return null;
}

/**
 * The most recent moment at or before `upTo` at which the schedule fired.
 * Used to surface a reminder the user missed while the app was closed.
 */
export function computeLastFireTime(
  schedule: ReminderSchedule,
  upTo: number = Date.now(),
): number | null {
  if (!schedule.enabled || schedule.days.length === 0) return null;
  const parsed = parseTime(schedule.time);
  if (!parsed) return null;

  const base = new Date(upTo);
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(
      base.getFullYear(),
      base.getMonth(),
      base.getDate() - offset,
      parsed.hours,
      parsed.minutes,
      0,
      0,
    );
    if (candidate.getTime() <= upTo && schedule.days.includes(candidate.getDay() as ReminderDay)) {
      return candidate.getTime();
    }
  }
  return null;
}

interface StoredState {
  schedule: ReminderSchedule;
  /** Fire time of the last reminder we already delivered in-app. */
  lastFiredAt: number | null;
}

function sanitizeSchedule(value: unknown): ReminderSchedule | null {
  if (!value || typeof value !== 'object') return null;
  const raw = value as Partial<ReminderSchedule>;
  if (typeof raw.time !== 'string' || !parseTime(raw.time)) return null;

  const days = Array.isArray(raw.days) ? raw.days.filter(isReminderDay) : [];
  return {
    enabled: raw.enabled === true,
    time: raw.time,
    days: Array.from(new Set(days)).sort((a, b) => a - b),
  };
}

function readStoredState(): StoredState {
  const fallback: StoredState = { schedule: DEFAULT_REMINDER_SCHEDULE, lastFiredAt: null };
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StoredState>;
    const schedule = sanitizeSchedule(parsed.schedule);
    if (!schedule) return fallback;
    return {
      schedule,
      lastFiredAt: typeof parsed.lastFiredAt === 'number' ? parsed.lastFiredAt : null,
    };
  } catch {
    return fallback;
  }
}

function writeStoredState(state: StoredState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable or over quota — fail silently.
  }
}

export interface UseTaskRemindersOptions {
  /**
   * The "Task reminders" category toggle from the notification-preferences
   * panel. When it is off, nothing is scheduled or delivered.
   */
  categoryEnabled?: boolean;
  /**
   * Whether push delivery is currently active for this device. When true the
   * hook stops delivering in-app reminders and leaves it to the push payload.
   */
  pushActive?: boolean;
}

export interface UseTaskRemindersReturn {
  schedule: ReminderSchedule;
  /** True once the persisted schedule has been read from localStorage. */
  hydrated: boolean;
  /** Schedule is on *and* the category toggle allows it. */
  isActive: boolean;
  /** Next fire time, or null when the reminder can never fire. */
  nextFireAt: number | null;
  /** Metadata to include in the push subscription payload. */
  metadata: TaskReminderMetadata;
  setEnabled: (enabled: boolean) => void;
  setTime: (time: string) => void;
  toggleDay: (day: ReminderDay) => void;
  setDays: (days: ReminderDay[]) => void;
  /** Removes the reminder entirely and resets to defaults. */
  clearSchedule: () => void;
}

export function useTaskReminders(
  options: UseTaskRemindersOptions = {},
): UseTaskRemindersReturn {
  const { categoryEnabled = true, pushActive = false } = options;
  const { addNotification, hydrated: notificationsHydrated } = useNotificationContext();

  // Schedule and delivery bookmark move together, so they live in one state.
  const [{ schedule, lastFiredAt }, setState] = React.useState<StoredState>({
    schedule: DEFAULT_REMINDER_SCHEDULE,
    lastFiredAt: null,
  });
  const [hydrated, setHydrated] = React.useState(false);
  // Reference point for "next" fire time, refreshed once a pending fire time
  // elapses so the UI never shows a reminder in the past.
  const [clock, setClock] = React.useState(0);

  // Hydrate from localStorage on mount.
  React.useEffect(() => {
    setState(readStoredState());
    setClock(Date.now());
    setHydrated(true);
  }, []);

  // Persist every change, but never before hydration (that would clobber it).
  React.useEffect(() => {
    if (!hydrated) return;
    writeStoredState({ schedule, lastFiredAt });
  }, [hydrated, schedule, lastFiredAt]);

  const isActive = categoryEnabled && schedule.enabled;

  const effectiveSchedule = React.useMemo<ReminderSchedule>(
    () => ({ ...schedule, enabled: isActive }),
    [schedule, isActive],
  );

  const nextFireAt = React.useMemo(
    () => computeNextFireTime(effectiveSchedule, clock),
    [effectiveSchedule, clock],
  );

  const nextFireAtRef = React.useRef<number | null>(nextFireAt);
  nextFireAtRef.current = nextFireAt;

  const deliverIfDue = React.useCallback(() => {
    if (!hydrated || !notificationsHydrated) return;

    const now = Date.now();
    if (nextFireAtRef.current !== null && nextFireAtRef.current <= now) {
      setClock(now);
    }

    // Push is delivering these — don't double up with an in-app copy.
    if (!isActive || pushActive) return;

    const dueAt = computeLastFireTime(effectiveSchedule, now);
    if (dueAt === null) return;
    if (lastFiredAt !== null && dueAt <= lastFiredAt) return;

    // Missed by more than a day (e.g. away for a week) — skip the stale one and
    // wait for the next slot rather than showing an outdated nudge.
    if (now - dueAt > MAX_LATE_DELIVERY_MS) {
      setState((prev) => ({ ...prev, lastFiredAt: dueAt }));
      return;
    }

    addNotification({
      id: `${TASK_REMINDER_TAG}:${dueAt}`,
      type: 'task_reminder',
      title: 'Time for your health tasks',
      description: `You asked to be reminded at ${formatReminderTime(
        effectiveSchedule.time,
      )}. Open Tasks to keep your streak going.`,
      timestamp: dueAt,
      read: false,
    });
    setState((prev) => ({ ...prev, lastFiredAt: dueAt }));
  }, [
    addNotification,
    effectiveSchedule,
    hydrated,
    isActive,
    lastFiredAt,
    notificationsHydrated,
    pushActive,
  ]);

  // Check on mount/changes, on a slow interval while open, and whenever the
  // tab is brought back to the foreground (timers stall in background tabs).
  React.useEffect(() => {
    deliverIfDue();

    const interval = window.setInterval(deliverIfDue, CHECK_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') deliverIfDue();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [deliverIfDue]);

  /**
   * Applies a schedule edit. Also refreshes the clock so the next fire time is
   * measured from the moment of the change, and moves the delivery bookmark up
   * to the slot that has already passed today — a schedule the user just
   * created shouldn't immediately fire for a time earlier in the day.
   */
  const updateSchedule = React.useCallback(
    (updater: (prev: ReminderSchedule) => ReminderSchedule) => {
      const now = Date.now();
      setState((prev) => {
        const nextSchedule = updater(prev.schedule);
        const alreadyPassed = computeLastFireTime({ ...nextSchedule, enabled: true }, now);
        return {
          schedule: nextSchedule,
          lastFiredAt:
            alreadyPassed === null
              ? prev.lastFiredAt
              : Math.max(prev.lastFiredAt ?? 0, alreadyPassed),
        };
      });
      setClock(now);
    },
    [],
  );

  const setEnabled = React.useCallback(
    (enabled: boolean) => updateSchedule((prev) => ({ ...prev, enabled })),
    [updateSchedule],
  );

  const setTime = React.useCallback(
    (time: string) => updateSchedule((prev) => ({ ...prev, time })),
    [updateSchedule],
  );

  const setDays = React.useCallback(
    (days: ReminderDay[]) =>
      updateSchedule((prev) => ({
        ...prev,
        days: Array.from(new Set(days)).sort((a, b) => a - b),
      })),
    [updateSchedule],
  );

  const toggleDay = React.useCallback(
    (day: ReminderDay) =>
      updateSchedule((prev) => ({
        ...prev,
        days: prev.days.includes(day)
          ? prev.days.filter((d) => d !== day)
          : [...prev.days, day].sort((a, b) => a - b),
      })),
    [updateSchedule],
  );

  const clearSchedule = React.useCallback(() => {
    setState({ schedule: DEFAULT_REMINDER_SCHEDULE, lastFiredAt: null });
    setClock(Date.now());
  }, []);

  const metadata = React.useMemo<TaskReminderMetadata>(
    () => ({
      tag: TASK_REMINDER_TAG,
      topic: TASK_REMINDER_TOPIC,
      enabled: isActive,
      time: schedule.time,
      days: schedule.days,
      timeZone:
        typeof Intl === 'undefined'
          ? 'UTC'
          : Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      nextFireAt,
    }),
    [isActive, schedule.time, schedule.days, nextFireAt],
  );

  return {
    schedule,
    hydrated,
    isActive,
    nextFireAt,
    metadata,
    setEnabled,
    setTime,
    toggleDay,
    setDays,
    clearSchedule,
  };
}
