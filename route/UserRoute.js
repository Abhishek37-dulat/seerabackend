const express = require("express");
const {
  RegisterUser,
  LoginUser,
  GetAllUsers,
} = require("../controller/UserController.js");
const { authenticateUser } = require("../middleware/loginToken.js");
const {
  AddAddress,
  UpdateAddress,
  DeleteAddress,
  GetAddress,
  UserAllAddress,
} = require("../controller/UserAddressController.js");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  removeAllFromWishlist,
} = require("../controller/WishlistController.js");

const {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
  clearCart,
  removeSingleItem,
} = require("../controller/CartController.js");
const {
  addComment,
  getCommentsByProduct,
  updateComment,
  deleteComment,
} = require("../controller/CommentController.js");

const router = express.Router();

router.get("/users", GetAllUsers);
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/address/add", authenticateUser, AddAddress);
router.put("/address/update/:id", authenticateUser, UpdateAddress);
router.put("/address/delete/:id", authenticateUser, DeleteAddress);
router.get("/address", authenticateUser, GetAddress);
router.get("/address/alldata", authenticateUser, UserAllAddress);

router.post("/wishlist/:id", authenticateUser, addToWishlist);
router.delete("/wishlist/remove/:id", authenticateUser, removeFromWishlist);
router.delete("/wishlist/remove-all", authenticateUser, removeAllFromWishlist);
router.get("/wishlist", authenticateUser, getWishlist);

router.post("/cart/add", authenticateUser, addToCart);
router.put("/cart/update", authenticateUser, updateCartItem);
router.put("/cart/remove-single/:id", authenticateUser, removeSingleItem);
router.delete("/cart/remove/:id", authenticateUser, removeCartItem);
router.delete("/cart/remove-all", authenticateUser, clearCart);
router.get("/cart", authenticateUser, getCart);

router.post("/comment/add/:id", authenticateUser, addComment);
router.put("/comment/update/:id", authenticateUser, updateComment);
router.delete("/comment/remove/:id", authenticateUser, deleteComment);
router.get("/comment/data/:id", getCommentsByProduct);

module.exports = router;
