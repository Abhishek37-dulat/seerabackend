const mongoose = require("mongoose");
const Product = require("./Product.js");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    additional_phone: [
      {
        type: String,
      },
    ],
    password: {
      type: String,
      required: true,
    },
    address: [
      {
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        pin_code: {
          type: Number,
        },
        isDelete: {
          type: Boolean,
          default: false,
        },
      },
    ],
    photo: {
      type: String,
    },
    gender: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
