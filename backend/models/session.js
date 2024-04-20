const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  measurement_id: { type: String, required: true },
  id_device: { type: String, required: true },
  date: { type: String, required: true },
  results: { type: String, required: true },
  threshold: { type: String, required: true },

});

const Session = mongoose.model(
  "Session",
  sessionSchema,
  "Sessions"
);

module.exports = Session;