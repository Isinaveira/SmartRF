const Constellation = require("../models/constellation");

exports.createConstellation = async (req, res) => {
  try {
    console.log(req.body);
    const newConstellation = new Constellation(req.body);
    await newConstellation.save();
    res.json(newConstellation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un usuario

exports.getConstellation = async (req, res) => {
  try {
    let constellation = await Constellation.findOne({ constellation_id: req.params.constellation_id });
   
    if (!constellation) {
      res
        .status(404)
        .json({
          msg: "No se ha encontrado el user en la BD, inténtelo de nuevo.",
        });
    } else if (constellation) {
      res.json(constellation);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Se ha producido un error en el servidor.");
  }
};

// Get all todos
exports.getConstellations = async (req, res) => {
  try {
    const constellations = await Constellation.find();
    console.log(constellations);
    res.json(constellations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update all by name
exports.updateConstellation = async (req, res) => {
  try {
    const constellation = await Constellation.findOneAndUpdate(
      { name: req.params.constellation_id },
      req.body,
      { new: true }
    );
    res.json(constellation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete all by name
exports.deleteConstellation = async (req, res) => {
  try {
    const constellation = await Constellation.findOneAndDelete({
      constellation_id: req.params.constellation_id,
    });
    res.json(constellation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
