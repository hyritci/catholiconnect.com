 
const CACHE_NAME = "catholiconnect-cache-v1";
 
const ASSETS_TO_CACHE = [
  "/index.html",
  "/css/style.css",
  "/css/home.css",
  "/js/home.js",
  "/assets/CatholiConnectHome.png",
  "/assets/CatholiConnect.png",
  "/manifest.json"
];
 
// Installation : on met en cache les fichiers essentiels
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});
 
// Activation : on supprime les anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});
 
// Interception des requêtes : cache d'abord, sinon réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
 