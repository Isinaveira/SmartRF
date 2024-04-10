const mongoose = require("mongoose");

const predefinedMeasurement = new mongoose.Schema({
  name: { type: String, require: true },
  freqIni: { type: Number, required: true },
  freqFinal: { type: Number, required: true },
  // threshold: { type: String, required: true },
  // t_capt: { type: Number, required: true },
  // chanBW: { type: Number, required: true },
  // nfft: { type: Number, required: true },
  // mode: { type: String, required: true },
});

const PredefinedMeasurement = mongoose.model(
  "PredefinedMeasurement",
  predefinedMeasurement,
  "PredefinedMeasurements"
);

module.exports = PredefinedMeasurement;
