const express = require("express");
const userController = require("../controllers/user");
const checkLogin = require("../middleware/checkLogin");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();
const User = require("../models/User");
router.route("/").post(userController.createNewUser);

// router.use(verifyJWT);
router.route("/").get(userController.getAllUsers);
router.get("/single", userController.getSingleUser);
router.post("/signin", userController.loginHandle);
// Check Login or not
router.get("/profile", checkLogin, async (req, res) => {
  try {
    const userData = await User.findOne({
      _id: req.userId,
      email: req.email,
    }).select('-password')
    if (userData) {
      res.status(200).json({
        userData,
      });
    } else {
      res.status(404).json({
        error: "User not found",
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.use(verifyJWT);
router.route("/").patch(userController.updateUser);
router.route("/").delete(userController.deleteUser);

module.exports = router;
