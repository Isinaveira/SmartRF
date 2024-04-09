const express = require("express");
const router = express.Router();
const constellationsController = require("../controllers/constellationsController");

router.post("", constellationsController.createConstellation); // Crear un usuario
router.get("", constellationsController.getConstellations); // Listar todas los usuarios de la BD
router.delete( "/:id", constellationsController.deleteConstellation); // Metodo para borrar un usuario de la BD
router.get("/:id", constellationsController.getConstellation); // Mostrar un usuario por su dni
router.put("edit/:id",
  constellationsController.updateConstellation
); 

module.exports = router;
