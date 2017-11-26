const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// use ES6 native promises
mongoose.Promise = global.Promise;

// Connect to database
// Note: useMongoClient came from http://mongoosejs.com/docs/connections.html#use-mongo-client
mongoose.connect('mongodb://test:test@ds117615.mlab.com:17615/todo-app', {
    useMongoClient: true
});

// Create database schema - like a blueprint for our data
var todoSchema = new mongoose.Schema({
    item: String
});

// Create model (stored as a collection on mongodb)
var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
//     if (err) throw err;
//     console.log('item saved');
// });

// create some dummy data - later, get it from a database
// var data = [
//     {item: 'get milk'},
//     {item: 'walk dog'},
//     {item: 'kick some coding ass'}
// ];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    // set up todo routes / handlers
    app.get('/todo', function(req, res) {
        // get data from mongodb and pass it to view
        // - empty obj = find all items in collection
        Todo.find({}, function(err, data) {
            if (err) throw err;

            // render a view
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data) {
            if (err) throw err;

            // send data back to front-end
            res.json(data)
        });
    });

    app.delete('/todo/:item', function(req, res) {
        // delete requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, ' ')})
            .remove(function(err, data) {
                if (err) throw err;

                // send data back to front-end
                res.json(data);
            });

        // use filter to remove obj with item in param
        // data = data.filter(function(todo) {
        //     // if true, todo item remains in data array
        //     return todo.item.replace(/ /g, '-') !== req.params.item;
        // });
        // res.json(data);
    });

};