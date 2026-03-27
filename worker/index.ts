const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('push', (event) => {
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

    await sw.registration.showNotification(title, {
      body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: type || 'general',
      data: { url: notificationUrl },
    });
  };

  event.waitUntil(handlePush());
});

sw.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url: string = event.notification.data?.url ?? '/dashboard';

  const handleClick = async () => {
    const clients = await sw.clients.matchAll({ type: 'window', includeUncontrolled: true });

    for (const client of clients) {
      if ('navigate' in client) {
        await (client as WindowClient).navigate(url);
        await client.focus();
        return;
      }
    }

    await sw.clients.openWindow(url);
  };

  event.waitUntil(handleClick());
});
