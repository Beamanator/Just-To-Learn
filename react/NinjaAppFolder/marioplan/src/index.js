import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import thunk  from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({
            getFirebase, getFirestore
        })),
        reduxFirestore(fbConfig),
        reactReduxFirebase(fbConfig, {
            // allow us to access a propery on store
            // -> called firebaseAuthIsReady
            attachAuthIsReady: true,
            // I want want firestore to use firebase to sync
            // -> to the profile object on the firebase state object
            useFirestoreForProfile: true,
            // By default, firebase doesn't know which collection
            // -> to look in for profile data. We have to tell the enhancer
            // -> which collection to use ('users' for this project)
            userProfile: 'users',
        })
    )
);

// wait until firebase auth is ready, then render to the dom
store.firebaseAuthIsReady.then(() => {
    ReactDOM.render(
        <Provider store={store}><App /></Provider>,
        document.getElementById('root')
    );
    
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
})

