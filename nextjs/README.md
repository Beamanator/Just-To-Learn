# Next js

-   Framework for creating pre-rendered React websites
-   Offers SSR (server side rendering) & SSG (static site generation)

SSR / SSG can improve site performance

-   Better SEO since site / HTML returned from server is full pages

## Tutorials

https://www.youtube.com/watch?v=A63UxsQsEbU&t=4s (Net Ninja)

## Commands

`npx create-next-app appName` - create boilerplate next app

`npm run build` - build all static pages in `/build` folder

## Notes

### project folder structure + route details

-   `/pages`
    -   react pages (routes)
    -   `index.js` root / home page (route = `/`)
    -   `<filename>.js` new page, route at `/filename`
    -   `<folder>/index.js` new page, route at `/folder`
    -   `_app.js` like root component
    -   `/api` for api endpoints
-   `/public`
    -   public assets like images
-   `/styles`
    -   styles including css modules
-   `/` self explanatory

Add other reusable components outside of `/pages` dir (maybe in new folder called `/components`)

### Routing

-   `import Link from 'next/link'`
-   `<Link href="/">Text</Link>`

Redirect user (to route) using...

`import { useRouter } from "next/router";`

-   `router.go(1)` (move forward one)
-   `router.go(-1)` (move backward one)
-   `router.push("/")` automatically go to route

dynamic routes

ex: `/ninjas/:id`

Name your page `/ninjas/[<route-param>].js` to make a dynamic route for `/ninjas/1`, `/ninjas/2`, etc...

-   Need to tell Next what dynamic data to use to build all html pages at build-time, based on dynamic data

    -   `getStaticPaths`
    -   ```js
        export const getStaticPaths = async () => {};
        ```

### Code splitting

by default, Next does code splitting :)

### adding styles

-   global stylesheets
    -   imported in `_app.js` by default, apply everywhere
-   styles jsx
-   css modules (built-in support in Next)
    -   page-specific styles
    -   Naming convention: `<Filename>.modules.css`
    -   When imported into file, returns default object with class names. Ex:
        -   `import styles from '../styles/Page.modules.css'`
        -   `<div className={styles.myClass}>text</div>`
    -   Note: can't use element selectors, have to be class selectors!
        -   Ex: can't use `div {...}` basic selector

### 404 page

Must be named `404.js`

### static assets

Place assets in `/public` folder

-   accessible via `<img src="/" />` (for example)

Also can use `Image` next component (from `next/image`)

-   Forces us to add `width` and `height` attribs
-   Makes image responsive based on those properties!
-   automatically lazily loads images!
    -   improved loading speed of site

### metadata

`import Head from 'next/head'`

-   children get put in html head for that page

Example: changing `<head>`'s `title` of an HTML doc

### fetching data

`getStaticProps`

-   runs at build-time!! not in browser!
-   placed in the page that needs the data

```js
export const getStaticProps = async () => {
    // ...

    return {
        // make props accessible in this page's component
        props: {
            // ...
        },
    };
};
```

### deploy

Vercel

-   can easily sync with github
