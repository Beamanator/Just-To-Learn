# Notes on SPA (Single Page Applications) in React
React does not handle Routing natively, but there is a defacto standard Router Package that can be used to accomplish this.

Packages needed for react routing (not created by Facebook):
1. `react-router` - for logic
2. `react-router-dom` - for rendering to dom

**Notes from Udemy class Section 11, Lecture 178**: We will install both packages listed above, but **note** that technically only `react-router-dom` is required for web development. It wraps `react-router` and therefore uses it as a dependency. We don't need to install `react-router` on our own for it to work. You can omit this installation step, the instructur left it in there for historic reasons and because he likes to emphasize that the main package is named react-router. If you ever search for assistance, you probably want to search for "react router" - that's the name of the package.

## setting up routing
1. wrap component(s) that need routing with new package code
    - can be done in `App.js` OR `index.js`
    - `import { BrowserRouter } from 'react-router-dom'`
        - Now wrap app with `<BrowserRouter>` component
2. `import { Route } from 'react-router-dom';`
    - Import from package
3. `<Route />` props
    - `path="/"` = route after localhost:3000 -> what route starts with, NOT the exact route (unless `exact` is set)
    - `exact` = if used, now the `path` prop is an exact path, not beginning path
    - `render={() => <h1>Test</h1>}` = function to render some JSX and replace this component
    - `component={Posts}` = expects reference to class or function that stores a component
4. Navigate to routes using `<Link>`
    - `import {Link} from 'react-router-dom'`
    - `<Link>...</Link>` prop `to`:
        - Can be direct string like `"/"`
        - Can be javascript prop with these config options:
            - `pathname: '/new-post'` = exact url to navigate to (absolute path)
                - To make a relative path, you can use `this.props.match.url` or other means of building a dynamic path.
            - `hash: '#submit'` (optional) = add hashtag at end of url, to get the page to navigate there automatically
            - `search: 'quick-submit=true` (optional) = add query params to url

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