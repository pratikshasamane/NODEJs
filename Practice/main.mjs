// import add from "./main-esm.mjs";

// console.log(add(1, 2));

import math from "./main-esm.mjs";

// console.log(math.add(1, 2));
// console.log(math.substract(1, 2));

const { add, substract } = math; // destructing

console.log(add(2, 5));
console.log(substract(2, 5));
