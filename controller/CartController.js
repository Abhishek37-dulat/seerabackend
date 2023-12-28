const Cart = require("../model/Cart.js");
const User = require("../model/User.js");
const Product = require("../model/Product.js");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity, productDetails } = req.body;
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let userCart = await Cart.findOne({ user: userId });
    if (!userCart) {
      userCart = new Cart({ user: userId, items: [] });
    }

    const existingCartItem = userCart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity || 1;
    } else {
      userCart.items.push({ product: productId, quantity, productDetails });
    }

    await userCart.save();
    return res
      .status(200)
      .json({ msg: "Product added to cart", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error adding to cart", error: error.message });
  }
};
const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const userCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    return res
      .status(200)
      .json({ msg: "Cart fetched successfully", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching cart", error: error.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, quantity, productDetails } = req.body;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const cartItem = userCart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    cartItem.quantity = quantity;
    cartItem.productDetails = productDetails;

    await userCart.save();

    return res
      .status(200)
      .json({ msg: "Cart item updated successfully", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error updating cart item", error: error.message });
  }
};

const removeSingleItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    const existingCartItem = userCart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!existingCartItem) {
      return res.status(404).json({ msg: "Item not found in the cart" });
    }

    existingCartItem.quantity = Math.max(0, existingCartItem.quantity - 1);

    if (existingCartItem.quantity === 0) {
      userCart.items = userCart.items.filter(
        (item) => item.product.toString() !== productId
      );
    }

    await userCart.save();

    return res
      .status(200)
      .json({ msg: "Product quantity updated in the cart", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error updating cart", error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.userId;
    const productId = req.params.id;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await userCart.save();

    return res
      .status(200)
      .json({ msg: "Cart item removed successfully", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error removing cart item", error: error.message });
  }
};
const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    userCart.items = [];

    await userCart.save();

    return res
      .status(200)
      .json({ msg: "Cart cleared successfully", data: userCart });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error clearing cart", error: error.message });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  clearCart,
  removeSingleItem,
};
