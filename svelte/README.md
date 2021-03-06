# My Svelte Notes

## Stopped at...

-   Finished! Stopped adding notes after p20 b/c I thought the examples spoke for themselves & some things (async stuff, if / each / events) were self-explanatory, just need practice

## Cool / Useful Documentation

-   [The Svelte Handbook](./SvelteHandbook.pdf), nice intro to Svelte by Flavio Copes

## Getting Started

-   Prerequisites: Node, Git
-   `npx degit sveltejs/template <YOUR_APP_NAME>` -> download and run "degit", which downloads latest Svelte project template from `https://github.com/sveltejs/template`.
-   `npm run dev` serves your code on localhost

## Events

-   `click`: `on:click={function}`

## Interesting differences

-   Svelte recognizes variable changes with assignments ONLY
    -   Ex: `list.push(4)` won't notify Svelte that the array `list` got updated. `list.push(4); list = list;` will notify Svelte.
    -   Easy replacement is `list = [...list, 4]`.
-   Exporting variables
    -   If exporting variables / functions, use `export varName` **AND ALSO** make sure the surrounding `<script>` tag has attribute `context="module"` like this:
        -   `<script context="module">`
    -   _Normal `script` tags **SHOULD NOT** have `context="module"` attribute_
    -   Note: exported functions in this type of tag may not be able to affect local state

## Reactivity

-   `$:` or `$:{ ...your code }` with a variable name after can run something to react to variable changes
    -   Ex: `$: console.log('updated count: ' + count)`
