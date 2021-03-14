const ProductModel = require("../models/product.model");

// get all product list
exports.getProductList = (req, res) => {
  //console.log('here all products list');
  ProductModel.getAllProducts(req, (err, products) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log(req.query.price_from);
    console.log(req.query.price_to);
    console.log("Products", products);
    res.send(products);
  });
};

// get product by ID
exports.getProductByID = (req, res) => {
  //console.log('get product by id');
  ProductModel.getProductByID(req.params.id, (err, product) => {
    if (err) res.send(err);
    console.log("single product data", product);
    res.send(product);
  });
};

// create new product
exports.createNewProduct = (req, res) => {
  const productReqData = new ProductModel(req.body);
  console.log("productReqData", productReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    ProductModel.createProduct(productReqData, (err, product) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Product Created Successfully",
        data: product.insertId,
      });
    });
  }
};

// update product
exports.updateProduct = (req, res) => {
  const productReqData = new ProductModel(req.body);
  console.log("productReqData update", productReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    ProductModel.updateProduct(
      req.params.id,
      productReqData,
      (err, product) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Product updated Successfully" });
      }
    );
  }
};

// delete product
exports.deleteProduct = (req, res) => {
  ProductModel.deleteProduct(req.params.id, (err, product) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Product deleted successully!" });
  });
};
