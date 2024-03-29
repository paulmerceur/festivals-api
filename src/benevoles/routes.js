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
router.get("/:id/festivals", controller.getFestivalsByBenevoleId);
router.get("/:benevoleId/festivals/:festivalIds", controller.getAffectationsByBenevoleIdAndFestivalId);
router.post("/:benevoleId/festival/:festivalId", controller.affecterBenevole);



module.exports = router;