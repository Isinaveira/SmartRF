const express = require("express");
const router = express.Router();
const measurementsController = require("../controllers/measurementsController");

router.get("",measurementsController.getMeasurements);
router.post("/start", measurementsController.startMeasurement);
 router.post("/join", measurementsController.joinConstellation);
// router.post("/changeDefo", measurementsController.changeDefoParameters);
router.post("/stop", measurementsController.stopMeasurement); // Iniciar medición y guardarla
// router.get(":/id", measurementsController.getMeasurement);
router.get("/:name",measurementsController.getMeasurementByName);
router.get("/dni/:dni_user", measurementsController.getMyMeasurements);
// Listar todas los usuarios de la BD
/*
router.delete('/:name', measurementsController.deleteConstellation);             // Metodo para borrar un usuario de la BD
router.get('/:name', measurementsController.getConstellation);                   // Mostrar un usuario por su dni
router.put('/edit/:name', measurementsController.updateConstellation);                // Actualizar
*/
module.exports = router;
