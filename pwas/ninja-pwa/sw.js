// constants
const STATIC_CACHE_NAME = "site-static";
// keys will be request urls, values will be the assets returned
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
});

// fetch event
self.addEventListener("fetch", (event) => {
    // console.log("fetch event", event);
});
