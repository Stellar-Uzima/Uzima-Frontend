export function registerServiceWorker() {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);

      registration.addEventListener('updatefound', () => {
        console.log('New service worker detected');
      });
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}
