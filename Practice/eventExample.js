const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("order-pizza", function (size, topping) {
  console.log(
    `Your order is being placed for ${size} pizza with ${topping} topping`
  );
});

emitter.emit("order-pizza", "large", "paneer");
