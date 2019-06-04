// constants
const STATIC_CACHE_NAME = "site-static-v2";
const DYNAMIC_CACHE_NAME = "dynamic-cache-v1";
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
            // addAll goes out to server to get resources and put in cache
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
        // Try to find a matching resource in ALL caches
        caches.match(event.request).then((cacheResponse) => {
            // if cacheResponse is populated, return it.
            // -> else, return original fetch request
            return (
                cacheResponse ||
                fetch(event.request).then((fetchResponse) => {
                    return caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                        // put local variable in cache, not reaching to server here
                        // Note: can't pass fetchResponse into cache directly b/c
                        // -> we wouldn't be able to return it back to user as well.
                        // -> Therefore, make a copy (clone)!
                        cache.put(event.request.url, fetchResponse.clone());

                        // return fetched response back to application
                        return fetchResponse;
                    });
                })
            );
        })
    );
});
