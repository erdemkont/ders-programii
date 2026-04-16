self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("ders-programii-v2").then(cache => {
            return cache.addAll([
                "/ders-programii/index.html",
                "/ders-programii/manifest.json",
                "/ders-programii/icon.png"
            ]);
        })
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
