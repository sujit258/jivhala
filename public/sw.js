// Jivhala ❤️ Service Worker
const CACHE_NAME = 'jivhala-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/home',
  '/companion',
  '/settings',
  '/manifest.webmanifest',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg',
  '/icons/notification-badge.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Cache prefetch error:', err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-first strategy with cache fallback
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and skip API / Next internals
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const resClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('/home');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
  );
});

// Real Web Push Event Handler
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: 'Jivhala ❤️', body: event.data.text() };
    }
  }

  const title = data.title || 'Jivhala ❤️';
  const notificationId = data.notificationId || `push-${Date.now()}`;
  const targetUrl = data.url || `/care/${notificationId}`;

  const options = {
    body: data.body || 'छोट्या छोट्या गोष्टींची काळजी.',
    icon: data.icon || '/icons/icon-192.png',
    badge: '/icons/notification-badge.svg',
    tag: data.tag || `jivhala-reminder-${data.category || 'care'}`,
    renotify: true,
    requireInteraction: true,
    vibrate: [100, 50, 100],
    data: {
      url: targetUrl,
      notificationId: notificationId,
      category: data.category || 'care',
      timestamp: Date.now()
    },
    actions: [
      { action: 'open_care', title: 'पहा ❤️' },
      { action: 'dismiss', title: 'नंतर' }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification Click Handler - Direct jump into /care/[notificationId]
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  if (action === 'dismiss') {
    return;
  }

  const notificationData = event.notification.data || {};
  const targetUrl = notificationData.url || (notificationData.notificationId ? `/care/${notificationData.notificationId}` : '/care/latest');

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // If a window is already open, focus it and navigate
      for (const client of windowClients) {
        if ('focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      // If no window is open, open a new window directly to the immersive screen
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
