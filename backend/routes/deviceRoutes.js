const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devicesController");

router.get("",devicesController.getDevices)
// Ruta para obtener un dispositivo por station_id
router.get("/:station_id", devicesController.getDevice);

// Ruta para eliminar un dispositivo por station_id
router.delete("/:station_id", devicesController.deleteDevice);

// Ruta para actualizar un dispositivo por station_id
router.put("/edit/:station_id", devicesController.updateDevice);

module.exports = router;
