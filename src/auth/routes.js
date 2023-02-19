const express = require("express");
const cors = require('cors');
const router = express.Router();
const controller = require("./controller");

// Middleware
router.use(cors());
router.use(express.json());

// Call controller
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);


module.exports = router;