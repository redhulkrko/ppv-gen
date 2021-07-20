const express = require("express");
const router = express.Router();

const superstarController = require("../controllers/superstar.controller");

// get all superstars
router.get("/", superstarController.getSuperstarList);

// get superstar by ID
router.get("/:id", superstarController.getSuperstarByID);

// create new superstar
router.post("/", superstarController.createNewSuperstar);

// update superstar
router.put("/:id", superstarController.updateSuperstar);

// delete superstar
router.delete("/:id", superstarController.deleteSuperstar);

module.exports = router;
