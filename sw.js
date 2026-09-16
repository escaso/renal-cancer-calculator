const CACHE = "renal-calc-v1";
const ASSETS = [
    "/renal-cancer-calculator", 
    "/renal-cancer-calculator/index.html", 
    "/renal-cancer-calculator/style.css", 
    "/renal-cancer-calculator/app.js", 
    "/renal-cancer-calculator/variables.js", 
    "/renal-cancer-calculator/manifest.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached ?? fetch(e.request))
  );
});