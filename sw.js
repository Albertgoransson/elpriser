const CACHE_NAME = 'elpriser-v2'; // Nytt namn tvingar fram en uppdatering

self.addEventListener('install', event => {
    self.skipWaiting(); // Tvingar den nya versionen att ta över direkt
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll([
                './elpriser.html',
                './elomraden-karta.png'
            ]);
        })
    );
});

// Städa bort gamla versioner från telefonens minne
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// NETWORK FIRST-strategi: Hämta alltid senaste från nätet, använd cache som reserv
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});