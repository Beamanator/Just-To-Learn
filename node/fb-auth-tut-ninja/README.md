# Firebase Auth Tutorial (from The Net Ninja)
Series start: https://www.youtube.com/watch?v=aN1LnNq4z54&list=PL4cUxeGkcC9jUPIes_B8vRjn1_GaplOPQ

## Tech we'll use
- Firebase
- Node.js
- Live Server (Visual Studio Code extension)

## Planning
- Login / signin form
    - Creds sent to FB server (via Firebase sdk)
    - auto token sent back to browser so we can access data (name, username, etc)
- Any data change will sent along auth token so FB knows we're authenticated

## Steps :D
- Create project, database, & set up authentication in Firebase console
- Create HTML template setup (materialize css / js, html templates, etc)
- initialize firebase connection via basic snippet from firebase console
- set up new user creation (via login form)
    - run `createUserWithEmailAndPassword`, handle response
- set up login / logout
- track authentication status using `onAuthStateChanged`
- get guide data from database & display in html
- set some UI / firestore security rules to lock database to auth'd users
- conditionally show menu links (depending on log in / out status)
- add ability to create guides in database
- add firestore realtime listener for data
- add `users` collection on signup & display data
- add new firestore rules for `users` collection
