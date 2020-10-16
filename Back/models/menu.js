var mongoose = require("mongoose");


var Schema = mongoose.Schema;

var menuSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },

    price: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    photo:{
      data: Buffer,
      contentType: String
    },
    stock:{
        type: Boolean,
        default: true
    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Menu", menuSchema);
