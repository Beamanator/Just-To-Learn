### Sending http requests
1) native javascript object `XMLHttpRequest`
    - quite cumbersome
1) 3rd-party library [`axios`](https://github.com/axios/axios)
    - not connected to any library like React or Angular

### Gotchas
1. If you're sending http requests in `componentDidUpdate()`, make sure you don't cause infinite loops! If you call `this.setState(...)` it's possible to cause infinite network requests in the background, so set some state checks!

### Axios [Interceptors](https://github.com/axios/axios#interceptors)
Useful for calling some code before any http request from anywhere in your app
Can set globally in highest js file (`index.js`) because all axios imports use same configuration, so they'll all use this global function
- `axios.interceptors.request...` or `axios.interceptors.response...`
    - to register a new interceptor, call `use(...)` next
        - params:
        - function (success): `(request / response => { ... })`
            - **Note**: Must `return request / response` in order for the request / response to push through. You MAY edit this in the function (like adding an authorization header)
        - function (error): `(error => { ... })`
            - **Note**: Must `return Promise.reject(error)` in order for the error to push through to the local `.catch` methods - in case we want to change the UI in different components for some specific errors.

### Axios Instances
- Used to set configs for pieces of your app - not global, but stored in a new file that can be imported elsewhere in your app