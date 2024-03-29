const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devicesController");

router.post("/devices", devicesController.createDevice); // Crear un usuario
router.get("/devices", devicesController.getDevices); // Listar todas los usuarios de la BD
router.delete("/devices/:id", devicesController.deleteDevice); // Metodo para borrar un usuario de la BD
router.get("/devices/:id", devicesController.getDevice); // Mostrar un usuario por su dni
router.put("/devices/edit/:id", devicesController.updateDevice); // Actualizar

module.exports = router;
