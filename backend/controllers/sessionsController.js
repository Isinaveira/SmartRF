const Session = require("../models/session"); // Adjust the path as necessary

(exports.getLastSession = async (req, res) => {
  try {
    // Extract the device ID from the request parameters
    const deviceId = String(req.params.id);

    // Find the most recent session for the given device ID
    const session = await Session.findOne({ id_device: deviceId }).sort({
      date: -1,
    });

    // If no session is found, return a 404 error
    if (!session) {
      return res
        .status(404)
        .send("Session not found for device ID: " + deviceId);
    }

    // Otherwise, return the found session
    res.json(session);
  } catch (error) {
    // Handle possible errors
    res.status(500).send(error.message);
  }
}),
  (exports.getSamplesMeasurement = async (req, res) => {
    try {
      const samples = await Session.find({
        measurement_id: req.params.measurement_id,
      });
      console.log(samples);
      res.json(samples);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
