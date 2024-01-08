const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const networthSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    assets: {
      type: String,
      required: true,
    },
    current_value_naira: {
      type: String,
      required: true,
    },
    current_value_dollar: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Networth", networthSchema);
