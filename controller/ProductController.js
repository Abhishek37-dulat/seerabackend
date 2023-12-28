const jwt = require("jsonwebtoken");
const Product = require("../model/Product");
const cloudinary = require("../database/cloudinaryCN");

const getAllProduct = async (req, res) => {
  try {
    const productdata = await Product.find();
    console.log(jwt);
    return res
      .status(200)
      .json({ msg: "fetching products data successfully!", data: productdata });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while fetching products data",
      error: error.message,
    });
  }
};

const getAllProductInactive = async (req, res) => {
  try {
    const productdata = await Product.find({
      product_availability: "inactive",
    });
    // console.log(productdata);
    return res
      .status(200)
      .json({ msg: "fetching products data successfully!", data: productdata });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while fetching products data",
      error: error.message,
    });
  }
};

const getAllProductForCustomers = async (req, res) => {
  try {
    const productdata = await Product.find({
      isDeleted: false,
    });
    // console.log(productdata);
    return res
      .status(200)
      .json({ msg: "fetching products data successfully!", data: productdata });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while fetching products data",
      error: error.message,
    });
  }
};

const getAllProductNotDelete = async (req, res) => {
  try {
    const productdata = await Product.find({
      isDeleted: false,
      product_availability: "active",
    });
    // console.log(productdata);
    return res
      .status(200)
      .json({ msg: "fetching products data successfully!", data: productdata });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while fetching products data",
      error: error.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productdata = await Product.findById(req.params.id);
    // console.log(productdata);
    return res.status(200).json({
      msg: "fetching product details successfully!",
      data: productdata,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while fetching product details",
      error: error.message,
    });
  }
};
const addProduct = async (req, res) => {
  //   console.log(req.body);
  const {
    product_name,
    product_availability,
    product_description,
    product_image,
    product_colors,
    product_image_before_logo,
    product_sizes,
    product_material_tittle,
    product_material,
    product_shapes,
    product_categories,
    product_gender,
    product_video,
    product_discount,
    product_orientation,
    totalStock,
    product_price,
    product_price_qty,
    product_logo_location,
    product_length,
    product_breadth,
    product_height,
    product_weight,
  } = req.body;
  if (
    !product_name ||
    !product_description ||
    !product_categories ||
    !product_price ||
    !product_length ||
    !product_breadth ||
    !product_height ||
    !product_weight
  ) {
    return res.status(400).json({
      msg: "please provide necessary product details",
    });
  }
  try {
    const pImages = [];
    if (product_image.length > 0) {
      for (let x = 0; x < product_image.length; x++) {
        let up = await cloudinary.uploader.upload(product_image[x], {
          upload_preset: "seeraprint",
        });
        pImages.push(up);
      }
    }
    const cImage = [];
    if (product_colors?.length > 0) {
      for (let x = 0; x < product_colors?.length; x++) {
        const tempimage = [];
        if (product_colors[x]?.image?.length > 0) {
          for (let y = 0; y < product_colors[x]?.image?.length; y++) {
            let up = await cloudinary.uploader.upload(
              product_colors[x].image[y],
              {
                upload_preset: "seeraprint",
              }
            );
            tempimage.push(up);
          }
          const bImage = await cloudinary.uploader.upload(
            product_colors[x].image_before_logo,
            {
              upload_preset: "seeraprint",
            }
          );
          cImage.push({
            ...product_colors[x],
            image: tempimage,
            image_before_logo: bImage,
          });
        } else {
          cImage.push(product_colors[x]);
        }
      }
    }

    const productdata = await Product.create({
      product_name,
      product_availability,
      product_description,
      product_image: pImages,
      product_colors: cImage,
      product_image_before_logo,
      product_sizes,
      product_material_tittle,
      product_material,
      product_shapes,
      product_categories,
      product_gender,
      product_video,
      product_discount,
      totalStock,
      product_price,
      product_price_qty,
      product_logo_location,
      product_length,
      product_breadth,
      product_height,
      product_weight,
      product_orientation,
    });
    await productdata.save();
    // console.log(productdata);
    return res.status(200).json({
      msg: "product details added successfully!",
      data: productdata,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while adding product details",
      error: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  const findProduct = await Product.findById(req.params.id);
  if (!findProduct) {
    return res.status(500).json({
      msg: "Cann't find product",
    });
  }
  const {
    product_name,
    product_availability,
    product_description,
    product_image,
    product_colors,
    product_image_after_logo,
    product_image_before_logo,
    product_sizes,
    product_material_tittle,
    product_material,
    product_shapes,
    product_categories,
    product_gender,
    product_video,
    product_discount,
    totalStock,
    product_price,
    product_price_qty,
    product_logo_location,
    product_length,
    product_breadth,
    product_height,
    product_weight,
  } = req.body;
  if (
    !product_name ||
    !product_description ||
    !product_categories ||
    !product_price ||
    !product_length ||
    !product_breadth ||
    !product_height ||
    !product_weight
  ) {
    return res.status(400).json({
      msg: "please provide necessary product details",
    });
  }
  try {
    const productdata = await Product.findByIdAndUpdate(
      req.params.id,
      {
        product_name,
        product_availability,
        product_description,
        product_image,
        product_colors,
        product_image_after_logo,
        product_image_before_logo,
        product_sizes,
        product_material_tittle,
        product_material,
        product_shapes,
        product_categories,
        product_gender,
        product_video,
        product_discount,
        totalStock,
        product_price,
        product_price_qty,
        product_logo_location,
        product_length,
        product_breadth,
        product_height,
        product_weight,
      },
      { new: true }
    );
    return res.status(200).json({
      msg: "product details updated successfully!",
      data: productdata,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      msg: "Error while updating product details",
      error: error.message,
    });
  }
};
const updateProductStatus = async (req, res) => {
  try {
    const { product_availability } = req.body;

    if (!["active", "inactive"].includes(product_availability)) {
      return res.status(400).json({
        msg: "Invalid product_availability value. It should be 'active' or 'inactive'.",
      });
    }
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: { product_availability: req.body.product_availability } }
    );
    if (result.nModified === 0) {
      console.log("Product not found or status unchanged");
      return;
    }
    return res.status(200).json({
      msg: "Product status updated successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error updating product status.",
      error: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { isDeleted: true }
    );
    return res.status(200).json({
      msg: "product details delete successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error while deleting product details",
      error: error.message,
    });
  }
};

const retrivedeleteProduct = async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { isDeleted: false }
    );
    return res.status(200).json({
      msg: "product details retrive successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Error while retriving product details",
      error: error.message,
    });
  }
};

module.exports = {
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
};
