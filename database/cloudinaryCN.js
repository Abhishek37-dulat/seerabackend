const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDNIARY_NAME,
  api_key: process.env.CLOUDNIARY_KEY,
  api_secret: process.env.CLOUDNIARY_SECRET,
});

module.exports = cloudinary;
