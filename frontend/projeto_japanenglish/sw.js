const CACHE_NAME = "jedelivery-cache-v1";

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

// Evento de Instalação (Baixa os arquivos do cache)
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Arquivos em cache adicionados com sucesso.");
      return cache.addAll(urlsToCache);
    })
  );
});

// Evento Fetch (Responde rápido buscando no cache primeiro)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Retorna o arquivo do cache se existir, caso contrário busca na rede
      return response || fetch(event.request);
    })
  );
});