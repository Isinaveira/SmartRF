// Rutas
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/imageController");

router.post("", imageController.saveImage); // Crear un usuario

module.exports = router;
