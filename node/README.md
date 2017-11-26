# Useful Node / NPM Packages:
1) Express - great for easier routing (and maybe other things)
   - install with "npm install express"
   - listens to GET, POST, DELETE, PUT requests
2) Nodemon - server automatically restarts when changes in code are detected.
   - install with "npm install -g nodemon"
   - run in project with "nodemon app.js"
3) Body-Parser - nicely parses form data and stores on req.body property
   - install with "npm install body-parser"
   - access data via req.body property of route
4) ejs - dynamic view creator
   - install with "npm install ejs"
   - add basic js code with <% // code %> (same spacing)
   - add passed-in data with <%= // variable %>
   - from controller, pass data with 'response.render('ejs view name -> from views folder', { data: data })
5) Firebase Hosting - add static or dynamic node apps to firebase hosted projects!
   - install with 'npm install -g firebase-tools" (-g if you want it available everywhere)
   - update fb tools - 'npm install firebase-functions@latest --save' - in local hosting folder
   - look below for more firebase app creation details
   
# Firebase Hosting - terminal commands & tips
**Terminal Commands**
1) To connect to firebase, install firebase-tools (see above npm package)
2) init firebase app - "firebase init"
   - can associate the app with a firebase project here
3) init functions - "firebase init functions"
   - install dependencies with npm
   - then cd into functions and install express
4) firebase serve --only functions,hosting
   - local emulation of app
5) firebase deploy
   - deploy to hosting
6) firebase deploy --only hosting
   - docs: https://firebase.google.com/docs/cli/
   - deploys only hosting, not database / functions / etc
7) **npm install firebase-functions@latest --save**
   - update local firebase-functions code to latest version (do this often)
   
**Storage**
1) On Web, in HTML, import the https://www.gstatic.com/firebasejs/4.6.2/firebase.js code and NOTHING ELSE
   - If you import other code, firebase.storage() may not work
   
**Tips**
1) Watch out! Firebase hosting will always server a static page over a dynamic route
   - example: if trying to serve a dynamic index.html, make sure there's no index.html in public (static) folder
2) If "firebase deploy" is taking a long time to start, close terminal & try again
3) If files aren't updating quickly using 'serve' or maybe 'deploy', clear cache
   - example: https://stackoverflow.com/questions/34192901/firebase-deploy-not-updating-js-file

# Useful command line tricks:
1) To create a basic package.json file for a node app, type 'npm init' and follow prompts
2) npm install <package name> **--save** (**--save** makes the new package appear automatically in the package.json file)
