"use strict";
console.log("hi");
var myname = "alex";
// --> functions
var circ = function (diameter) {
    return diameter * Math.PI;
};
// error here
// circ("hi");
// no error here
circ(44);
// --> arrays
var names = ["luigi", "mario", "yoshi"];
names.push("toad"); // no problem
// names.push(4); // NOT ALLOWED
// names[0] = false; // NOT ALLOWED
// names = 'some string'; // NOT ALLOWED
// declare array with different data types from the beginning!
var mixedTypes = ["hungry", 4, "hippo"];
mixedTypes.push(5); // no problem
mixedTypes.push("giggidy"); // no problem
// mixedTypes.push(true); // NOT ALLOWED
// --> objects
var obj = {
    name: "mario",
    belt: "black",
    age: 30,
};
// obj = [1,2,3] // NOT ALLOWED
obj.name = "Alex"; // no problem
obj.age = 40; // no problem
// obj.age = '30'; // NOT ALLOWED
// obj.newProp = 'something'; // NOT ALLOWED
obj = {
    name: "billy",
    belt: "orange",
    age: 40,
}; // only works when we keep EVERY property with same type
// 'any' type
var age = 25;
age = "26";
age = false;
var mixed = [];
mixed.push(5);
mixed.push(false);
var ninja;
ninja = { name: "yoshi", age: "5" };
ninja = { name: 25, age: true };
// ninja = {}; // NOT ALLOWED
// function basics
var greet = function () {
    console.log("hello world");
};
greet = function () { return console.log("new func"); };
// greet = 'hello' // NOT ALLOWED
var add = function (a, b) { return a + b; };
console.log(add(1, 5));
// console.log(add('hi', 5)) // NOT ALLOWED
// console.log(add(4)) // NOT ALLOWED
// optional param:
var sub = function (a, b) { return a - (b !== null && b !== void 0 ? b : 10); };
var minus = function (a, b) {
    if (b === void 0) { b = 5; }
    return a + b;
};
var result = minus(10, 5);
// result = 'something' // NOT ALLOWED
var sayHi = function (name) {
    console.log("hello", name);
};
var logDetails = function (uid, item) {
    console.log("log details of:", item);
};
var greet2 = function (user) {
    console.log(user.name + " says hello");
};
