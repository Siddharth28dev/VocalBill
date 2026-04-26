const Product = require("../models/Product");

const getAllProducts = async () => {
  return await Product.find().lean();
};

const getProductByName = async (name) => {
  return await Product.findOne({ name: name.toLowerCase() });
};

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

module.exports = {
  getAllProducts,
  getProductByName,
  createProduct
};