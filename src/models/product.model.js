var dbConn = require("../../config/db.config");

var Product = function (product) {
  this.first_name = product.first_name;
  this.last_name = product.last_name;
  this.email = product.email;
  this.phone = product.phone;
  this.organization = product.organization;
  this.designation = product.designation;
  this.salary = product.salary;
  this.status = product.status ? product.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all products
Product.getAllProducts = (result) => {
  let myquery = "SELECT * FROM products WHERE 1 = 1";

  let params = {};

  console.log(result);

  if (req.query["price_from"]) {
    myquery += "AND price >= :price_from";
    params.price_from = req.query["price_from"];
  }
  if (req.query["price_to"]) {
    myquery += "AND price <= :price_to";
    params.price_to = req.query["price_to"];
  }

  dbConn.query(myquery, params, (err, res) => {
    if (err) {
      console.log("Error while fetching employess", err);
      result(null, err);
    } else {
      console.log("Products fetched successfully");
      result(null, res);
    }
  });
};

// get product by ID from DB
Product.getProductByID = (id, result) => {
  dbConn.query("SELECT * FROM products WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching product by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// create new product
Product.createProduct = (productReqData, result) => {
  dbConn.query("INSERT INTO products SET ? ", productReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Product created successfully");
      result(null, res);
    }
  });
};

// update product
Product.updateProduct = (id, productReqData, result) => {
  dbConn.query(
    "UPDATE products SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      productReqData.first_name,
      productReqData.last_name,
      productReqData.email,
      productReqData.phone,
      productReqData.organization,
      productReqData.designation,
      productReqData.salary,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the product");
        result(null, err);
      } else {
        console.log("Product updated successfully");
        result(null, res);
      }
    }
  );
};

// delete product
Product.deleteProduct = (id, result) => {
  // dbConn.query('DELETE FROM products WHERE id=?', [id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the product');
  //         result(null, err);
  //     }else{
  //         result(null, res);
  //     }
  // })
  dbConn.query(
    "UPDATE products SET is_deleted=? WHERE id = ?",
    [1, id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the product");
        result(null, err);
      } else {
        console.log("Product deleted successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Product;
