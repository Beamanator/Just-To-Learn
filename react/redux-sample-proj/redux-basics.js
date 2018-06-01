// node.js syntax, just to show that it can be used standalone
const redux = require('redux');
const createStore = redux.createStore; // function

const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
    // return updated state
    return state;
};

// Store
const store = createStore(rootReducer);

console.log(store.getState());

// Dispatching Action

// Subscription