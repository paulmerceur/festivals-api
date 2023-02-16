const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(express.json());
router.use(cors());

// Routes
router.get("/", controller.getAllZones);
router.get("/:id", controller.getZoneById);
router.post("/", controller.createZone);
router.put("/:id", controller.updateZone);
router.delete("/:id", controller.deleteZone);

module.exports = router;