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
    - Redux thunk - `npm install redux-thunk` for asynchronous action creators
    - Firebase - `npm install firebase`
        - config file setup in `/src/config/fbConfig.js`
        - Note: `apiKey` prop is only used to identify the project, but will use database rules to limit who has access to data inside the database
    - React / Redux / Firebase & firestore glue - `npm install react-redux-firebase redux-firestore`
5. Start filling in components
    - Navbar (stateless) (including SignedInLinks / SignedOutLinks)
    - Dashboard (no dynamic data yet)
    - ...
6. Hook up Nav Links & add extra css
7. Adding Redux
    - Dreate reducers
    - Create dummy data to test reducers & dynamic components
    - Adding Redux Thunk for asnchronous actions
8. Firestore - Create Firebase project & add to app
    - Basic `Firestore` notes
        - A `Collection` is a collection of Documents
            - Example: a collection of projects
        - A `Document` looks like a js object with key-value pairs
    - Planning the database
        - Collections we will have:
            - Projects
                - title
                - content
                - authorFirstName
                - authorLastName
                - authorId
                - timestamp
            - Users
                - info about app users
            - Notifications
                - info about notifications
    - Hook up 'create' form with database
    - Create firestore reducer
    - Hook up `Dashboard` & `ProjectList` / `ProjectDetails`
9. Firebase Auth
    - Turn on Email & Password authentication
    - Connect signin / signout forms
    - Route Guarding