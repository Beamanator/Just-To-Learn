// ./ is current directory
// var stuff = require('./stuff');

// get events emitter (and other things)
var events = require('events');
var util = require('util');

// var myEmitter = new events.EventEmitter();

// myEmitter.on('someEvent', function(msg) {
//     console.log(msg);
// });

// myEmitter.emit('someEvent', 'the event was emitted');

var Person = function(name) {
    this.name = name;
};

// add events emitter to any new "Person" created
util.inherits(Person, events.EventEmitter);

var james = new Person('James');
var mary = new Person('Mary');
var ryu = new Person('Ryu');
var people = [james, mary, ryu];

people.forEach(function(person) {
    person.on('speak', function(msg) {
        console.log(person.name + ' said: ' + msg);
    });
});

james.emit('speak', 'hey dudes');
ryu.emit('speak', 'i want a curry');