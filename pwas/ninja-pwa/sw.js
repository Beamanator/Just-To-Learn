// install service worker
self.addEventListener("install", (event) => {
    console.log("service worker has been installed", event);
});

// activate service worker
self.addEventListener("activate", (event) => {
    console.log("service worker has been activated", event);
});
