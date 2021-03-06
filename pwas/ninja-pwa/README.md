# PWA Notes & Tips

## Service Workers

1. Not coupled with HTML / CSS
1. Don't have access to the DOM
1. Run on separate thread as html / css / main js
1. Listens to events like fetch requests, push messages, etc.
1. Created in root directory for global scope of project

Note: useful tip for checking if specific browser(s) support a specific feature: https://caniuse.com/#feat=serviceworkers

Note 2: service workers only work over https connections or localhost connections because they're very powerful, so they need to be secure!

### Service Worker Lifecycles

Initial service worker setup

1. Register with the browser via main `.js` file
    - `install` event fired with service worker
1. Service worker becomes active
    - `active` event fired
1. Service worker 'listens' for events

On page reload

1. Service worker has already been registered
    - Not re-installed unless service worker code has changed since last install
1. If file changed...
    - `install` event fired
    - Placed "in waiting"
    - ![service worker waiting](/img/readmeImgs/serviceWorkerWaiting.jpg)
    - Doesn't become `active` until all instances of the app are closed (tabs in browser, apps on mobiles)
        - This is b/c it takes a little bit of time for the service worker to be installed, so it waits until it's fully installed, then another refresh before becoming active
        - Or you can use:
            - Hard refresh (ctrl + shift + r)
            - Click "skipWaiting" in developer tools
            - Click "Update on reload" in developer tools
1. Service worker becomes active
    - `active` event
1. Service worker 'listens' for events

## Running computer localhost on mobile phone

1. On computer, open `cmd`, run `ipconfig`
1. Find `IPv4 Address` (192.....)
1. Turn off firewall on computer
1. Open 192...... on mobile phone

Boom! Success? Hopefully?

## Other

### Lighthouse Audit - Auditing validity of the PWA

1. Open chrome developer tools
1. Go to "Audits" tab
1. Make sure "Progressive Web App" is checked
1. Click "Run audits"

### Other guides used during tutorial

-   Guide for adding "install app" banner on mobile
    -   https://developers.google.com/web/fundamentals/app-install-banners/
-   Guide for setting up USB debugging (needed for "install app" on local device)
    -   https://developer.android.com/studio/debug/dev-options

## Cache Notes

Types:

-   Browser cache
    -   Cannot be controlled by us, it handles itself
-   Other cache
    -   Gives us control over what is stored so we can retrieve stuff offline

Static vs Dynamic:

-   It's a good idea to do static caching for application "shell" - the main pages / resources that the user will almost _always_ visit, but **NOT ALL PAGES**
-   Dynamically cache side pages & resources that aren't necessarily going to be visited.