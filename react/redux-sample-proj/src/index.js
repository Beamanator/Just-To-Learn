import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';

import './index.css';

// tell Redux we have two feature areas, use each reducer for each
// and merge into 1 store, 1 state, 1 reducer
const rootReducer = combineReducers({
    ctr: counterReducer,
    res: resultReducer
});

// custom middlware
const logger = (store) => {
    // next param is similar to that in express code
    return (next) => {
        return (action) => {
            console.log('[Middleware] Dispatching', action);
            // calling next lets the action continue to the reducer
            const result = next(action);

            console.log('[Middleware] next state', store.getState());

            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(logger, thunk)
));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
