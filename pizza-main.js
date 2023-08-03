const PizzaShop = require("./pizza-shop");
const Drinks = require("./drinks");

const pizzaShop = new PizzaShop();
const drinks = new Drinks();

drinks.drinks();
pizzaShop.on("pizza-event", (size, topping) => {
  console.log(`YOur order for ${size} pizza with ${topping}`);
});
pizzaShop.order("large", "mashroom");

pizzaShop.displayOrder();


