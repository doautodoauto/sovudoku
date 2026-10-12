// Совудоку — service worker. Версию C меняйте при каждом обновлении игры.
const C='sovudoku-v5';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./assets/img/menu.webp", "./assets/img/t_cat.webp", "./assets/img/t_emerald.webp", "./assets/img/t_ghost.webp", "./assets/img/t_goldowl.webp", "./assets/img/t_hallows.webp", "./assets/img/t_hat.webp", "./assets/img/t_owl.webp", "./assets/img/t_phoenix.webp", "./assets/img/t_snitch.webp", "./assets/img/t_sock.webp", "./assets/img/t_stag.webp", "./assets/img/y1.webp", "./assets/img/y2.webp", "./assets/img/y3.webp", "./assets/img/y4.webp", "./assets/img/y5.webp", "./assets/img/y6.webp", "./assets/img/y7.webp", "./assets/fonts/f-63bbd029.woff2", "./assets/fonts/f-9b8a16c9.woff2", "./assets/fonts/f-e1df0419.woff2", "./assets/fonts/f-c47ff128.woff2", "./assets/fonts/f-5240ce42.woff2", "./assets/fonts/f-977abcc0.woff2", "./assets/fonts/f-0300985b.woff2", "./assets/fonts/f-dd45c742.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(FILES.map(u=>c.add(u).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith(self.location.origin))return;
 const asset=/\/assets\/|\.png$/.test(new URL(r.url).pathname);
 e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{
  if(hit&&asset)return hit; // картинки и шрифты не меняются — берём из кэша без сети
  const net=fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>hit);
  return hit||net}))});
