const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  station_id: { type: String, required: true },
  coordinates: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  state: { type: String, required: true },
  last_lectureAt: { type: String, required: true },
});

const Device = mongoose.model("Device", deviceSchema, "Devices");

module.exports = Device;

