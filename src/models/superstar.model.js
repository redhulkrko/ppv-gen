var dbConn = require("../../config/db.config");

var Superstar = function (superstar) {
  this.first_name = superstar.first_name;
  this.last_name = superstar.last_name;
  this.email = superstar.email;
  this.phone = superstar.phone;
  this.organization = superstar.organization;
  this.designation = superstar.designation;
  this.salary = superstar.salary;
  this.status = superstar.status ? superstar.status : 1;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all superstars
Superstar.getAllSuperstars = (result) => {
  let myquery = "SELECT * FROM superstars WHERE 1 = 1";

  let params = {};

  console.log(result);

  if (req.query["overall_from"]) {
    myquery += "AND superstar_overall >= :overall_from";
    params.overall_from = req.query["overall_from"];
  }
  if (req.query["overall_to"]) {
    myquery += "AND superstar_overall <= :overall_to";
    params.overall_to = req.query["overall_to"];
  }

  dbConn.query(myquery, params, (err, res) => {
    if (err) {
      console.log("Error while fetching employess", err);
      result(null, err);
    } else {
      console.log("Superstars fetched successfully");
      result(null, res);
    }
  });
};

// get superstar by ID from DB
Superstar.getSuperstarByID = (id, result) => {
  dbConn.query("SELECT * FROM superstars WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching superstar by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// create new superstar
Superstar.createSuperstar = (superstarReqData, result) => {
  dbConn.query(
    "INSERT INTO superstars SET ? ",
    superstarReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("Superstar created successfully");
        result(null, res);
      }
    }
  );
};

// update superstar
Superstar.updateSuperstar = (id, superstarReqData, result) => {
  dbConn.query(
    "UPDATE superstars SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?",
    [
      superstarReqData.first_name,
      superstarReqData.last_name,
      superstarReqData.email,
      superstarReqData.phone,
      superstarReqData.organization,
      superstarReqData.designation,
      superstarReqData.salary,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the superstar");
        result(null, err);
      } else {
        console.log("Superstar updated successfully");
        result(null, res);
      }
    }
  );
};

// delete superstar
Superstar.deleteSuperstar = (id, result) => {
  // dbConn.query('DELETE FROM superstars WHERE id=?', [id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the superstar');
  //         result(null, err);
  //     }else{
  //         result(null, res);
  //     }
  // })
  dbConn.query(
    "UPDATE superstars SET is_deleted=? WHERE id = ?",
    [1, id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the superstar");
        result(null, err);
      } else {
        console.log("Superstar deleted successfully");
        result(null, res);
      }
    }
  );
};

module.exports = Superstar;
