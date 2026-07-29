/**
 * components/profile/ReminderScheduler.tsx
 *
 * Issue #326 — Task reminder scheduling (in-app + push)
 * Stellar-Uzima/Uzima-Frontend
 *
 * Lets the user pick a daily reminder time and the days it applies to, and
 * explains how the reminder will be delivered (push vs. in-app only).
 */

'use client';

import * as React from 'react';
import { Bell, BellOff, BellRing, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import {
  DAY_LABELS,
  REMINDER_DAYS,
  ReminderDay,
  formatReminderTime,
  useTaskReminders,
} from '@/hooks/useTaskReminders';

function formatNextFire(nextFireAt: number): string {
  const date = new Date(nextFireAt);
  const time = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const daysAway = Math.floor((nextFireAt - startOfToday) / 86_400_000);

  if (daysAway === 0) return `today at ${time}`;
  if (daysAway === 1) return `tomorrow at ${time}`;

  const day = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  return `${day} at ${time}`;
}

export function ReminderScheduler({
  categoryEnabled,
  onEnableCategory,
}: {
  /** The "Task reminders" toggle from the notification-preferences panel. */
  categoryEnabled: boolean;
  /** Lets the user re-enable the category from here when it's off. */
  onEnableCategory?: () => void;
}) {
  const { status, isSupported, subscribe, syncMetadata } = usePushNotifications();
  const pushActive = status === 'subscribed';

  const {
    schedule,
    hydrated,
    isActive,
    nextFireAt,
    metadata,
    setEnabled,
    setTime,
    toggleDay,
    clearSchedule,
  } = useTaskReminders({ categoryEnabled, pushActive });

  const metadataRef = React.useRef(metadata);
  metadataRef.current = metadata;

  // Keep the backend's copy of the schedule in step with the UI. Keyed on the
  // user's choices only — `nextFireAt` moves on its own and would re-sync
  // needlessly.
  const syncKey = `${metadata.enabled}|${metadata.time}|${metadata.days.join(',')}`;
  React.useEffect(() => {
    if (!hydrated || !pushActive) return;
    void syncMetadata({ schedules: [metadataRef.current] });
  }, [hydrated, pushActive, syncKey, syncMetadata]);

  const hasDays = schedule.days.length > 0;
  const showFallbackNotice = isActive && !pushActive;

  async function onEnablePush() {
    await subscribe({ schedules: [metadataRef.current] });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily task reminder</CardTitle>
        <CardDescription>
          Pick a time to be nudged about your health tasks, and the days it should apply to
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="font-medium">Remind me daily</div>
            <div className="text-sm text-muted-foreground">
              {hydrated && isActive && nextFireAt
                ? `Next reminder ${formatNextFire(nextFireAt)}`
                : 'No reminder scheduled'}
            </div>
          </div>
          <Switch
            checked={schedule.enabled}
            onCheckedChange={setEnabled}
            aria-label="Remind me daily about my health tasks"
          />
        </div>

        {!categoryEnabled && (
          <div className="flex items-start gap-3 rounded-md border border-dashed p-3">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
            <div className="text-sm space-y-2">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Task reminders are turned off</span> in
                your notification preferences above, so nothing will be sent even with a schedule
                saved here.
              </p>
              {onEnableCategory && (
                <Button type="button" variant="outline" size="sm" onClick={onEnableCategory}>
                  Turn task reminders back on
                </Button>
              )}
            </div>
          </div>
        )}

        <fieldset disabled={!schedule.enabled} className="space-y-6 disabled:opacity-60">
          <div className="space-y-2 max-w-xs">
            <Label htmlFor="reminderTime">Reminder time</Label>
            <input
              id="reminderTime"
              type="time"
              className="w-full h-10 border rounded-md px-3 bg-background disabled:cursor-not-allowed"
              value={schedule.time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label id="reminderDaysLabel">Repeat on</Label>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="reminderDaysLabel">
              {REMINDER_DAYS.map((day: ReminderDay) => {
                const selected = schedule.days.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    aria-pressed={selected}
                    disabled={!schedule.enabled}
                    className={`h-10 min-w-12 px-3 rounded-md border text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                      selected
                        ? 'bg-[#B84E20] border-[#B84E20] text-white'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    {DAY_LABELS[day]}
                  </button>
                );
              })}
            </div>
            {schedule.enabled && !hasDays && (
              <p className="text-sm text-destructive">
                Pick at least one day for the reminder to run.
              </p>
            )}
          </div>
        </fieldset>

        {schedule.enabled && hasDays && (
          <p className="text-sm text-muted-foreground">
            Reminding you at {formatReminderTime(schedule.time)} on{' '}
            {schedule.days.map((d) => DAY_LABELS[d]).join(', ')}.
          </p>
        )}

        <DeliveryNotice
          isSupported={isSupported}
          status={status}
          showFallbackNotice={showFallbackNotice}
          onEnablePush={onEnablePush}
        />

        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={clearSchedule}
            disabled={!schedule.enabled}
          >
            Remove reminder
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function DeliveryNotice({
  isSupported,
  status,
  showFallbackNotice,
  onEnablePush,
}: {
  isSupported: boolean;
  status: ReturnType<typeof usePushNotifications>['status'];
  showFallbackNotice: boolean;
  onEnablePush: () => void;
}) {
  if (status === 'subscribed') {
    return (
      <div className="flex items-start gap-3 rounded-md bg-muted/50 p-3">
        <BellRing className="w-4 h-4 mt-0.5 shrink-0 text-[#B84E20]" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Push notifications are on.</span> Your
          reminder will reach this device even when the app is closed.
        </p>
      </div>
    );
  }

  if (!isSupported) {
    return (
      <div className="flex items-start gap-3 rounded-md bg-muted/50 p-3">
        <BellOff className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">In-app reminders only.</span> This browser
          doesn&apos;t support push notifications, so you&apos;ll see the reminder in your
          notification list the next time you open Uzima.
        </p>
      </div>
    );
  }

  if (status === 'denied') {
    return (
      <div className="flex items-start gap-3 rounded-md bg-muted/50 p-3">
        <BellOff className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">In-app reminders only.</span> Notifications
          are blocked for this site, so we can&apos;t send a push at your chosen time. You&apos;ll
          still see the reminder in your notification list the next time you open Uzima. To get
          pushes, allow notifications for this site in your browser settings.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-muted/50 p-3 space-y-3">
      <div className="flex items-start gap-3">
        <Bell className="w-4 h-4 mt-0.5 shrink-0 text-[#B84E20]" />
        <p className="text-sm text-muted-foreground">
          {showFallbackNotice ? (
            <>
              <span className="font-medium text-foreground">In-app reminders only.</span> Push
              notifications aren&apos;t enabled yet, so the reminder will appear in your
              notification list the next time you open Uzima rather than arriving at your chosen
              time.
            </>
          ) : (
            <>
              Enable push notifications to have your reminder arrive on time, even when the app is
              closed.
            </>
          )}
        </p>
      </div>
      <Button type="button" size="sm" onClick={onEnablePush} disabled={status === 'loading'}>
        <Bell className="w-4 h-4 mr-2" />
        {status === 'loading' ? 'Setting up...' : 'Enable push notifications'}
      </Button>
    </div>
  );
}
