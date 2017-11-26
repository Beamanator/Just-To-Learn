const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://test:test@ds119675.mlab.com:19675/resttest', {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

// serve up static (css, js, html) files
app.use(express.static('public'));

// use body-parser middleware
app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));

// add error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422)
    .send({
        error: err.message
    });
});

// listen for requests
app.listen(process.env.port || 4000, function(){
    console.log('now listening for requests');
});
