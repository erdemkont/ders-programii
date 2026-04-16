self.addEventListener("install", e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open("ders-programii-v3").then(cache => {
            return cache.addAll([
                "./",
                "./index.html",
                "./manifest.json",
                "./icon.png"
            ]);
        })
    );
});

self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== "ders-programii-v3")
                    .map(key => caches.delete(key))
            );
        })
    );
});

self.clients.claim();

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request);
        })
    );
});
