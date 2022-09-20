const express = require("express");
const router = express.Router();
const loginLimiter = require("../middleware/loginLimier");
const authController = require("../controllers/authController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);

router.route("/refresh").get(authController.refresh);
router.route("/").post(loginLimiter, authController.login);
router.route("/logout").post(authController.logout);

module.exports = router;
