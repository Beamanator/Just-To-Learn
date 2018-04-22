# Useful Node / NPM Packages:
1) Express - great for easier routing (and maybe other things)
   - install with `npm install -s express`
   - listens to `GET`, `POST`, `DELETE`, `PUT` requests
2) Nodemon - server automatically restarts when changes in code are detected.
   - install with `npm install -g nodemon`
   - run in project with `nodemon app.js` (or whatever your main js file is)
3) Body-Parser - nicely parses form data and stores on req.body property
   - install with `npm install -s body-parser`
   - access data via req.body property of route
4) ejs - dynamic view creator
   - install with `npm install -s ejs`
   - add basic js code with <% // code %> (same spacing)
   - add passed-in data with <%= // variable %>
   - from controller, pass data with `response.render('ejs view name -> from views folder', { data: data })`
5) Firebase Hosting - add static or dynamic node apps to firebase hosted projects!
   - install with `npm install -g firebase-tools` (-g if you want it available everywhere)
   - update fb tools - `npm install firebase-functions@latest --save` - in local hosting folder
   - look below for more firebase app creation details
   
# [Firebase Hosting](https://www.youtube.com/watch?v=LOeioOKUKI8&t=820s) - terminal commands & tips
**Terminal Commands**
1) To initialize a firebase project from CLI, install firebase-tools (see above npm package)
2) init firebase app - `firebase init` (or `firebase init hosting` to skip features prompt below)
   - Next, prompt will ask which features to setup:
      - Database
      - Firestore
      - Functions
      - Hosting
      - Storage
   - Next, prompt will ask which default Firebase project to use
   - Next, will ask specific questions about features you selected above
   - Next, will ask to install dependencies with `npm`
   - Next (after installing), will ask what to use as public directory (for assets to be uploaded with `firebase deploy`)
   - Next will ask to configure as single-page app (rewrite all urls to /index.html)?
   - **After** install, it's recommended to do these:
      - Install `express.js` (see above)
3) init functions - `firebase init functions`
   - install dependencies with npm
   - then cd into functions and install express
   - this step is only needed if you don't add this feature during step #2
4) `firebase login`
   - Attempts to authenticate user on firebase cli (opens web browser to authenticate)
5) `firebase serve --only functions,hosting`
   - local emulation of app
6) `firebase deploy`
   - deploy to hosting
7) `firebase deploy --only hosting`
   - docs: https://firebase.google.com/docs/cli/
   - deploys only hosting, not database / functions / etc
8) **`npm install firebase-functions@latest --save`**
   - update local firebase-functions code to latest version (do this often)

**Hosting Notes - post-init**
1) `public` folder holds static webpages and data
1) `functions` folder holds dynamic webpages and such
1) Steps for setting up your app
   - Go to `index.js` inside `/functions` uncomment the sample code
   - add `express` to the top of that page
   - hook up cloud function (default = `exports.helloWorld`) with firebase hosting app in `firebase.json` file.
      - here, add `"rewrites"` property like this:
      ```javascript
      "rewrites": [{
         "source": "/route",
         "function": "helloWorld"
      }]
      ```
   - Note: can also use `"**"` in `"source"` property to match any route
   - Test emulation with `firebase serve --only functions,hosting` - open local url (may be something like `http://localhost:5000`)
   - Middle of tutorial video (around minute 5:30), we can see info about Caching

**Storage**
1) On Web, in HTML, import the https://www.gstatic.com/firebasejs/4.6.2/firebase.js code and NOTHING ELSE
   - If you import other code, firebase.storage() may not work
2) getDownloadURL example:
      ```javascript
      imageRef.child(`${discType}.${fileType}`).getDownloadURL()
      .then(function(url) {
          // do something with url
      })
      .catch(function(err) {
          console.error('imageRef->',err);
      });
      ```
   
**Tips**
1) Watch out! Firebase hosting will always serve a static page over a dynamic route
   - example: if trying to serve a dynamic index.html, make sure there's no index.html in public (static) folder
2) If `firebase deploy` is taking a long time to start, close terminal & try again
3) If files aren't updating quickly using 'serve' or maybe 'deploy', clear cache
   - example: https://stackoverflow.com/questions/34192901/firebase-deploy-not-updating-js-file
4) Firebase hosting doesn't always use the latest versions of node, so it may be useful to install a node version manager (nvm)

# Useful command line tricks:
1) To create a basic `package.json` file for a node app, type `npm init` and follow prompts
2) `npm install <package name> **--save**` (**`--save`** makes the new package appear automatically in the package.json file)
