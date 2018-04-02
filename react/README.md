# React

### Creating an app
1) create-react-app <name-of-new-project>

### Running an app
1) 'cd' into project directory, then run 'npm start'
   - This will spin up local server, and open a new tab with the app running

### Restrictions of JSX
1) 'className' instead of 'class' in html
2) JSX element could only return 1 root element (until recently - version 16)
   - traditionally, it's common to just wrap everything in 1 root element
3) Custom components should start with upper-case ('Div') to differentiate between custom components and reserved html elements
4) Can't use `if() {}` statements in JSX, instead use ternary operators `<condition> ? <if true> : <if false>`
   - Or (recommended), just use `if-statements` before the `render` method.

### Conventions
1) New components go in folders with capital starting characters
2) Use ES6 for custom components
   - const (instead of var / let)
   - Arrow functions - passes 'this' keyword from caller - keeps 'this' consistent in Component classes
     - Useful in a button click event handler
3) Properties passed to your component should be called 'props' to make sure people don't get confused
4) Update state in an immutable fashion (a.k.a. create a new copy of state, then edit, then save back to state)
   - Array example: using `.slice` to directly remove an item from an array
     - instead, first create a new array like this: `[...oldArr]` or `oldArr.slice()`
   - Object example: updating any property in the state
     - instead, first create a new object like this: `{...oldObj}` or `Object.assign({}, oldObj)`

### Other
1) Dynamic content (functions, variables, etc) in JSX goes between {}
2) props.children - refers to anything between open & closing tag of custom element / component (ex: <Person>children!</Person>)
3) state (reserved word)
   - Only available in components extending Component class
   - Try to only manipulate state in 'container' Components, which are high-level components. The smaller amount of files that change the state, the better
4) to pass data to event handler, use either of these methods:
   - this.<function-name>.bind(this, data)
     - recommended version
   - () => this.<function-name>(data)
     - THIS MAY NOT WORK ALWAYS (maybe only when scaled to large apps)