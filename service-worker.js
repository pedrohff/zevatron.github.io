var cacheName = 'servJudTREPB';
var filesToCache = [
  '/',
  '/index.html',
  '/sobre.html',
  '/css/bootstrap-theme.min.css',
  '/css/main.css',
  '/css/bootstrap.min.css',
  '/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js',
  '/js/vendor/jquery-1.11.0.min.js',
  '/js/fastclick/lib/fastclick.js',
  '/js/vendor/bootstrap.min.js',
  '/js/main.js',
  '/img/logo.png',
  '/img/tre-pb.png'
];


self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();

});
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
