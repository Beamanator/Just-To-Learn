const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const bodyParser = require('body-parser');
const express = require('express');

const dbCalls = require('./extra-js/db-calls');
const privateData = require('./extra-js/private-data');

const shopRoutes = require('./routes/shop');
const cartRoutes = require('./routes/cart');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const GoogleSpreadsheet = require('google-spreadsheet');
const gsheetFns = require('./gsheet/gsheetFns');

// set up express app
const app = express();

// set up template engine
// app.set('views', './views'); // -> default
app.set('view engine', 'ejs');

// create firebase app - FOR DATABASE ONLY (no auth)
// Asynchronous callbacks ('.on') haven't worked for me in node.js
const firebaseApp = firebase.initializeApp(
    functions.config().firebase
);

const fbDB = firebase.database();

// pass firebase database to routes - via request.app.get('fb-db')
app.set( 'fb-db', fbDB );


// Google spreadsheet setup
const ReservationDoc = new GoogleSpreadsheet('1oBbx9vq7rSPlX1OA7HuZlK7ohn3mcIf7E28pmZyqjYE');

// put disc reservation & action history sheets references in app
gsheetFns.gsheet_init(ReservationDoc)
.then(function(sheetsObj) {
    if (!sheetsObj) console.error('No google sheet found :(');

    else {
        let reservationSheet = sheetsObj.reservationSheet;
        let historySheet = sheetsObj.historySheet;

        // make sure both sheets exist
        if (!reservationSheet || !historySheet) {
            let errMsg = `reservation sheet <${reservationSheet}> ` + 
                `or history sheet <${historySheet}> not found`;
            
            console.error(errMsg);
        }

        // phew, they do. set them on the app
        else {
            app.set( 'gsheet-container', sheetsObj );
        }
    }
})
.catch(function(err) {
    console.error('gsheet error: ', err);
});


// Other express app setup:

// use body-parser middleware
// -> adds request body to req.body in routes
app.use(bodyParser.json());

// redirect from home to '/shop'
app.get('/', function(req, res) {  
    res.redirect('/shop');
});

// initialize shop routes
app.use('/shop', shopRoutes);

// initialize cart routes
app.use('/cart', cartRoutes);

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

// ========= FIXME: LOCAL NODE SERVER ONLY ===========
// -> Only use with local node server!!
// app.use(express.static('../public'));
// app.listen(4000);
// console.log('Listening to port 4000');
// ============ END: local node server ===============