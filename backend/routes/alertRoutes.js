// Rutas
const express = require("express");
const router = express.Router();
const alertsController = require("../controllers/alertsController");

router.post("", alertsController.createAlert); 
router.get("", alertsController.getAlerts); 
router.delete("/:name", alertsController.deleteAlert); 

module.exports = router;