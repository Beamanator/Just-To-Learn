const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes/api');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://test:test@ds119675.mlab.com:19675/resttest', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

// serve up static (css, js, html) files
// -> may not be necessary in firebase hosting?
// app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', apiRoutes);

// add error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422)
    .send({
        error: err.message
    });
});



// app.get('/timestamp', function(req, res) {
//     res.send({type: 'GET'});
// });

// app.get('/timestamp-cached', function(req, res) {
//     // set 'Cache-Control' header
//     // public: it's ok to cache data on server.
//     // private: can only cache in user's browser
//     // max-age: how long we can store content in user's browser (seconds)
//     // s-maxage: how long we can store on CDN
//     res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     res.send(`${Date.now()}`);
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// -> default, from firebase:
// exports.helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");
// });

// with express:
exports.myApp = functions.https.onRequest(app);

// Note: in firebase.json, 'rewrites' -> 'sources':
// -> '**' glob matches all routes