// Rutas
const express = require("express");
const router = express.Router();
const measurementsController = require("../controllers/measurementsController");

router.get("", measurementsController.getMeasurement);

module.exports = router;