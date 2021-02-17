const APP_PREFIX = 'FoodFest-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_TO_CACHE = [
  './index.html',
  './events.html',
  './tickets.html',
  './schedule.html',
  './assets/css/style.css',
  './assets/css/bootstrap.css',
  './assets/css/tickets.css',
  './dist/app.bundle.js',
  './dist/events.bundle.js',
  './dist/tickets.bundle.js',
  './dist/schedule.bundle.js',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log(`Installing cache: ${CACHE_NAME}`);
      return cache.addAll(FILES_TO_CACHE);
    })
  )
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      let cacheKeeplist = keyList.filter(key => key.indexOf(APP_PREFIX));
    })
  );
  cacheKeeplist.push(CACHE_NAME);

  return Promise.all(keyList.map((key, i) => {
    if (cacheKeeplist.indexOf(key) === -1) {
      console.log(`Deleting cache: ${keyList[i]}`);
      return caches.delete(keyList[i]);
    }
  }));
});

self.addEventListener('fetch', e => {
  console.log(`Fetch request: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then(req => {
      if (req) {
        console.log(`Responding with cache: ${e.request.url}`);
        return req;
      } else {
        console.log(`File is not cached, fetching : ${e.request.url}`)
        return fetch(e.request);
      }
    })
  );
});
