const controller = require("./controller");
const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Call controller
app.get("/", controller.getAllCreneaux);
app.get("/:id", controller.getCreneauById);
app.post("/", controller.createCreneau);
app.put("/:id", controller.updateCreneau);
app.delete("/:id", controller.deleteCreneau);


module.exports = app;