const CACHE_NAME = 'portfolio-v1';
const urlsToCache = ['.', 'index.html', 'styles.css', 'script.js', 'manifest.json'];

// Install event: cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error('Cache installation failed:', err);
      }),
  );
  globalThis.skipWaiting?.();
});

// Fetch event: serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if valid response before caching
          const isValid = response?.status === 200 && response.type !== 'error';

          if (isValid) {
            // Clone and cache successful responses
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }

          return response;
        });
      })
      .catch(() => {
        // Return offline page or placeholder
        console.log('Network request failed, falling back to cache');
        return caches
          .match('./index.html')
          .catch(() => new Response('Offline - unable to load cache', { status: 503 }));
      }),
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  globalThis.clients?.claim?.();
});
