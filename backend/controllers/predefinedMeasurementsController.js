const PredefinedMeasurement = require("../models/predefinedMeasurement");
const bcrypt = require("bcrypt");

exports.getPredefinedMeasurements = async (req, res) => {
    try {
      let predefinedMeasurements = await PredefinedMeasurement.find({});
        console.log(predefinedMeasurements);
      if (!predefinedMeasurements) {
        res.status(404).json({
          msg: "No se ha encontrado el user en la BD, inténtelo de nuevo.",
        });
      } else if (predefinedMeasurements) {
        res.json(predefinedMeasurements);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Se ha producido un error en el servidor.");
    }
  };


  exports.getPredefinedMeasurement = async (req, res) => {
    try {
      let predefinedMeasurement = await PredefinedMeasurement.findOne({ name: req.params.name });
  
      if (!predefinedMeasurement) {
        res.status(404).json({
          msg: "No se ha encontrado la medida en la BD, inténtelo de nuevo.",
        });
      } else if (predefinedMeasurement) {
        res.json(predefinedMeasurement);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Se ha producido un error en el servidor.");
    }
  };