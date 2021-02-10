# Vue 3

## Directives

event listeners

`v-on:` can be replaced with `@`

attribute binding

`v-bind:` can be replaced with just `:`

two-way data binding (forms)

`v-model:`

## Vue Lifecycle hooks

https://v3.vuejs.org/guide/instance.html#lifecycle-diagram

`beforeCreate`

-   fires before component is fully created, at very start of its initialization
-   can't access data or template elements

`afterCreate`

-   after created, not yet mounted to dom
-   can access data, can't access template

`beforeMount`

-   just before mounted to dom
-   can access data, events, templates

`mounted`

-   right after mounted to dom
-   popular places to make fetch requests, can do it elsewhere

`beforeUpdate`

-   after some data changed, but before updates are rendered in DOM

`updated`

-   once data is updated and rendered in the dom

`beforeUnmount`

-   self explanatory

`unmounted`

-   self explanatory

## Vue Router

`vue create project-name`

-   Make sure "Router" is selected (after "Manually select features")
-   "Modes" for router
    -   History vs Hash
-   Check out "jobs" project for more
-   new styles on active link!

`$route` = info about current route

`$router` = to move around in the route

-   `go` (+/- 1), `push`

lazy loading: https://next.router.vuejs.org/guide/advanced/lazy-loading.html#grouping-components-in-the-same-chunk

## cool resources / tools

`npx json-server --watch data/db.json`

## options API vs Composition API

options api

-   data(), methods, computed, lifecycle hooks
-   drawbacks
    -   hard to group feature-logic together
        -   data, computed, and lifecycle hook (example)
        -   much harder to read / update with larger projects
-   limitations

composition API

-   setup()
    -   data(), methods, computed, lifecycle hooks
-   benefits
    -   group feature-logic together
    -   create reusable logic / code in composition functions (composables)
        -   similar to React hooks

Note: can use options api for some and composition api for other logic, in the same project :D

## composition api basics

`ref` vs `reactive` when creating reactive variables

-   `ref` we have to use `.value` to update the value
    -   CAN use primitive values
    -   better when we work with other vue components
-   `reactive` you don't need `.value`! just update!
    -   cannot use primitive values inside `reactive` (since objects are references, primitives aren't)
    -   not as easy when working with other vue components

lifecycle hooks

-   all same name as before, but with `on` in front
    -   ex: `onMounted`
    -   have to be imported from vue to be used inside `setup` method
