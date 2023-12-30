const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const verificationSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    marital_status: {
      type: String,
      required: true,
    },
    spouse_name: {
      type: String,
      required: true,
    },
    spouse_age: {
      type: String,
      required: true,
    },
    children: {
      type: Boolean,
      required: true,
    },
    children_count: {
      type: String,
      default: "",
    },
    identity_document: {
      type: String,
      required: true,
    },
    address_proof: {
      type: String,
      required: true,
    },
    source_of_wealth: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: true,
    },
    next_of_kin_name: {
      type: String,
      required: true,
    },
    next_of_kin_phone: {
      type: String,
      required: true,
    },
    politically_exposed: {
      type: Boolean,
      required: true,
    },
    political_reason: {
      type: String,
      default:"",
    },
    public_positions: {
      type: Boolean,
      required: true,
    },
    public_position_reason: {
      type: String,
      default:"",
    },
    share_info: {
      type: String,
      required: true,
    },
    monitor_account: {
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

module.exports = mongoose.model("Verification", verificationSchema);
