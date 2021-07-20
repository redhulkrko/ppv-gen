const SuperstarModel = require("../models/superstar.model");

// get all superstar list
exports.getSuperstarList = (req, res) => {
  //console.log('here all superstars list');
  SuperstarModel.getAllSuperstars((err, superstars) => {
    console.log("We are here");
    if (err) res.send(err);
    console.log("Superstars", superstars);
    res.send(superstars);
  });
};

// get superstar by ID
exports.getSuperstarByID = (req, res) => {
  //console.log('get superstar by id');
  SuperstarModel.getSuperstarByID(req.params.id, (err, superstar) => {
    if (err) res.send(err);
    console.log("single superstar data", superstar);
    res.send(superstar);
  });
};

// create new superstar
exports.createNewSuperstar = (req, res) => {
  const superstarReqData = new SuperstarModel(req.body);
  console.log("superstarReqData", superstarReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    SuperstarModel.createSuperstar(superstarReqData, (err, superstar) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Superstar Created Successfully",
        data: superstar.insertId,
      });
    });
  }
};

// update superstar
exports.updateSuperstar = (req, res) => {
  const superstarReqData = new SuperstarModel(req.body);
  console.log("superstarReqData update", superstarReqData);
  // check null
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    SuperstarModel.updateSuperstar(
      req.params.id,
      superstarReqData,
      (err, superstar) => {
        if (err) res.send(err);
        res.json({ status: true, message: "Superstar updated Successfully" });
      }
    );
  }
};

// delete superstar
exports.deleteSuperstar = (req, res) => {
  SuperstarModel.deleteSuperstar(req.params.id, (err, superstar) => {
    if (err) res.send(err);
    res.json({ success: true, message: "Superstar deleted successully!" });
  });
};
