const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.get("/", controller.getAllAffectations);
router.put("/:id", controller.updateAffectation);
router.delete("/:id", controller.deleteAffectation);


module.exports = router;