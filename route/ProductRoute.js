const express = require("express");
const {
  getAllProduct,
  getSingleProduct,
  addProduct,
  updateProduct,
  updateProductStatus,
  deleteProduct,
  getAllProductNotDelete,
  getAllProductInactive,
  getAllProductForCustomers,
  retrivedeleteProduct,
} = require("../controller/ProductController.js");
const route = express.Router();

route.get("/", getAllProduct);
route.get("/details/:id", getSingleProduct);
route.get("/active", getAllProductNotDelete);
route.get("/inactive", getAllProductInactive);
route.get("/products", getAllProductForCustomers);
route.post("/", addProduct);
route.put("/details/:id", updateProduct);
route.put("/status/:id", updateProductStatus);
route.put("/delete/:id", deleteProduct);
route.put("/retrive/:id", retrivedeleteProduct);

module.exports = route;
