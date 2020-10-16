const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

var Schema = mongoose.Schema;

var orderSchema = new Schema(
  {
    customer: {
      type: ObjectId,
      ref: "Customer",
    },
    employee: {
      type: ObjectId,
      ref: "Employee",
    },
    order: {
      type: Buffer,
    },
    status: {
      type: String,
      enum: ["Orderd", "Placed", "Processing", "Shipped", "Delivered"],
      default: "ordered",
    },
    table: {
      type: Number,
      min: 1,
      max: 15,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
