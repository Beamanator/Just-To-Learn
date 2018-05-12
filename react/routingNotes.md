# Notes on SPA (Single Page Applications) in React
React does not handle Routing natively, but there is a defacto standard Router Package that can be used to accomplish this.

Packages needed for react routing (not created by Facebook):
1. `react-router` - for logic
2. `react-router-dom` - for rendering to dom

**Notes from Udemy class Section 11, Lecture 178**: We will install both packages listed above, but **note** that technically only `react-router-dom` is required for web development. It wraps `react-router` and therefore uses it as a dependency. We don't need to install `react-router` on our own for it to work. You can omit this installation step, the instructur left it in there for historic reasons and because he likes to emphasize that the main package is named react-router. If you ever search for assistance, you probably want to search for "react router" - that's the name of the package.

**Notes from Udemy class Section 11, Lecture 194**: Sometimes it's difficult or impossible to deal with custom, dynamic styling on the root path `'/'`. For example, if you are trying to use route parameters on the route path like `'/:postId'`, it's not easy (maybe impossible) to style a link to that url, since it also matches the home link `'/'`. It may be better to move to a route like `'/posts/:postId'`.

## setting up routing
1. wrap component(s) that need routing with new package code
    - can be done in `App.js` OR `index.js`
    - `import { BrowserRouter } from 'react-router-dom'`
        - Now wrap app with `<BrowserRouter>` component
2. `import { Route } from 'react-router-dom';`
    - Import from package
3. `<Route />` props
    - `path="/"` = route after localhost:3000 -> what route starts with, NOT the exact route (unless `exact` is set)
        - Can use dynamic routes with route parameters by doing something like `path="/:postId"` - make sure there is no other hard-coded route with a similar structure that will be interpreted in the `postId` variable, such as `path="/newPost"`
    - `exact` = if used, now the `path` prop is an exact path, not beginning path
    - `render={() => <h1>Test</h1>}` = function to render some JSX and replace this component
    - `component={Posts}` = expects reference to class or function that stores a component
4. Navigate to routes using `<Link>` or `<NavLink>`
    - `import {Link} from 'react-router-dom'`
    - `<Link>...</Link>` prop `to`:
        - Can be direct string like `"/"`
        - Can be javascript prop with these config options:
            - `pathname: '/new-post'` = exact url to navigate to (absolute path)
                - To make a relative path, you can use `this.props.match.url` or other means of building a dynamic path.
            - `hash: '#submit'` (optional) = add hashtag at end of url, to get the page to navigate there automatically
            - `search: 'quick-submit=true` (optional) = add query params to url
    - `import {NavLink}...`
        - Similar to `Link` but has extra props to define styling for active link.
        - By default, adds `class="active"` and `aria-current="true"` to html `a` tag
        - Can customize "active class to add with `activeClassName="my-active"`
        - Can add dynamic in-line styling with `activeStyle={{...styles}}`
5. Handling clicking on a post + routing to its full page url
    - Wrap `Post` components with `Link`s
        - `to` can be set to `/posts/postId`, or just `/id`, depending on how you handle it elsewhere in the app
    - Programmitically change url by using `props.history.push()`
        - inside `.push`, send similar properties to those in a `Link`'s `to` prop
        - Example: `this.props.history.push({pathname: '/' + postId})`
6. Loading the first path matched by `<Route>`'s `path` props can be done using a component called `Switch`
    - Wrap this component around your `Route` elements, of which you only want to load one - the first component that matches the url param in its `path` prop.
    - With this, you may have to make sure your Routes are still ordered correctly - when using route parameters
7. When working with nested routes and route parameters, you may find that a component is not getting replaced. This may be because React is not replacing a component when a url is changed, but it is changing props (like `props.match.url`) - This can be detected and handled in `componentDidUpdate` of the component linked to a changing route.
8. Redirecting a user
    - Can duplicate routes with different `path` props
    - Use `Redirect` component (also from `react-router-dom`).
        - Specify `from="..."` and `to="..."` props when inside `Switch`
        - If you're outside a `Switch` component, can't include `from` prop. This way, can use it conditionally (as any other conditional component rendering)
    - Use `props.history.redirect()` function (similar to using `Redirect` conditionally)
    - **Note**: Using method 2 or 3, you will replace the top page on the history stack, so if you go back, you will not go back to the last page, but the page that navigated you there.
9. Consider setting up Guards to control whether a user is allowed to access a page or not
    - Conditionally render a route, or conditionally redirect a user depending on auth state, or whatever you want to do.
10. Setting up 404 page
    - Can use a `Route` with absolutely no `path` prop - a catch-all `Route`.
        - This can not be used with a `Redirect` from `'/'` since they will both catch all
11. Loading Routes Lazily
    - **Note**: Definitely depends on webpack configuration, so this method should work when using `create-react-app` to build your app
    - create a higher order component - function (stateless)
        - Returns a Component (class factory)
            - This component renders component that gets created with passed-in parameter
    - call higher order component with anonymous function
        - in this function, call `import(path-to-component)`
    - don't automatically import everything, as files (`Components`) are thrown into `Bundle.js` (via webpack) and loaded immediately in your app when they're listed in a regular `import` statement
    - For example, see lecture 202, file Blog.js


## Props passed to components via Routing
1. `history`
2. `location`
    - has notes on pathname, hash, search (from `<Link>`'s `to` prop)
3. `match`
    - has notes on path, url, and if url is exact match of path
Note: If you want props to be passed into child components of the main components, there are two methods to do this:
1. Use standard `match={...this.props.match}`, or more / less specific prop to pass
2. Use higher order component from `'react-router-dom'` called `withRouter`
    - `import { withRouter } from 'react-router-dom';`
    - access the passed props from `props` or `this.props`