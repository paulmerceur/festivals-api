const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.get("/", controller.getAllJeux);
router.get("/:id", controller.getJeuById);
router.post("/", controller.createJeu);
router.put("/:id", controller.updateJeu);
router.delete("/:id", controller.deleteJeu);
router.get("/benevole/:id", controller.getJeuxByBenevole);
router.get("/zone/:id", controller.getJeuxByZone)


module.exports = router;