const mongoose = require("mongoose");

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
    
    
  },
  {
    timestamps: true,
  }
);




module.exports = mongoose.model("Customer", customerSchema);





var orderSchema = new Schema(
  {
    customer: [customerSchema],
    employee: {
      type: ObjectId,
      ref: "Employee",
    },
    items: {
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




