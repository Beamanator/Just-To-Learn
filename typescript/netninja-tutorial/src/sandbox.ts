console.log("hi");

const myname = "alex";

// --> functions
const circ = (diameter: number) => {
    return diameter * Math.PI;
};

// error here
// circ("hi");
// no error here
circ(44);

// --> arrays
let names = ["luigi", "mario", "yoshi"];
names.push("toad"); // no problem
// names.push(4); // NOT ALLOWED
// names[0] = false; // NOT ALLOWED
// names = 'some string'; // NOT ALLOWED

// declare array with different data types from the beginning!
let mixedTypes = ["hungry", 4, "hippo"];
mixedTypes.push(5); // no problem
mixedTypes.push("giggidy"); // no problem
// mixedTypes.push(true); // NOT ALLOWED

// --> objects
let obj = {
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
let age: any = 25;
age = "26";
age = false;

let mixed: any[] = [];
mixed.push(5);
mixed.push(false);

let ninja: {
    name: any;
    age: any;
};
ninja = { name: "yoshi", age: "5" };
ninja = { name: 25, age: true };
// ninja = {}; // NOT ALLOWED

// function basics
let greet: Function = () => {
    console.log("hello world");
};
greet = () => console.log("new func");
// greet = 'hello' // NOT ALLOWED
const add = (a: number, b: number) => a + b;
console.log(add(1, 5));
// console.log(add('hi', 5)) // NOT ALLOWED
// console.log(add(4)) // NOT ALLOWED
// optional param:
const sub = (a: number, b?: number) => a - (b ?? 10);

const minus = (a: number, b: number = 5): number => a + b;
let result = minus(10, 5);
// result = 'something' // NOT ALLOWED
const sayHi: Function = (name?: string): void => {
    console.log("hello", name);
};

// type aliases (define a type and reuse later)
type StringOrNum = string | number;
type objWithName = { name: string; uid: StringOrNum };
const logDetails = (uid: StringOrNum, item: string) => {
    console.log("log details of:", item);
};
const greet2 = (user: objWithName) => {
    console.log(`${user.name} says hello`);
};
