'use client';

import { useState, useEffect, useCallback } from 'react';

export type PushStatus =
  | 'idle'
  | 'loading'
  | 'subscribed'
  | 'unsubscribed'
  | 'denied'
  | 'unsupported';

/**
 * A scheduled notification the backend should deliver at a user-chosen time.
 * Entries are addressed by `tag`, so pushing an entry with `enabled: false`
 * stops just that kind of reminder and leaves other notification types alone.
 */
export interface PushScheduleMetadata {
  tag: string;
  topic: string;
  enabled: boolean;
  [key: string]: unknown;
}

/** Extra data sent alongside the raw subscription. */
export interface PushSubscriptionMetadata {
  schedules?: PushScheduleMetadata[];
}

export interface UsePushNotificationsReturn {
  status: PushStatus;
  isSupported: boolean;
  subscribe: (metadata?: PushSubscriptionMetadata) => Promise<void>;
  unsubscribe: () => Promise<void>;
  /**
   * Pushes updated schedule metadata for an already-registered subscription,
   * so editing a reminder doesn't require re-subscribing. No-op when the
   * device isn't subscribed.
   */
  syncMetadata: (metadata: PushSubscriptionMetadata) => Promise<void>;
}

async function postSubscription(
  subscription: PushSubscription,
  metadata?: PushSubscriptionMetadata,
): Promise<void> {
  await fetch('/api/notifications/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // Subscription fields stay at the top level for backwards compatibility;
    // metadata is merged in beside them.
    body: JSON.stringify({ ...subscription.toJSON(), ...metadata }),
  });
}

function urlBase64ToUint8Array(base64String: string): Uint8Array<ArrayBuffer> {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const buffer = new ArrayBuffer(rawData.length);
  const view = new Uint8Array(buffer);
  for (let i = 0; i < rawData.length; i++) view[i] = rawData.charCodeAt(i);
  return view;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const isSupported =
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window;

  const [status, setStatus] = useState<PushStatus>(isSupported ? 'idle' : 'unsupported');

  useEffect(() => {
    if (!isSupported) return;

    const init = async () => {
      try {
        const registration =
          (await navigator.serviceWorker.getRegistration()) ??
          (await navigator.serviceWorker.register('/sw.js'));

        if (Notification.permission === 'denied') {
          setStatus('denied');
          return;
        }

        const subscription = await registration.pushManager.getSubscription();
        setStatus(subscription ? 'subscribed' : 'unsubscribed');
      } catch (err) {
        console.error('[PushNotifications] init error:', err);
        setStatus('idle');
      }
    };

    init();
  }, [isSupported]);

  const subscribe = useCallback(
    async (metadata?: PushSubscriptionMetadata) => {
      if (!isSupported) return;
      setStatus('loading');

      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          setStatus('denied');
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          ...(vapidKey && { applicationServerKey: urlBase64ToUint8Array(vapidKey) }),
        });

        await postSubscription(subscription, metadata);

        setStatus('subscribed');
      } catch (error) {
        console.error('Push subscription failed:', error);
        setStatus('unsubscribed');
      }
    },
    [isSupported],
  );

  const syncMetadata = useCallback(
    async (metadata: PushSubscriptionMetadata) => {
      if (!isSupported || status !== 'subscribed') return;

      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (!subscription) return;

        await postSubscription(subscription, metadata);
      } catch (error) {
        console.error('Push metadata sync failed:', error);
      }
    },
    [isSupported, status],
  );

  const unsubscribe = useCallback(async () => {
    if (!isSupported) return;
    setStatus('loading');

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
      }

      setStatus('unsubscribed');
    } catch (error) {
      console.error('Push unsubscription failed:', error);
      setStatus('subscribed');
    }
  }, [isSupported]);

  return { status, isSupported, subscribe, unsubscribe, syncMetadata };
}
