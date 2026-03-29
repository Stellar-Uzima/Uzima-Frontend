self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('push', (event) => {
  const handlePush = async () => {
    let data = {};

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

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url ?? '/dashboard';

  const handleClick = async () => {
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of clients) {
      if ('navigate' in client) {
        await client.navigate(url);
        await client.focus();
        return;
      }
    }

    await self.clients.openWindow(url);
  };

  event.waitUntil(handleClick());
});
