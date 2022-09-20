const Product = require("../models/product");
const asyncHandler = require("express-async-handler");
const { Cursor } = require("mongoose");
/* ============DONE========= */
// @desc Get all users
// @route GET /users
// @access Private
const getAllProduct = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const currentPage = req.query.page || 1;
  const products = await Product.find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  const productNum = await Product.countDocuments();
  res.setHeader("max-records", productNum);
  res.status(200).json({
    data: products,
  });
});

/* ============DONE========= */
// @desc Create new user
// @route POST /users
// @access Private
const getSingleProduct = asyncHandler(async (req, res) => {
  console.log(req.body.id);
  const data = await Product.findById(req.body.id);
  if (!data) {
    return res.status(404).json({
      message: "Product not found!",
    });
  }
  res.status(200).json(data);
});
const createNewProduct = asyncHandler(async (req, res) => {
  const { thumbnail, shoeName, retailPrice, description, releaseDate, brand } =
    req.body;
  if (!thumbnail || !shoeName || !retailPrice || !description || !brand) {
    return res.status(403).json({
      message: "All fields are required!",
    });
  }
  // const productObject = { email, password, avatar, fullname };
  // Create And Store new user
  const product = await Product.create(req.body);
  if (product) {
    // Created
    res.status(201).json({
      status: 200,
      data: product,
    });
  } else {
    res.status(400).json({
      message: "Invalid Product data reveived!",
    });
  }
});

/* ============PROCESSING========= */
// @desc Update a User
// @route PATCH /users
// @access Private
const updateProduct = asyncHandler(async (req, res) => {});

/* ============DONE========= */
// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete({ _id: req.params.id });
  if (!product) {
    return res.status(400).json({
      message: "Product not found!",
    });
  }
  res.status(200).json({
    data: product,
    message: "Product deleted!",
  });
});

module.exports = {
  getAllProduct,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
