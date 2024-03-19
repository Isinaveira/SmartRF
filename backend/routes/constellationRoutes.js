const express = require('express');
const router = express.Router();
const constellationsController = require('../controllers/constellationsController');


router.post('/constellations', constellationsController.createConstellation);                  // Crear un usuario
router.get('/constellations', constellationsController.getConstellations);                     // Listar todas los usuarios de la BD
router.delete('/constellations/:name', constellationsController.deleteConstellation);             // Metodo para borrar un usuario de la BD
router.get('/constellations/:name', constellationsController.getConstellation);                   // Mostrar un usuario por su dni
router.put('/constellations/edit/:name', constellationsController.updateConstellation);                // Actualizar


module.exports = router;