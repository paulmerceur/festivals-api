const controller = require("./controller");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Call controller
app.get("/", controller.getAllZones);
app.get("/:id", controller.getZoneById);
app.post("/", controller.createZone);
app.put("/:id", controller.updateZone);
app.delete("/:id", controller.deleteZone);


module.exports = app;