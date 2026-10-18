// Network first: always get the latest files when online, use the cache only when offline.
const CACHE = "renal-calc";

// Saved on the first visit so the app works offline straight away.
// Add any new file the page needs to this list.
const FILES = [
    "./",
    "index.html",
    "style.css",
    "app.js",
    "calculate.js",
    "variables.js",
    "manifest.json",
    "icons/ios-180.png",
    "icons/icon-192.png",
    "icons/icon-512.png"
];

self.addEventListener("install", e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
});

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