// 1.
const add = function (a, b) {
  return a + b;
};

// module.exports = add;

// 2.

// module.export = function (a, b) {
//   return a - b;
// };

//3. multiple exports

const substract = (a, b) => {
  return a - b;
};

module.export = {
  add,
  substract,
};
