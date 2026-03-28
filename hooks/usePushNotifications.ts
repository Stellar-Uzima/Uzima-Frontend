'use client';

import { useState, useEffect, useCallback } from 'react';

export type PushStatus =
  | 'idle'
  | 'loading'
  | 'subscribed'
  | 'unsubscribed'
  | 'denied'
  | 'unsupported';

export interface UsePushNotificationsReturn {
  status: PushStatus;
  isSupported: boolean;
  subscribe: () => Promise<void>;
  unsubscribe: () => Promise<void>;
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
        await navigator.serviceWorker.register('/sw.js');

        if (Notification.permission === 'denied') {
          setStatus('denied');
          return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setStatus(subscription ? 'subscribed' : 'unsubscribed');
      } catch (err) {
        console.error('[PushNotifications] init error:', err);
        setStatus('idle');
      }
    };

    init();
  }, [isSupported]);

  const subscribe = useCallback(async () => {
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

      await fetch('/api/notifications/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription),
      });

      setStatus('subscribed');
    } catch (error) {
      console.error('Push subscription failed:', error);
      setStatus('unsubscribed');
    }
  }, [isSupported]);

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

  return { status, isSupported, subscribe, unsubscribe };
}
