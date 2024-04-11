const express = require('express');
const router = express.Router();
const documentationController = require('../controllers/documentationsController');

// Ruta para obtener toda la documentación
router.get('', documentationController.getAllDocumentation);

// Ruta para crear nueva documentación
router.post('', documentationController.createDocumentation);

// Ruta para eliminar documentación por ID
router.delete('/:id', documentationController.deleteDocumentation);

module.exports = router;
