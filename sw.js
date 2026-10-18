// Bump this version whenever you change any file, or users will keep seeing the old cached version.
const CACHE = "renal-calc-v9";
const ASSETS = [
    "./",
    "index.html",
    "style.css",
    "app.js",
    "variables.js",
    "manifest.json",
    "icons/ios-180.png"
];

self.addEventListener("install", e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
    e.waitUntil(caches.keys().then(keys =>
        Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ));
});

self.addEventListener("fetch", e => {
    e.respondWith(caches.match(e.request).then(cached => cached ?? fetch(e.request)));
});