var filesToCache = ["index.html"]

var staticCacheName = "tetris-v1"

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
