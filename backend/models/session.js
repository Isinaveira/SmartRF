const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  name: { type: String },
  dni_user: { type: String},
  id_measurement: { type: String },
  id_device: { type: String },
  date: { type: String },
  results: { type: String },
  threshold: { type: String },

});

const Session = mongoose.model(
  "Session",
  sessionSchema,
  "Sessions"
);

module.exports = Session;