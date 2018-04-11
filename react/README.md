# React

### Creating an app
1) create-react-app <name-of-new-project>

### Running an app
1) 'cd' into project directory, then run 'npm start'
    - This will spin up local server, and open a new tab with the app running
    - **Note:** Sometimes this takes a bit, so just wait (up to 45 seconds) 

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

### Stateful vs Stateless components
- Create as many **Stateless** components as possible (compared to **Stateful** components)
- <u>Stateless</u> (a.k.a. functional*) = just a function (`const myComp = (props) => {...}`)
    - Therefore, they can't manage `state`
    - Stateless Components should be as clear and narrowly focused as possible (clear responsibility)
    - Can not access lifecycle hooks
- <u>Stateful</u> (a.k.a. *container*) = defined with `class MyComp extends Component {...}` - can manage the application's `state`
    - Ex: `App.js`
    - Make Stateful components as lean as possible so they don't get confusing
    - Can implement lifecycle hooks
    - props come from `this.props...` here

### Component Lifecycles (only available in Stateful components)
- During *Creation*:
    - `constructor(props)`
        - Default ES6 class
        - Creates component & passes any props to constructer
        - Must / should call `super(props)`
            - React should show a warning if you don't include this
        - Good place to initialize state (was necessary in old project setups, but now / with current setup, not necessary)
        - NEVER cause side-effects here
            - Ex: reaching out to web server - bad b/c may lead to re-rendering of application / state becoming unpredictable
    - `componentWillMount()`
        - Directly come React
        - Update state or last minute optimizations, but is commonly not used
    - `render()`
        - Gives React an idea of how the DOM will look later once it gets edited
        - Defines what JSX will get rendered for this component
    - Render Child Components
        - Executing process above for all child components (& maybe siblings)
    - `componentDidMount()`
        - Tells us if this component was successfully mounted
        - Here we can cause side-effects (reach out to web for data)
        - Don't update state here (triggers re-render)
- During *Update* (triggered by Parent - by changing props):
    - `componentWillReceiveProps(nextProps)`
        - Here we can synchronize state with props (or later)
        - DON'T cause side-effects (web data fetching stuff)
    - `shouldComponentUpdate(nextProps, nextState)`
        - props and state which triggered this update
        - may cancel updating process!
        - `return true` - update continues
        - `return false` - updating stops (saves performance - no `render()` but CAN be bad if used in the wrong way)
        - Don't cause side-effects
    - `componentWillUpdate(nextProps, nextState)`
        - Again may sync state to props
        - Don't cause side-effects
    - `render()`
        - Renders JSX with result of updated component
    - Update Child Component Props
        - May trigger updates
    - `componentDidUpdate()`
        - Cause side-effects
        - Don't update state (or this will trigger re-render)
- During *Update* (triggered internally - by changing state):
    - 

### CSS Magic
1) Adding pesudo-selectors / media queries to css
    - Can be done in standard `.css` file, but what if we want it scoped to a component (in-line styles)?
    - Can be fixed by installing 3rd party package called [Radium](https://www.npmjs.com/package/radium)
        - Import Radium at the top - `import Radium from 'radium';`
        - Change export - `export default Radium(Component);`
        - If using `@media` queries or key-frames (?), need to wrap highest level component in `<StyleRoot>` component (import from radium)
    - Can be fixed by enabling css Modules
        - First unlock extra settings using `npm run eject` -> Make sure to commit all work before doing this!
            - **NOTE:** This can not be undone! Make sure you know what you're doing!
        - Next edit `config/webpack.config.dev.js / .prod.js` files, changing the `/\.css$/` module
        - Add: `modules: true` and `localIdentName: '[name]__[local]__[hash:base64:5]`, or something like that
        - Now, import classes with `import classes from './ComponentStyles.css`
        - Add css classes in .js with `className={classes.ClassName}` instead of `className='ClassName'` like before
        - Useful Links:
            - [How to Use CSS Modules with Create React App](https://medium.com/nulogy/how-to-use-css-modules-with-create-react-app-9e44bec2b5c2)
            - [Css Modules on Github](https://github.com/css-modules/css-modules)

### Handling Errors
1) Recommended debugging tool:
    - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related?hl=en) - Chrome Ext
2) [Error Boundary](https://reactjs.org/docs/error-boundaries.html) class
    - handle errors with `componentDidCatch` function
    - only use when there is code that I know may fail - NOT supposed to handle random bugs / errors made by developer - code that may fail at runtime that cannot be prevented
    - only will work properly in production code, not development code

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
