const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema({
  name: { type: String },
  dni_user: { type: String},
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
  startedAt: { type: Date, default: Date.now() },
  finishedAt: { type: Date },
});

const Measurement = mongoose.model(
  "Measurement",
  measurementSchema,
  "Measurements"
);

module.exports = Measurement;

/*
export interface Measurement {
    name: string,
    user_id: string, 
    type: {
        isConstellation: true,
        id: string
    }, 
    freqIni: number,
    freqFinal: number 
    threshold: string
    t_capt: number
    chanBW: number
    nfft: number
    mode: string
    startedAt: Date // se llena cuando la medición empieza
    finishedAt: Date // cuando la medición termina
}

*/