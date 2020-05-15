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
