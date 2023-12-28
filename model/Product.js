const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_availability: {
      type: String,
      enm: ["active", "inactive"],
      default: "active",
    },
    product_description: {
      type: String,
      required: true,
    },
    product_image: [
      {
        type: Object,
      },
    ],
    product_colors: [
      {
        color: {
          type: String,
        },
        image: [
          {
            type: Object,
          },
        ],
        image_before_logo: {
          type: Object,
        },
        totalStock: {
          type: Number,
          default: 0,
        },
      },
    ],
    product_image_before_logo: {
      type: Object,
    },
    product_sizes: [
      {
        size: {
          type: String,
        },
        type: {
          type: String,
        },
      },
    ],
    product_material_tittle: {
      type: String,
    },
    product_material: [
      {
        tittle: {
          type: String,
        },
        material: {
          type: String,
        },
        qty_price: {
          price: {
            type: Number,
          },
          qty: {
            type: Number,
          },
        },
      },
    ],
    product_shapes: [
      {
        shapes: [{ type: String }],
        sizes: [{ type: String }],
      },
    ],
    product_categories: [
      {
        type: String,
        required: true,
      },
    ],
    product_gender: {
      type: String,
    },
    product_video: [
      {
        type: String,
      },
    ],
    product_orientation: [
      {
        type: String,
      },
    ],
    product_discount: {
      type: Number,
      default: 0,
    },
    totalStock: {
      type: Number,
      default: 0,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_price_qty: [
      {
        price: {
          type: Number,
        },
        qty: {
          type: Number,
        },
      },
    ],
    product_logo_location: [
      {
        type: String,
      },
    ],

    product_length: {
      type: Number,
      required: true,
    },
    product_breadth: {
      type: Number,
      required: true,
    },
    product_height: {
      type: Number,
      required: true,
    },
    product_weight: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
