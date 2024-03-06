const User = require('../models/user');


exports.createUser = async (req, res) => {
    try {
      const newuser = new User(req.body);
      await newuser.save();
      res.json(newuser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Get all todos
  exports.getUsers = async (req, res) => {
    try {
      const users = await User.find();
      console.log(users)
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a todo by ID
  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ name: req.params.name }, req.body, { new: true });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a todo by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ name: req.params.name });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };