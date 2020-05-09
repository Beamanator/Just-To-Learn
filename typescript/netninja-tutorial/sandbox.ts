console.log("hi");

const myname = "alex";

const circ = (diameter: number) => {
    return diameter * Math.PI;
};

// error here
// circ("hi");
// no error here
circ(44);
