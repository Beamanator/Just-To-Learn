# My Svelte Notes

## Cool / Useful Documentation
- [The Svelte Handbook](./SvelteHandbook.pdf), nice intro to Svelte by Flavio Copes

## Getting Started
- Prerequisites: Node, Git
- `npx degit sveltejs/template <YOUR_APP_NAME>` -> download and run "degit", which downloads latest Svelte project template from `https://github.com/sveltejs/template`.
- `npm run dev` serves your code on localhost

## Events
- `click`: `on:click={function}`

## Interesting differences
- Svelte recognizes variable changes with assignments ONLY
    - Ex: `list.push(4)` won't notify Svelte that the array `list` got updated. `list.push(4); list = list;` will notify Svelte.
    - Easy replacement is `list = [...list, 4]`.

## Reactivity
- `$:` or `$:{ ...your code }` with a variable name after can run something to react to variable changes
    - Ex: `$: console.log('updated count: ' + count)`