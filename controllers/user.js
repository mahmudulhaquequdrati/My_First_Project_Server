const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

/* ============DONE========= */
// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").lean();
  if (!users) {
    return res.status(400).json({
      message: "No Users found!",
    });
  }
  res.status(200).json({
    message: "All user loaded",
    data: users,
  });
});

const getSingleUser = asyncHandler(async (req, res) => {
  const data = await User.findById(req.body.id);
  if (!data) {
    return res.status(404).json({
      message: "User not found!",
    });
  }
  res.status(200).json(data);
});
/* ============DONE========= */
// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
  const { email, password, fullname, avatar } = req.body;
  if (!email || !password || !fullname) {
    return res.status(400).json({
      message: "Email, Password and fullname fields are required!",
    });
  }
  // Check for existing
  const existing = await User.findOne({ email }).lean();
  if (existing) {
    return res.status(409).json({ message: "User alredy registerd!" });
  }
  const hashedPassword = await bcrypt.hash(password, 12); // Salt Rounds
  const userObject = { email, password: hashedPassword, avatar, fullname };
  // Create And Store new user
  const user = await User.create(userObject);
  if (user) {
    // Created
    res.status(201).json({
      status: 201,
      message: `${email} registration done!`,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data reveived!",
    });
  }
});

/* ============PROCESSING========= */
// @desc Update a User
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {});

/* ============DONE========= */
// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      message: "User ID required!",
    });
  }
  const user = await User.findByIdAndDelete({ _id: id }).select("-password");
  if (!user) {
    return res.status(400).json({
      message: "User not found!",
    });
  }
  res.status(200).json({
    data: user,
    message: "User deleted!",
  });
});

module.exports = {
  getSingleUser,
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
