# marioplan app
Note: This was created while following the "React, Redux & Firebase App" tutorial series by The Net Ninja

Link here:  https://www.youtube.com/watch?v=r5b0spRlnlU

Final version hosted here: https://marioplan-proj2.firebaseapp.com/signin

# Steps to achieving success:
1. Where to start
    - Use `create-react-app` to make a blank React application
        - Example: `npx create-react-app mariplan` (this is what I used for the `mariplan` app)
        - Note: I had to do `npm cache clean --force`, which was recommended on some github issues & stack overflow q's
    - Add materialize (fonts, css, javascript) from https://materializecss.com/getting-started.html
    - if using Visual Studio Code, Install `ES7 React/Redux/GraphQL/React-Native snippets` by "dsznajder"
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
    - [Momentjs](http://momentjs.com/) - `npm install moment` - for special date formatting functions
    - Firebase Functions `npm install -g firebase-tools`
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
    - Connect signup form
    - Add firestore data to firebase profile
    - Update old hard-coded user data
10. Format dates with `Moment.js` (installed earlier)
11. Determine [Firestore security rules](https://firebase.google.com/docs/firestore/security/rules-structure)
    - Purpose: so not everyone can read / write to our db
        - Extra useful tips explained in this video: https://www.youtube.com/watch?v=b7PUm7LmAOw
    - `service cloud.firestore {`
        - scopes those rules only for firestore. pretty basic.
    - `matMakech /databases/{database}/documents {`
        - rules should match any firestore database in our project. We only have 1, so we won't have to change this.
    - `match /{document=**} {`
        - says "match any document in the database"
    - `allow read, write;`
        - allows ANYONE to read / write to database.
    - Some suggested updates to rules:
        1. Add `read, write` for authenticated users (`request.auth.uid != null`) where appropriate (`/projects/{project}`)
        2. Allow anyone to `create` new users
        3. Only allow authenticated users to `read` other user data (like name / initials)
        4. Only allow authenticated & same user to edit (`write`) to their own data
            - `allow write: if request.auth.uid == userId`, where `match /users/{userId} {`
    - Note: Database rules may take ~ 10 minutes to update!
12. Hosting code on Firebase
    -  sure Firebase Tools are setup
    - Log in to Firebase CLI
        - `firebase login`
        - Note: If using Git Bash, have to use `firebase login --interactive`
        - Source: https://stackoverflow.com/questions/35368254/cannot-deploy-angular-app-on-firebase
    - next run `firebase init` to set things up
        - This didn't work on Git Bash for me, I had to use Visual Studio Code's terminal (`Ctrl` + `\``)
        - Other setup:
            - Select firebase utilities to use
                - Hosting & Functions (not Firestore since we set up rules in firebase console)
            - Select your firebase project
            - Language? Javascript
            - ESLint? no (not for now, at least)
            - Install dependencies? (Y)
                - If this fails or if you say no, you'll have to `cd` into `/functions` and run `npm install`
            - What do you want as public directory? `dist` -> this is where React will build our application later
            - Single-page app? Y
13. Create Cloud Functions
    - Purpose = use cloud functions (triggers) to create notifications for user to see.
    - First test out default function (hello world)
        - `firebase deploy --only functions` -> only deploys firebase functions (from `/functions` dir) to Firebase - nothing from `/dist` yet.
    - Decide which triggers we will need for notifications
        - New project (new document)
        - New user signs up (using auth)
14. Hook up notifications on Dashboard
    - Also set new database rules - add `read` access, but nobody should have `write` access
15. Ordering data received from Firestore
16. Deploy app to firebase hosting
    - build app first `npm run build`
    - move built files into `/dist`
        - Note: we're deploying from `/dist` b/c that's what the tutorial did haha. Minor mistake.
    - next, run `firebase deploy`
17. Done!

## Some errors i hit along the way:
1. `Error with profile listener: Missing or insufficient permissions. Error: Missing or insufficient permissions.`
    - Found when signing out using firebase auth.
    - Bug found here: https://github.com/prescottprue/react-redux-firebase/issues/494
    - Basically it seems like a message logging issue, and there should be a fix available in the latest versions.
2. `npm ERR! Unexpected end of JSON input while parsing near '...ncies":{"tslib":"^1.9'`
    - Found when telling Firebase CLI to "Y" install dependencies during `firebase init` stage.
    - Solved twice with [`npm cache clean --force`](https://github.com/vuejs-templates/webpack/issues/990)
