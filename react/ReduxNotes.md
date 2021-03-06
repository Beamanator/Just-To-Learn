# Redux Notes

3rd party app, often used with React (doesn't need to be)
Acts like a giant javascript object - a central store that stores the entire application state.

useful for having a clearly defined process of how your state changes

## Main building blocks of redux
1. Actions
    - Dispatched from js code, from within React Component
        - handled within reducer
    - pre-defined information package 
    - MUST have `type` property
        - convention is to put the type in all uppercase
        - example: `{type: 'INC_COUNTER'}`
    - can add a payload
        - payload = data to be passed to action
        - Note: can be any property name on the object, as you like
    - Ex: add ingredient, or remove ingredient
2. Action Creators
    - Help with async code, but *can* be used for async OR sync code.
    - Helps clean up file calling dispatches a bit - not much
2. Reducer(s)
    - Can have multiple, but end up with one main reducer which is connected to the store in the end.
    - checks `type` of action, and runs some code for that type
    - pure function
        - receives action and old state, spits out updated state
    - **SYNCRONOUS FNs ONLY (no async calls)**
    - Updated state gets stored in central store
        - **MAKE SURE YOU UPDATE STATE IN AN IMMUTABLE WAY**
    - return updated state
3. Central store
    - stores entire application state
4. Subscription
    - Triggers call subscriptions when state changes in the store
    - Component can subscribe to subscriptions
5. Middleware
    - `import { applyMiddleware } from 'redux'`
    - sits between actions and reducers
    - run some code without actually stopping the reducer from running. Examples:
        - Logging something to console
        - async code
    - set up in `index.js`
        - Function (param `store`) returns function (param `next` - like in `express.js`) which returns a function (param `action`).
        - Inner function expects a call to `next(action)`, and the result of this to be returned.
    - special middleware for adding async code in redux
        - [redux-thunk](https://github.com/reduxjs/redux-thunk)
        - this middleware blocks initial sync action, then dispatches a new action in the future, which runs sync

## Where to put data-transforming logic?
1. Action Creators
    - Can run async code
    - Shouldn't prepare the state update too much
    - **Note**: can access old code w/ 2nd param. Params are `dispatch` then `getState` which can be called to get the old / current state.
        - the old state data can also be sent to the action creator via the Component dispatching the action which leads to the creator.
2. Reducer
    - Pure, sync code only
    - Core redux concept: reducers update the state
In the end, this is up to you as a developer. but always stay consistent. Max prefers reducers since they are used to update the state. Again, getting data from a server may require a bit of tweaking, but he prefers putting the main data transormation in the reducer(s).

## React-Redux package
Helps us inject the redux store into the react apps
Setup
1. `import { Provider } from 'react-redux'` - in `index.js`
2. Wrap `<App />` component with `Provider` component
3. `import { connect } ...` anywhere you need access to redux store
    - hoc (ish) used on the Component export
    - `connect(config)(ComponentToWrap);`
    - config:
        - which part of application state is interesting to us
            - often use var like `mapStateToProps` function in `redux-sample-proj/Counter.js`
            - maps state to props (no longer using `state` in container components)
        - which actions do i want to dispatch
            - create object that holds props which are references to dispatch functions
    - **Note**: sometimes this may break your router, especially if you wrap `App.js` with `connect`. To fix this, use `react-router-dom`'s `withRouter` and wrap the entire `connect` function.

## Comments about updating state in an Immutable way
There is a great explanation on patterns for Objects and Arrays in Section 14, Lecture 251. He shows what *not* to do and what **TO** do for objects, arrays, nested objects, removing elements from arrays, etc. He also links to some librarys that can be used with Redux for immutable updating, like:
- [dot-prop-immutable](https://github.com/debitoor/dot-prop-immutable)
- [immutability-helper](https://github.com/kolodny/immutability-helper)

## Viewing redux store in chrome dev tools
Using extension Redux DevTools, you can view your redux store in Chrome's developer tools WHILE developing! Here you can see actions, state, you can fast forward or go to a previous state / action.
**Note**: It's probably best to hide this while in production, so make sure you look at the burger builder's index.js file's use of environment variables (while using create-react-app) to hide the redux store in production.

## Which types of state should be used with Redux
| Type | Example | Use Redux? |
|:----:|:-------:|:----------:|
|Local UI State|Show / Hide Backdrop|*Usually* no - handled within components|
|Persistent State|All Users, all posts, etc (usually from server side db)|*Usually* yes - but only relevant slice of data. All data is stored on server|
|Client State|Is Authenticated? Filters set by User...|**Yes**, definitely managed by Redux (may affect multiple components / areas of application)|

## Other comments
Some people use an alternate folder structure for the store (actions & reducers) for bigger projects. Often you have one action & one reducer for a specific container, so you can create a subfolder (`store`) inside each container. Up to you, anything should work. There are lots of opinions out there.

## Additional links (from Section 14, Lecture 257 & Section 16, Lecture 283)
- [Redux Docs](http://redux.js.org/)
- [Core Concepts](http://redux.js.org/docs/introduction/CoreConcepts.html)
- [Actions](http://redux.js.org/docs/basics/Actions.html)
- [Reducers](http://redux.js.org/docs/basics/Reducers.html)
- [Redux FAQs](http://redux.js.org/docs/FAQ.html)
- [Middleware](https://redux.js.org/advanced/middleware)
- [Async Actions](https://redux.js.org/advanced/async-actions)
- Redux Thunk (link above & in `README.md`)