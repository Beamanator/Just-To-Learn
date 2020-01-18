// input data from here: https://adventofcode.com/2019/day/1/input

// helpers
// -> calculates fuel needed for input mass
const calcFuelForMass = (mass) =>
    Math.floor(mass / 3) - 2

// part 1:
let totalFuel = data.reduce(
    (acc, mass) => acc + calcFuelForMass(mass)
    , 0
)
console.log(totalFuel)

// part 2:
let totalFuel2 = data.reduce(
    (acc, mass) => {
        let total = 0;
        let added = calcFuelForMass(mass);

        while (added > 0) {
            total += added;
            added = calcFuelForMass(mass);
        }

        return acc + total
    },
    0
)
console.log(totalFuel2)
