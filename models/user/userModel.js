const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    isProfiled: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    isOnboarded: {
      type: Boolean,
      default: false,
    },
    riskProfile: {
      type: String,
      default:"",
    },
    profileScore: {
      type: Number,
      default:0
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
