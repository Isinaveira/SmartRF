const express = require("express");
const router = express.Router();
const predefinedMeasurementsController = require("../controllers/predefinedMeasurementsController");

router.get("", predefinedMeasurementsController.getPredefinedMeasurements); 
router.get("/:name", predefinedMeasurementsController.getPredefinedMeasurement); 

module.exports = router;