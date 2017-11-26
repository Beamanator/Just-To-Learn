var express = require('express');
var app = express();

// set view / template engine
// - by default, looks in the 'views' folder
// - looks for .ejs, not .html views
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    // res.send('this is the home page');
    // res.sendFile(__dirname + '/index.html');
    res.render('index');
});

app.get('/contact', function(req, res) {
    // res.send('this is the contact page');
    // res.sendFile(__dirname + '/contact.html');
    res.render('contact');
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

app.listen(3000);