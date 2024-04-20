const mongoose = require("mongoose");

const constellationSchema = new mongoose.Schema({
  constellation_id: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: String, required: true},
  isActive: { type: Boolean, required: true },
  devices_list: [
    {
      type: mongoose.Schema.Types.String,
      ref: "Devices",
    },
  ],
});

const Constellation = mongoose.model(
  "Constellation",
  constellationSchema,
  "Constellations"
);





module.exports = Constellation;
