const mongoose = require('mongoose');

const constellationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt:  {type: Date, default: Date.now()},
  isActive: { type: Boolean, required: true },
  devices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device'
    }],
  password: { type: String, required: true },
});

const Constellation = mongoose.model('Constellation', userSchema, 'Constellations');

module.exports = Constellation;