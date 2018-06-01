# Redux Notes

3rd party app, often used with React (doesn't need to be)
Acts like a giant javascript object - a central store that stores the entire application state.

useful for having a clearly defined process of how your state changes

Actions
    - Dispatched from js code, from within React Component
    - pre-defined information package (possibly with payload)
        - payload = data to be passed to action
    - Ex: add ingredient, or remove ingredient

Reducer(s)
    - Can have multiple, but end up with one main reducer which is connected to the store in the end.
    - checks type of action, and runs some code for that type
    - pure function
        - receives action and old state, spits out updated state
    - SYNCRONOUS FNs ONLY (no async)
    - Updated state gets stored in central store
        - in immutable way

Central store
    - stores entire application state

Subscription
    - Triggers call subscriptions when state changes in the store
    - Component can subscribe to subscriptions