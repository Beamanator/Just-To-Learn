import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// request param is request configuration
axios.interceptors.request.use(request => {
    console.log(request);
    // Edit request config if desired
    // Note: common to add authorization header here

    // return request config
    return request;
}, error => {
    // remember this is request fails, not response fails
    console.log(error);

    // still forward errors to individual .catch error methods
    //  in case you want to handle errors in UI in local files
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log(response);
    // Edit response config if desired

    // return response config
    return response;
}, error => {
    console.log(error);

    // still forward errors to individual .catch error methods
    //  in case you want to handle errors in UI in local files
    return Promise.reject(error);
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
