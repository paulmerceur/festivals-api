const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.get("/:id/zones", controller.getZonesByFestival);
router.get("/", controller.getAllFestivals);
router.post("/", controller.createFestival);
router.delete("/:id", controller.deleteFestival);
router.get("/:id", controller.getFestivalById);
router.post("/:id/creneaux", controller.addCreneauxToFestival);
router.get("/:id/benevoles", controller.getBenevolesByFestival);
router.post("/:festivalId/benevoles/:benevoleId", controller.addBenevoleToFestival);





module.exports = router;