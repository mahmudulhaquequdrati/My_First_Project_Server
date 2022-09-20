const express = require("express");
const productController = require("../controllers/product");
const router = express.Router();

router
  .route("/")
  .get(productController.getAllProduct)
  .post(productController.createNewProduct)
  .patch(productController.updateProduct);

router.delete("/:id", productController.deleteProduct);
router.get("/single", productController.getSingleProduct);

module.exports = router;
