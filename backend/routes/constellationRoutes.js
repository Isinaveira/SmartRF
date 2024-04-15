const express = require("express");
const router = express.Router();
const constellationsController = require("../controllers/constellationsController");

router.post("", constellationsController.createConstellation); 
router.get("", constellationsController.getConstellations); 
router.delete("/:constellation_id", constellationsController.deleteConstellation); 
router.get("/:constellation_id", constellationsController.getConstellation); 
// router.put("edit/:constellation_id",constellationsController.updateConstellation); 

module.exports = router;
