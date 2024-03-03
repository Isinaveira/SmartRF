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
      const todos = await Todo.find();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update a todo by ID
  exports.updateUser = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete a todo by ID
  exports.deleteUser = async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      res.json(todo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };