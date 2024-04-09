const express = require("express");
const router = express.Router();
const devicesController = require("../controllers/devicesController");

router.post("/", devicesController.createDevice); // Crear un usuario
router.get("/", devicesController.getDevices); // Listar todas los usuarios de la BD
router.delete("/:id", devicesController.deleteDevice); // Metodo para borrar un usuario de la BD
router.get("/:id", devicesController.getDevice); // Mostrar un usuario por su dni
router.put("/edit/:id", devicesController.updateDevice); // Actualizar

module.exports = router;
