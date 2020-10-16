var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { table } = require("console");
const { ObjectId } = mongoose.Schema;

var Schema = mongoose.Schema;

var customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    customerinfo: {
      type: String,
      trim: true,
    },
    servedby: {
      type: ObjectId,
      ref: "Employee",
    },
    order: {
      type: ObjectId,
      ref: "Order",
    },
    table: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);
