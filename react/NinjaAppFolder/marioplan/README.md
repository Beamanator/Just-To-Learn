# mariplan app
Note: This was created while following the "React, Redux & Firebase App" tutorial series by The Net Ninja

Link here:  https://www.youtube.com/watch?v=r5b0spRlnlU

# Steps to achieving success:
1. Where to start
    - Use `create-react-app` to make a blank React application
        - Example: `npx create-react-app mariplan` (this is what I used for the `mariplan` app)
        - Note: I had to do `npm cache clean --force`, which was recommended on some github issues & stack overflow q's
    - Add materialize (fonts, css, javascript) from https://materializecss.com/getting-started.html
    - Install `ES7 React/Redux/GraphQL/React-Native snippets` by "dsznajder"
        - provides snippets for React, Redux, Graphql, ES7
2. Plan out components
    - App (root)
        - Nav (show all links)
            - Signed in Links
            - Signed out Links
        - Dashboard (`/dashboard` or `/`)
            - Project List (list out all projects on left-hand side)
            - Notifications (notification panel on the right)
        - Project Details (`/project/:id`)
        - Create Project (`/create`)
        - Sign in (`/signin`)
        - Sign up (`/signup`)
3. Create shell components
    - Make folders for each 'group' / 'section' of components
        - /auth
            - `SignIn.js`
            - `SignOut.js`
        - dashboard
            - `Dashboard.js`
            - `Notifications.js`
        - layout
            - `Navbar.js`
            - `SignedInLinks.js`
            - `SignedOutLinks.js`
        - projects
            - `CreateProject.js` (`/create`)
            - `ProjectDetail.js` (`/project/:id`)
            - `ProjectList.js` (inside Dashboard)
            - `ProjectSummary.js` (will bee used inside `ProjectList` most likely)
4. Download some extra libraries
    - React Router - `npm install react-router-dom`
    - Redux / React Redux - `npm install redux react-redux`
5. Start filling in components
    - Navbar (stateless) (including SignedInLinks / SignedOutLinks)
    - Dashboard (no dynamic data yet)
    - ...
6. Hook up Nav Links & add extra css
7. Adding Redux
    - 