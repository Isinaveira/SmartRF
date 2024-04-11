const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    required: true
  }
});

const Documentation = mongoose.model('Documentation', documentationSchema, 'Documentations');

module.exports = Documentation;
