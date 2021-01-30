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
