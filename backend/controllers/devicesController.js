const Device = require('../models/device');


exports.createDevice = async (req, res) => {
    try {
      console.log(req.body);
      const newDevice = new Device(req.body);
      await newDevice.save();
      res.json(newDevice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Método para obtener un usuario

  exports.getDevice = async (req, res) => {

    try {
  
      let device = await Device.findOne({ _id: req.params._id })
  
      if (!device) {
        res.status(404).json({ msg: 'No se ha encontrado el user en la BD, inténtelo de nuevo.' })
      }else if(device){
  
      res.json(device);
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Se ha producido un error en el servidor.');
    }
  
  }
  
  // Get all todos
  exports.getDevices = async (req, res) => {
    try {
      const devices = await Device.find();
      console.log(devices)
      res.json(devices);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update all by name
  exports.updateDevice = async (req, res) => {
    try {
      const device = await Device.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
      res.json(device);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete all by name
  exports.deleteDevice = async (req, res) => {
    try {
      const device = await Device.findOneAndDelete({ _id: req.params._id });
      res.json(device);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };