const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      productDetails: {
        image: [{ location: { type: String }, image: { type: Object } }],
        color: { type: String },
        shape: { type: String },
        size: { type: String },
        location: { type: String },
        custom_price_qty: { type: String },
        custom_Shape_size: { type: String },
        orientation: { type: String },
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
