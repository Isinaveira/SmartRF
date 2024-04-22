const express = require("express");
const router = express.Router();
const sessionsController = require("../controllers/sessionsController");

// router.post("", sessionsController.createSessions);
router.get("/:id", sessionsController.getLastSession);
router.get("/samples/:measurement_id", sessionsController.getSamplesMeasurement)

module.exports = router;
