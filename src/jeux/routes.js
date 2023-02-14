const controller = require("./controller");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Call controller
app.get("/", controller.getAllJeux);
app.get("/:id", controller.getJeuById);
app.post("/", controller.createJeu);
app.put("/:id", controller.updateJeu);
app.delete("/:id", controller.deleteJeu);
app.get("/benevole/:id", controller.getJeuxByBenevole);
app.get("/zone/:id", controller.getJeuxByZone)


module.exports = app;