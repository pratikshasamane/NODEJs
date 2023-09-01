const mongoose = require("mongoose");

const validationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name"],
  },
  email: {
    type: String,
    required: [true, "Please add email"],
  },
  password: {
    type: String,
    required: [true, "Please add description"],
  },
});

module.exports = mongoose.model("validationSchema", validationSchema);
