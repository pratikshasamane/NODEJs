const { EventEmitter } = require("stream");

class PizzaShop extends EventEmitter {
  constructor() {
    super();
    this.orderNumber = 0;
  }

  order(size, topping) {
    this.orderNumber++;
    this.emit("pizza-event", size, topping);
  }

  displayOrder() {
    console.log(`Current order number is : ${this.orderNumber}`);
  }
}

module.exports = PizzaShop;
