// prettier-ignore
var filesToCache = [
  "index.html",
  "manifest.json",
  "TaipeiFavIcon_192x192.png",
  "TaipeiFavIcon_512x512.png",
  "worker.js"
]

var staticCacheName = "taipei-v1"

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        if (response) {
          return response
        }
        return fetch(event.request)
      })
      .catch(function () {})
  )
})
