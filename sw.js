// En minimal Service Worker som krävs för att göra sidan till en PWA
const CACHE_NAME = 'elpriser-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './elpriser.html',
                './elomraden-karta.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});