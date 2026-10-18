// Network first: always get the latest files when online, use the cache only when offline.
const CACHE = "renal-calc";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
    // remove caches left by older versions of this file
    e.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", e => {
    if (e.request.method !== "GET") return;
    e.respondWith(
        fetch(e.request, { cache: "no-cache" }) // always check the server for a newer version
            .then(response => {
                const copy = response.clone();
                caches.open(CACHE).then(c => c.put(e.request, copy));
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});