const express = require("express");
const router = express.Router();
const predefinedMeasurementsController = require("../controllers/predefinedMeasurementsController");

router.get("", predefinedMeasurementsController.getPredefinedMeasurements); // Listar todas los usuarios de la BD

module.exports = router;