const express = require("express");
const userController = require("../controllers/user");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.route("/").post(userController.createNewUser);

// router.use(verifyJWT);
router.get("/single", userController.getSingleUser);
router.use(verifyJWT);
router.route("/").get(userController.getAllUsers);
router.use(verifyJWT);
router.route("/").patch(userController.updateUser);
router.route("/").delete(userController.deleteUser);

module.exports = router;
