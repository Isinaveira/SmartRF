const Session = require("../models/session"); // Adjust the path as necessary

const sessionsController = {
  getLastSession: async (req, res) => {
    try {
      // Extract the device ID from the request parameters
      const deviceId = req.params.id;

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
  },
};

module.exports = sessionsController;
