const mongoose = require("mongoose");

const schemas = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "valiationsSchema",
    },
    firstname: {
      type: String,
      required: [true, "Please add firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please add lastname"],
    },

    email: {
      type: String,
      required: [true, "Please add email address"],
    },
    isActive: {
      type: Boolean,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserDetails", schemas);
