// console.log("Hello from index.js");
const add = require("./add.js");
const superman = require("./superman.js");

const a = add(1, 2);
// console.log(a);

const super1 = require("./superman.js");
console.log(super1.getName());
super1.setName("Batman");
console.log(super1.getName());

const super2 = require("./superman.js");
console.log(super2.getName());
super2.setName("challi");
console.log(super2.getName());
