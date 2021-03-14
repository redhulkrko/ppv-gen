const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

// get all products
router.get("/", productController.getProductList);

// get product by ID
router.get("/:id", productController.getProductByID);

// create new product
router.post("/", productController.createNewProduct);

// update product
router.put("/:id", productController.updateProduct);

// delete product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
