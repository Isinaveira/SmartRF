const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  station_id: { type: Number, required: true },
  type_alert: { type: String, required: true },
  channel_number: { type: Number, required: true}
  
});

const Alert = mongoose.model(
  "alert",
  alertSchema,
  "alerts"
);

module.exports = Alert;
