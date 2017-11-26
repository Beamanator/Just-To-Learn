var express = require('express');
var app = express();

// set view / template engine
// - by default, looks in the 'views' folder
// - looks for .ejs, not .html views
app.set('view engine', 'ejs');

// attach middleware to assets route
// note: if creating our own custom middleware, call next() param
// to make sure next routes are still called, after this one :)
// note2: first '/assets' route comes from the ejs files. 2nd 'assets'
// comes from the folder which holds assets files
app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
    // res.send('this is the home page');
    // res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.get('/contact', function(req, res) {
    // get data on query string of url request
    // query sting looks something like:
    // /contact?dept=marketing&person=joe
    // query obj would look like:
    // {dept: 'marketing', person: 'joe'}
    let query = req.query;

    // res.send('this is the contact page');
    // res.sendFile(__dirname + '/contact.html');
    res.render('contact', {qs: query});
});

// new route param "id" can be used in function (req.params....)
app.get('/profile/:name', function(req, res) {
    // res.send('You requested to see a profile with the id of '
    //     + req.params.id);

    var data = {
        age: 29,
        job: 'ninja',
        hobbies: ['eating', 'fighting', 'fishing']
    };

    // can pass data into profile view
    res.render('profile', {
        person: req.params.name,
        data: data
    });
});

// additional code needed to serve static files (styles, images, etc).
// lots of routes can work, but express comes baked with some extra
// middleware that does this nicely

app.listen(3000);