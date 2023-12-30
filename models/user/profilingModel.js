const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const profilingSchema = new mongoose.Schema(
  {
    howold: {
      type: String,
      required: true,
    },
    situation: {
      type: String,
      required: true,
    },
    retire: {
      type: String,
      required: true,
    },
    financial: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    withdraw: {
      type: String,
      required: true,
    },
    when: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
      required: true,
    },
    likely: {
      type: String,
      required: true,
    },
    approach: {
      type: String,
      required: true,
    },
    createdBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profiling", profilingSchema);
