const User = require("../model/User.js");
const Product = require("../model/Product.js");

const addToWishlist = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ msg: "Product is already in the wishlist" });
    }

    user.wishlist.push(productId);
    await user.save();

    return res
      .status(200)
      .json({ msg: "Product added to wishlist", data: user.wishlist });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error adding to wishlist", error: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const productId = req.params.id;

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    await user.save();

    return res
      .status(200)
      .json({ msg: "Product removed from wishlist", data: user.wishlist });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error removing from wishlist", error: error.message });
  }
};

const getWishlist = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res
      .status(200)
      .json({ msg: "Wishlist fetched successfully", data: user.wishlist });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error fetching wishlist", error: error.message });
  }
};

const removeAllFromWishlist = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.wishlist = [];
    await user.save();

    return res
      .status(200)
      .json({ msg: "Wishlist cleared successfully", data: user.wishlist });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error clearing wishlist", error: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  removeAllFromWishlist,
};
