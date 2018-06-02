# Redux Notes

3rd party app, often used with React (doesn't need to be)
Acts like a giant javascript object - a central store that stores the entire application state.

useful for having a clearly defined process of how your state changes

## Main building blocks of redux
1. Actions
    - Dispatched from js code, from within React Component
    - pre-defined information package 
    - MUST have `type` property
        - convention is to put the type in all uppercase
        - example: `{type: 'INC_COUNTER'}`
    - can add a payload
        - payload = data to be passed to action
        - Note: can be any property name on the object, as you like
    - Ex: add ingredient, or remove ingredient
2. Reducer(s)
    - Can have multiple, but end up with one main reducer which is connected to the store in the end.
    - checks `type` of action, and runs some code for that type
    - pure function
        - receives action and old state, spits out updated state
    - SYNCRONOUS FNs ONLY (no async)
    - Updated state gets stored in central store
        - **MAKE SURE YOU UPDATE STATE IN AN IMMUTABLE WAY**
3. Central store
    - stores entire application state
4. Subscription
    - Triggers call subscriptions when state changes in the store
    - Component can subscribe to subscriptions

## React-Redux package
Helps us inject the redux store into the react apps
Setup
1. `import { Provider } from 'react-redux'`
2. Wrap `<App />` component with `Provider` component
3. `import { connect } ...`
    - hoc (ish) used on the Component export
    - `connect(config)(ComponentToWrap);`
    - config:
        - which part of application state is interesting to us
            - often use var like `mapStateToProps` function in `redux-sample-proj/Counter.js`
            - maps state to props (no longer using `state` in container components)
        - which actions do i want to dispatch
            - create object that holds props which are references to dispatch functions

## Comments about updating state in an Immutable way
There is a great explanation on patterns for Objects and Arrays in Section 14, Lecture 251. He shows what *not* to do and what **TO** do for objects, arrays, nested objects, removing elements from arrays, etc. He also links to some librarys that can be used with Redux for immutable updating, like:
- [dot-prop-immutable](https://github.com/debitoor/dot-prop-immutable)
- [immutability-helper](https://github.com/kolodny/immutability-helper)

## Which types of state should be used with Redux
| Type | Example | Use Redux? |
|:----:|:-------:|:----------:|
|Local UI State|Show / Hide Backdrop|*Usually* no - handled within components|
|Persistent State|All Users, all posts, etc (usually from server side db)|*Usually* yes - but only relevant slice of data. All data is stored on server|
|Client State|Is Authenticated? Filters set by User...|**Yes**, definitely managed by Redux (may affect multiple components / areas of application)|

## Additional links (from Section 14, Lecture 257)
- [Redux Docs](http://redux.js.org/)
- [Core Concepts](http://redux.js.org/docs/introduction/CoreConcepts.html)
- [Actions](http://redux.js.org/docs/basics/Actions.html)
- [Reducers](http://redux.js.org/docs/basics/Reducers.html)
- [Redux FAQs](http://redux.js.org/docs/FAQ.html)