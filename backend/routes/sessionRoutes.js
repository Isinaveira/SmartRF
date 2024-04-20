const express = require("express");
const router = express.Router();
const sessionsController = require("../controllers/sessionsController");

// router.post("", sessionsController.createSessions);
router.get("/:id", sessionsController.getLastSession);

module.exports = router;
