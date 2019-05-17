# PWA Notes & Tips

## Service Workers

1. Not coupled with HTML / CSS
1. Don't have access to the DOM
1. Run on separate thread as html / css / main js
1. Listens to events like fetch requests, push messages, etc.
1. Created in root directory for global scope of project

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
    - Doesn't become `active` until all instances of the app are closed (tabs in browser, apps on mobiles, maybe also another refresh)
        - this is b/c it takes a little bit of time for the service worker to be installed, so it waits until it's fully installed, then another refresh before becoming active
1. Service worker becomes active
    - `active` event
1. Service worker 'listens' for events

## Running computer localhost on mobile phone

1. On computer, open `cmd`, run `ipconfig`
1. Find `IPv4 Address` (192.....)
1. Turn off firewall on computer
1. Open 192...... on mobile phone

Boom! Success? Hopefully?
