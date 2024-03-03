const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;