self.addEventListener("install", e => {
    e.waitUntil(
        caches.open("ders-programii").then(cache => {
            return cache.addAll([
                "/ders-programii/index.html"
                "manifest.json",
                "icon.png"
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