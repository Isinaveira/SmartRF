const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurementsController');

router.post('', measurementsController.startMeasurement);                  // Crear un usuario
/*
router.get('', measurementsController.getConstellations);                     // Listar todas los usuarios de la BD
router.delete('/:name', measurementsController.deleteConstellation);             // Metodo para borrar un usuario de la BD
router.get('/:name', measurementsController.getConstellation);                   // Mostrar un usuario por su dni
router.put('/edit/:name', measurementsController.updateConstellation);                // Actualizar
*/
module.exports = router;

