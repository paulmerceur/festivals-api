const controller = require("./controller");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Call controller
app.get("/", controller.getAllBenevoles);
app.get("/:id", controller.getBenevoleById);
app.post("/", controller.createBenevole);
app.put("/:id", controller.updateBenevole);
app.delete("/:id", controller.deleteBenevole);
// Using the creneaux
app.get("/creneau/:creneau", controller.getBenevoleByCreneau);
app.get("/zone/:id", controller.getBenevoleByZoneId);


module.exports = app;