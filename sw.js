// A cada nova publicacao do site, aumente a versao (v2, v3...)
// para os visitantes receberem os arquivos atualizados.
const CACHE_NAME = "jedelivery-cache-v2";

// Arquivos que serão salvos na memória do celular do usuário
const urlsToCache = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./Imagens/LOGO.png",
  "./Imagens/NARUTO.jpg"
];

// Instalação: baixa os arquivos para o cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativação: apaga caches de versões antigas
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(nomes =>
      Promise.all(nomes.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Busca: só cuida dos arquivos do próprio site.
// Chamadas para a API Java, ViaCEP, QR Code e CDN vão direto para a rede.
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  // Rede primeiro (pega a versão mais nova); sem internet, usa o cache.
  event.respondWith(
    fetch(req)
      .then(resposta => {
        const copia = resposta.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, copia));
        return resposta;
      })
      .catch(() => caches.match(req))
  );
});
