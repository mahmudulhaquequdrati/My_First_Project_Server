const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const productSchema = new mongoose.Schema(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    shoeName: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    retailPrice: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(AutoIncrement, {
  inc_field: "product",
  id: "productNums",
  start_seq: 500,
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
