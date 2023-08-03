const mongoose = require("mongoose");

const schemas = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add firstname"],
    },
    email: {
      type: String,
      required: [true, "Please add lastname"],
      unique: [true, "This email alreay taken!"],
    },

    password: {
      type: String,
      required: [true, "Please add password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("valiationsSchema", schemas);
