const express = require('express');
const todoController = require('./controllers/todoController');

// fire the app
const app = express();

// set up template engine
app.set('view engine', 'ejs');

// static files -> not route specific (everything goes to /public/...)
app.use(express.static('./public'));

// fire controllers
todoController(app);

// listen to port
app.listen(3000);
console.log('Listening to port 3000');