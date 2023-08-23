const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add title"],
    },
    paragraph: {
      type: String,
      required: [true, "Please add notes"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.createdAt = formatDate(ret.createdAt);
        ret.updatedAt = formatDate(ret.updatedAt);
        delete ret.__v;
      },
    },
  }
);

module.exports = mongoose.model("notes-app", schema);

function formatDate(date) {
  return new Date(date).toISOString().split("T")[0];
}
