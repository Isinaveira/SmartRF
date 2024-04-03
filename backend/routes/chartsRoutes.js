// Rutas
const express = require("express");
const router = express.Router();
const measurementsController = require("../controllers/measurementsController");

router.get("/charts/:startDate/:finishDate", measurementsController.getChartsMeasuresByDate);

module.exports = router;