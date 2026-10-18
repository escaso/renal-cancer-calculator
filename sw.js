// Bump this version whenever you change any file, or users will keep seeing the old cached version.
const CACHE = "renal-calc-v2";
const ASSETS = [
    "/renal-cancer-calculator/",
    "/renal-cancer-calculator/index.html",
    "/renal-cancer-calculator/style.css",
    "/renal-cancer-calculator/app.js",
    "/renal-cancer-calculator/variables.js",
    "/renal-cancer-calculator/manifest.json"
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