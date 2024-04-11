const Documentation = require('../models/documentation');

// Controlador para obtener toda la documentación
exports.getAllDocumentation = async (req, res) => {
  try {
    const documentation = await Documentation.find();
    res.json(documentation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear una nueva documentación
exports.createDocumentation = async (req, res) => {
  const documentation = new Documentation({
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  try {
    const newDocumentation = await documentation.save();
    res.status(201).json(newDocumentation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para eliminar una documentación
exports.deleteDocumentation = async (req, res) => {
  try {
    await Documentation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Documentation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
