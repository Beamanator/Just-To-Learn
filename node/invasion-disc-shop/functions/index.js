const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');

const privateData = require('./extra-js/private-data');
const engines = require('consolidate');

const shopRoutes = require('./routes/shop');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// set up express app
const app = express();

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

// create firebase app - FOR DATABASE ONLY (no auth)
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

// pass firebase app to routes - via request.app.get('fb-app')
app.set('fb-app', firebaseApp);

// set up template engine
// app.set('view engine', 'ejs');

// use body-parser middleware
// -> adds request body to req.body in routes
app.use(bodyParser.json());

// redirect from home to '/shop'
app.get('/', function(req, res) {       res.redirect('/shop');      });

// initialize shop routes
app.use('/shop', shopRoutes);

// initialize authentication routes
app.use('/auth', authRoutes);

// initialize api routes
app.use('/api', apiRoutes);

// add error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422)
    .send({
        error: err.message
    });
});

// Create and Deploy Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// ======== FIXME: FIREBASE HOSTING ONLY =========
exports.storeApp = functions.https.onRequest(app);
// =========== END: firebase hosting =============

// ========= FIXME: LOCAL HOSTING ONLY ===========
// -> Only use with local hosting!!
// app.use(express.static('../public'));
// app.listen(4000);
// console.log('Listening to port 4000');
// ============ END: local hosting ===============