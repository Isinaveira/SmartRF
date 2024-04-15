const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  station_id: { type: Number, required: true },
  type_alert: { type: String, required: true },
  channel_number: { type: Number, required: true},
  dni: {type: String, required: true}
  
});

const Alert = mongoose.model(
  "Alert",
  alertSchema,
  "Alerts"
);

module.exports = Alert;
