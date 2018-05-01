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
    - `ref` property is available in props
        - expects a function input like this:
        - `ref={(elem) => { this.inputElement = elem }}`
        - => property `this.inputElement` will then be available anywhere in the class
        - Note: this property is created at the time `render()` is run, as this is where you set this property.
        - This is helpful for setting `.focus()` on input elements, or media playback - NOT for styling / displaying elements

### [Component Lifecycles](https://reactjs.org/docs/state-and-lifecycle.html) (only available in Stateful components)
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
        - Update state or last minute optimizations, but is commonly not used
        - Usage discouraged as of React 16.3
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
        - Usage discouraged as of React 16.3
    - `shouldComponentUpdate(nextProps, nextState)`
        - props and state which triggered this update
        - may cancel updating process!
        - `return true` - update continues
        - `return false` - updating stops (saves performance - no `render()` but CAN be bad if used in the wrong way)
        - Don't cause side-effects
    - `componentWillUpdate(nextProps, nextState)`
        - Again may sync state to props
        - Don't cause side-effects
        - If you have a *Stateless* component that receives a lot of props, but the component should only re-render if one (or a few) of those props change, it may be worth it to switch to a *Stateful* component with this lifecycle method implemented.
        - Usage discouraged as of React 16.3
    - `render()`
        - Renders JSX with result of updated component
    - Update Child Component Props
        - May trigger updates
    - `componentDidUpdate()`
        - Cause side-effects
        - Don't update state (or this will trigger re-render)
- During *Update* (triggered internally - by changing state):
    - **Difference:** no `componentWillReceiveProps(...)` method here!
    - All other methods / events are the same!

### Some new React 16 Features
1) Before, couldn't have adjacent elements in `render()` function without wrapping them in an element (like a `<div>`)
    - Now (ex: in `Persons.js`), we can return an array of `<Person>` components (JSX elements).
        - Note: In doing this, each array item needs to have a `key` property
    - Can also use a *"Higher Order Component"*
    - These "fixes" are useful b/c sometimes you don't want to introduce another HTML element, maybe because it will destroy your styling (ex: if using Flex-Box)
1) [Higher Order Components](https://reactjs.org/docs/higher-order-components.html)
    - normal compoents with one extra thing:
        - Not representational
        - Wrap other components to add extra functionality
    - It can just return `props.children` without a wrapping HTML element
        - Example: `Auxiliary.js` file created in the `hoc` directory
    - It can just add a simple css class to all elements of a component
        - Example: `WithClass.js` or `withClass2.js`
        - Using `withClass2.js`, don't ever edit the `WrappedComponent`!
        - Can pass props to `WrappedComponent` with spread operator - `{...props}`! or `{...this.props}` for stateful components
    - **Note:** With **React 16.2**, you can use a built-in component (called a *fragment*) by using empty JSX tags: `<>` and `</>` - this replaces the `Auxiliary.js` file in our class project
### Some new React 16.3 Features
1) [`ref` property](https://reactjs.org/docs/refs-and-the-dom.html)
    - before, we had to use a `ref` prop set to a function, setting a variable via `this.variableName = elementWithRef`
    - Now, in the `constructor()` we can set `this.elementRef = React.createRef();`, then in the element with the `ref` prop, just do `ref={this.elementRef}`, and use `this.elementRef.current` in the `componentDidMount()` lifecycle method, or wherever you plan to use this `ref`.
1) Forwarded references
    - React does not forward `ref` props through higher order components (even though we use `{...this.props}`)
    - `React.forwardRef((props, ref) => {return <someJSX>})`
    - Purpose = to not have to rename a ref passed to child Components
        - Ex: passing a `ref` from `Persons.js` to `Person.js`, if we don't use `React.forwardRef(...)` in the higher order component wrapping `Person.js`, we have to pass the reference prop in `Persons.js` as something like `forwardedRef={this.lastPersonRef}`.
    - This makes `withClass2.js` a bit more complicated looking, but allows us to pass a normal reserved `ref` prop from `Persons.js` to `Person.js` to give us the ability to `focus` an input element.
1) Context API (for global props)
    - Commonly used for: Login authentication, global theming set by user. Not recommomended to use this in ALL cases, just a few.
    - Set up context with: `export const AuthContext = React.createContext(false);` (`export` makes context available outside of file it's setup in)
    - Next, set a Provider component wrapping other Components that need this context with: `<AuthContext.Provider>{other components}</...>`
    - Finally, use the data in the context by doing `<AuthContext.Consumer>{ arg => /* do something with arg here */}</...>` (don't forget to `import` the `AuthContext` context in that file)
    - Useful so we can pass context around without setting up an ugly chain of props
1) Updated Lifecycle methods
    - A few methods are "discouraged" because they're often used incorrectly:
        - `componentWillMount()`
        - `componentWillUpdate(...)`
        - `componentWillReceiveProps(...)`
    - New hooks:
        - `static getDerivedStateFromProps(nextProps, prevState)`
            - Executed whenever props are updated and give you a chance to update your state alongside the prop updates
            - Often not needed (as state should usually be decoupled from your props), but can be needed
            - Executed before `render()`
        - `getSnapshotBeforeUpdate()`
            - Gets snapshop of the DOM right before it's about to change
            - Executed before `componentDidUpdate()`
            - Ex usage: save current scrolling position of user, then in `componentDidUpdate()`, take user back to that scrolled position (see docs)

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

### How React Updates the DOM
1) `render()` is called
    - Does NOT immediately render the JSX to the real DOM
    - Why? Accessing the DOM is really *slow*!
1) Compares Old Virtual DOM to Re-rendered Virtual DOM
    - These are DOM representations in js
    - If there ARE differences, it reaches out to the real DOM and only updates the changes needed
    - If no updates needed, doesn't touch the real DOM.

### Handling Errors
1) Recommended debugging tool:
    - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/related?hl=en) - Chrome Ext
1) [Error Boundary](https://reactjs.org/docs/error-boundaries.html) class
    - handle errors with `componentDidCatch` function
    - only use when there is code that I know may fail - NOT supposed to handle random bugs / errors made by developer - code that may fail at runtime that cannot be prevented
    - only will work properly in production code, not development code

### Comments about 'State'
1) `this.setState(...)` is asynchronous
    - If you want to update (mutate) state by accessing the current state inside this function, don't do the simple method because it's possible that `this.state.someProp` is not up to date (if `this.setState...` was called somewhere else very recently)
        - Better syntax is to use `this.state( (prevState, props) => { return { someProp: prevState.someProp + 1}; })`

### Useful npm libraries for React projects:
1) [radium](https://www.npmjs.com/package/radium)
    - Scopes styles to 1 specific Component
1) [prop-types](https://www.npmjs.com/package/prop-types)
    - Allowes dev to check types of props
    - `import PropTypes from 'prop-types';`
    - Obviously, doesn't work in functional components
    - Very useful to use when working with other people / when others may use your component
    - npm documentation shows available types
    - See also React docs on [Typechecking With PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

### Planning a React App
1) Component Tree / Component Structure
1) Application State (Data)
    - Ex: ingredients of a burger app (what needs to render & what user needs to pay in the end)
1) Components vs Containers
    - Stateless (functional / dumb) vs Stateful (`class` - manage state)
- See example app notes in `BurgerBuilderNotes.md`

### Other
1) Dynamic content (functions, variables, etc) in JSX goes between {}
1) `props.children` - refers to anything between open & closing tag of custom element / component (ex: <Person>children!</Person>)
1) state (reserved word)
    - Only available in components extending Component class
    - Try to only manipulate state in 'container' Components, which are high-level components. The smaller amount of files that change the state, the better
1) to pass data to event handler, use either of these methods:
    - `this.<function-name>.bind(this, data)`
      - recommended version
    - `() => this.<function-name>(data)`
      - THIS MAY NOT WORK ALWAYS (maybe only when scaled to large apps)
1) `PureComponent` - imported via `import {PureComponent} from 'react';`
    - Same as normal, except has `shouldComponentUpdate` lifecycle method build-in.
        - This build-in method goes through all properties of `props` and `state`, and compare them to their old version and only continue updating if it detects a difference
    - Only should be used if we know updates might not be required
    - Not EVERYTHING should be a `PureComponent`
1) Never name a file `Aux.js` in Windows! Won't work well with explorer or git!
1) When loading images into a component (like a Logo), don't hard-code a directory link like `'../../assets/images/logo.png'` since WebPack will group files & folders together in the production code, and the link will be broken.
    - Instead, import image into the Component (like another Component), then using that image with `src` like this:
    - `import logo from '../../assets/images/img.png'`, then later `<img src={logo} />`
1) `Firebase` is has nice, simple to set up, free (for starters) database service