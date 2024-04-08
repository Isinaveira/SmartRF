const express = require("express");
const router = express.Router();
const constellationsController = require("../controllers/predefinedMeasurementsController");

router.post("", predefinedMeasurementsController.createPredefinedMeasurement); // Crear un usuario
router.get("", predefinedMeasurementsController.getPredefinedMeasurements); // Listar todas los usuarios de la BD

module.exports = router;