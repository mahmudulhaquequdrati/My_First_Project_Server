const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

router.get("/", productController.getAllProduct);
router
  .route("/")
  .post(productController.createNewProduct)
  .patch(productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
