const staticDevCoffee = "dev-coffee-site-v1";
/*const assets = [
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
];*/

this.addEventListener('activate', function (event) {
    event.waitUntil(
        // Delete old cache
        caches.keys().then(function (keyList) {
            return Promise.all(
                keyList.filter(function (key) {
                    return key != staticDevCoffee;
                }).map(function (key) {
                    return caches.delete(key);
                }));
        })
    );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request).then(resp => {
      	caches.open(staticDevCoffee).then(cache => {
           cache.put(fetchEvent.request, resp);
        });
	 return resp;
      });
    }).catch(err => {
	 //No cache no network 503 service unaivalable..
            var myBlob = new Blob();
            var init = { "status" : 503 , "statusText" : "Service Unaivailable!" };
            var myResponse = new Response(myBlob,init);
            return myResponse
    })
  );
});
