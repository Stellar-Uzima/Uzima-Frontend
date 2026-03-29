/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;
const APP_VERSION = "2.0.3"; //update this value to trigger the update banner for testing
//update this value to trigger the update banner for testing
const UPDATE_VERSION = "2.0.1";

export {};

self.addEventListener('install', (event: ExtendableEvent) => {
  self.skipWaiting();
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event: PushEvent) => {
  const handlePush = async () => {
    let data: { type?: string; title?: string; body?: string; url?: string } = {};

    try {
      data = event.data?.json() ?? {};
    } catch {
      const text = await event.data?.text();
      data = { title: text ?? 'Notification', body: '' };
    }

    const { type, title = 'Stellar Uzima', body = '', url } = data;

    let mappedUrl = '/dashboard';
    if (type === 'TASK_REMINDER') {
      mappedUrl = '/tasks';
    } else if (type === 'XLM_EARNED' || type === 'STREAK_AT_RISK') {
      mappedUrl = '/dashboard';
    }

    const notificationUrl = url ?? mappedUrl;

    await self.registration.showNotification(title, {
      body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: type || 'general',
      data: { url: notificationUrl },
    });
  };

  event.waitUntil(handlePush());
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  const url: string = event.notification.data?.url ?? '/dashboard';

  const handleClick = async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });

    for (const client of clients) {
      if ('navigate' in client) {
        await (client as WindowClient).navigate(url);
        await client.focus();
        return;
      }
    }

    await self.clients.openWindow(url);
  };

  event.waitUntil(handleClick());
});
