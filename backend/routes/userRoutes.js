// Rutas
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/users', userController.createUser);                  // Crear un usuario
router.get('/users', userController.getUsers);                     // Listar todas los usuarios de la BD
router.delete('/users/:dni', userController.deleteUser);             // Metodo para borrar un usuario de la BD
router.get('/users/:dni', userController.getUser);                   // Mostrar un usuario por su dni
router.put('/users/edit/:dni', userController.updateUser);                // Actualizar
router.put('/users/check/:dni/:password', userController.checkUser);

module.exports = router;