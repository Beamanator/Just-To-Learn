// constants
const STATIC_CACHE_NAME = "site-static-v2";
// cache keys will be request urls, values will be the assets returned
const ASSETS = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/styles.css",
    "/css/materialize.min.css",
    "/img/dish.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2",
];

// install service worker
self.addEventListener("install", (event) => {
    // console.log("service worker has been installed", event);
    // wait until all of the passed-in asynchronous events finish
    // -> BEFORE claiming this 'install' event is complete
    event.waitUntil(
        // opens existing or creates new cache with passed-in name
        caches.open(STATIC_CACHE_NAME).then((cache) => {
            console.log("caching shell assets");
            // 2 ways to add to cache
            // cache.add(); // one resource at a time
            cache.addAll(ASSETS); // array of resources
        })
    );
});

// activate service worker
self.addEventListener("activate", (event) => {
    // console.log("service worker has been activated", event);
    // delete old caches so the service worker only has 1 to choose from
    event.waitUntil(
        // get all cache keys (names of caches)
        caches.keys().then((keys) => {
            // console.log(keys);
            // create array of promises for deleting ALL caches
            // -> NOT equal to statich cache name above
            return Promise.all(
                keys
                    .filter((key) => key !== STATIC_CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        })
    );
});

// fetch event
self.addEventListener("fetch", (event) => {
    // console.log("fetch event", event);
    // choose how to respond to a specific fetch event
    event.respondWith(
        // catch the fetch request, and try to find a matching resource
        // -> in the cached values
        caches.match(event.request).then((cacheResponse) => {
            // if cacheResponse is populated, return it.
            // -> else, return original fetch request
            return cacheResponse || fetch(event.request);
        })
    );
});
