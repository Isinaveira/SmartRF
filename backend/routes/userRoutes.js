// Rutas
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/', userController.createUser);                  // Crear un usuario
router.get('/', userController.getUsers);                     // Listar todas los usuarios de la BD
router.delete('/:dni', userController.deleteUser);             // Metodo para borrar un usuario de la BD
router.get('/:dni', userController.getUser);                   // Mostrar un usuario por su dni
router.put('/:dni', userController.updateUser);                // Actualizar
module.exports = router;