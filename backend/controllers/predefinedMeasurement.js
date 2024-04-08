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