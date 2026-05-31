const CACHE_NAME = 'toncoachjardin-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/hero.jpg',
  '/avant.png',
  '/apres.png',
  '/thomas.png',
  '/pelouse-parfaite',
  '/lignes-tonte',
  '/gazon-jaunit',
  '/enlever-mousse-pelouse',
  '/semer-pelouse-nord',
  '/engrais-pelouse'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match('/'));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
