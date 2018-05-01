### Sending http requests
1) native javascript object `XMLHttpRequest`
    - quite cumbersome
1) 3rd-party library [`axios`](https://github.com/axios/axios)
    - not connected to any library like React or Angular

### Gotchas
1. If you're sending http requests in `componentDidUpdate()`, make sure you don't cause infinite loops! If you call `this.setState(...)` it's possible to cause infinite network requests in the background, so set some state checks!