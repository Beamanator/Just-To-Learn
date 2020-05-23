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

### Notes

Functions

-   Specify "type" a paramter must be:
    -   `const circ = (diameter: number) => {`
-   `Function` type is capital F!

Objects & arrays

-   Cannot change data type of properties, objects cannot add additional keys
-   Arrays set type like:
    -   `let myArray: string[] = [];`

`any` type can be used to make variables allow any data type

Type `aliases` can let you reuse custom type logic multiple times

### Typescript compiling config (tsconfig)

Create the file

-   `tsc --init`

Some useful config options

-   `rootDir` & `outDir` can configure where the ts files & output js files go
-   add `"include": ["src"]` at the very end to only look to compile `ts` files from the `src` directory

Useful commands

-   Now just run `tsc -w` to watch and compile all `ts` files in the `rootDir`
