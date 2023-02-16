const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.get("/", controller.getAllBenevoles);
router.get("/:id", controller.getBenevoleById);
router.post("/", controller.createBenevole);
router.put("/:id", controller.updateBenevole);
router.delete("/:id", controller.deleteBenevole);
// Using the creneaux
router.get("/creneau/:creneau", controller.getBenevoleByCreneau);
router.get("/zone/:id", controller.getBenevoleByZoneId);


module.exports = router;