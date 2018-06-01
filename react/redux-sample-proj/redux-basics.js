// node.js syntax, just to show that it can be used standalone
const redux = require('redux');
const createStore = redux.createStore; // function

const initialState = {
    counter: 0
};

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        // create new object with old state values!
        // NOTE: Need to use transpiler like Babel to get ... to work
        //       in node (see this Stack Overflow question: https://stackoverflow.com/questions/36666433/node-5-10-spread-operator-not-working)
        // return {
        //     ...state,
        //     counter: state.counter + 1
        // }
        // INSTEAD: use Object.assign() which is effectively the same
        return Object.assign({}, state, {
            counter: state.counter + 1
        });
    }

    if (action.type === 'ADD_COUNTER') {
        // create new object with old state values!
        // Note: can't use ... without babel (see above)
        return Object.assign({}, state, {
            counter: state.counter + action.value
        });
    }

    // return updated state
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
})

// Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
