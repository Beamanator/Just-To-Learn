## Typescript

"Superset" of JavaScript (all JavaScript + some extra features)

-   needs to be compiled into vanilla JS
-   extra things like generics, tuples, interfaces, etc

Supports modern JavaScript which aren't automatically supported in a browser

-   similar to Babel

### Tutorials

-   Net Ninja: https://www.youtube.com/watch?v=2pZmKW9-I_k&list=PL4cUxeGkcC9gUgr39Q_yD6v-bSyMwKPUI

### Using Typescript compiler

Install:

-   `npm install -g typescript`

Run:

-   `tsc myFile.ts myFile.js`
    -   Converts typescript file `myFile.ts` into javascript file `myFile.js` **ONCE**
-   If both files have same name, remove the `.js` part.
    -   Ex: `tsc myFile.ts` converts data to `myFile.js`!
-   `tsc myFile.ts -w` Have typescript _watch_ a file and continually convert to javascript:
