const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurementsController');

router.post('/measurements', measurementsController.startMeasurement);                  // Crear un usuario
//router.get('/measurements', measurementsController.getConstellations);                     // Listar todas los usuarios de la BD
//router.delete('/measurements/:name', measurementsController.deleteConstellation);             // Metodo para borrar un usuario de la BD
//router.get('/measurements/:name', measurementsController.getConstellation);                   // Mostrar un usuario por su dni
//router.put('/measurements/edit/:name', measurementsController.updateConstellation);                // Actualizar


module.exports = router;