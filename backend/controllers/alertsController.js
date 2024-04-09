const Alert = require("../models/alerts");

exports.createAlert = async (req, res) => {
  try {

    const newAlert = Alert(req.body);

    await newAlert.save();

    res.json(newAlert);
  } catch (error) {
   
    res.status(400).json({ error: error.message });
  }
};



exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    console.log(alerts);
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.deleteAlert = async (req, res) => {
  try {
    const alert = await Alert.findOneAndDelete({ name: req.params.name });
    res.json(alert);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

