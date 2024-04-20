const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dni: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: String, required: true },
});

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;



