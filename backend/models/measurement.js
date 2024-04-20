const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  name: { type: String },
  dni_user: { type: String, required: true},
  type: {
    isConstellation: { type: Boolean, required: true },
    id: { type: String, required: true }
  },
  freqIni: { type: Number, required: true },
  freqFinal: { type: Number, required: true },
  threshold: { type: String, required: true },
  t_capt: { type: Number, required: true },
  chanBW: { type: Number, required: true },
  nfft: { type: Number, required: true },
  mode: { type: String, required: true },
  startedAt: { type: String, required: true },

});

const Measurement = mongoose.model(
  "Measurement",
  measurementSchema,
  "Measurements"
);

module.exports = Measurement;
