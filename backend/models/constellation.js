const mongoose = require("mongoose");

const constellationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  isActive: { type: Boolean, required: true },
  devices_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Devices",
    },
  ],
  password: { type: String, required: true },
});

const Constellation = mongoose.model(
  "Constellation",
  constellationSchema,
  "Constellations"
);

module.exports = Constellation;
