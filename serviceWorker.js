const staticDevCoffee = "dev-coffee-site-v1";
const assets = [
  "/pwa-with-vanilla-js",
  "/pwa-with-vanilla-js/index.html",
  "/pwa-with-vanilla-js/css/style.css",
  "/pwa-with-vanilla-js/js/app.js",
  "/pwa-with-vanilla-js/images/coffee1.jpg",
  "/pwa-with-vanilla-js/images/coffee2.jpg",
  "/pwa-with-vanilla-js/images/coffee3.jpg",
  "/pwa-with-vanilla-js/images/coffee4.jpg",
  "/pwa-with-vanilla-js/images/coffee5.jpg",
  "/pwa-with-vanilla-js/images/coffee6.jpg",
  "/pwa-with-vanilla-js/images/coffee7.jpg",
  "/pwa-with-vanilla-js/images/coffee8.jpg",
  "/pwa-with-vanilla-js/images/coffee9.jpg"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
