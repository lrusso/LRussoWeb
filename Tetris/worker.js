const filesToCache = [
	"https://www.lrusso.com/Tetris/index.html",
	"https://www.lrusso.com/Tetris/Tetris.json",
	"https://www.lrusso.com/Tetris/TetrisFavIcon_192x192.png",
	"https://www.lrusso.com/Tetris/TetrisFavIcon_512x512.png"
];

const staticCacheName = "tetris-v1";

self.addEventListener("install", event => {
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

self.addEventListener("fetch", event => {
	event.respondWith(
		caches.match(event.request)
		.then(response => {
			if (response) {
				return response;
			}
			return fetch(event.request)
		}).catch(error => {
		})
	);
});