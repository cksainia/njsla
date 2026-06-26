// Offline cache for the single-file NJSLA web app.
const CACHE = 'njsla-web-v1';
const ASSETS = ['./', './index.html', './data.js', './manifest.webmanifest', './icon.svg'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (url.hostname.includes('anthropic.com') || url.hostname.includes('openai.com') || url.hostname.includes('googleapis.com')) return;
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request).catch(() => c)));
});
