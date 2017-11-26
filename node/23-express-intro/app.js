// 1) get express package
var express = require('express');

// 2) fire express
var app = express();

// 4) set up routes
// req and res get additional functionality from express
app.get('/', function(req, res) {
    res.send('this is the home page');
});

app.get('/contact', function(req, res) {
    res.send('this is the contact page');
});

// 3) listen to port 3000
app.listen(3000);