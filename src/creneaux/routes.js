const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.get("/", controller.getAllCreneaux);
router.get("/:id", controller.getCreneauById);
router.post("/", controller.createCreneau);
router.put("/:id", controller.updateCreneau);
router.delete("/:id", controller.deleteCreneau);
router.post("/festival", controller.createCreneauxForFestival);

module.exports = router;