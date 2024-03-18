const User = require('../models/user');


exports.createUser = async (req, res) => {
    try {
      console.log(req.body);
      const newUser = new User(req.body);
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Método para obtener un usuario
  exports.getUser = async (req, res) => {

    try {
  
      let user = await User.findOne({ dni: req.params.dni })
  
      if (!user) {
        res.status(404).json({ msg: 'No se ha encontrado el user en la BD, inténtelo de nuevo.' })
      }else if(user){
  
      res.json(user);
      }
  
    } catch (error) {
      console.log(error);
      res.status(500).send('Se ha producido un error en el servidor.');
    }
  
  }
  
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
  
  // Update all by ID
  exports.updateUser = async (req, res) => {
    try {
      const user = await User.findOneAndUpdate({ dni: req.params.dni }, req.body, { new: true });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // Delete all by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findOneAndDelete({ dni: req.params.dni });
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  exports.checkUser = async (req, res) => {
    try {
      const { dni, password } = req.params;
      // Replace the following line with your actual logic to check user in the database
      const user = await User.findOne({ dni: dni });
      
      if (!user) {
        res.status(200).json({ success: 'No user found' });
      }else if (user.password === password) {
        res.status(200).json({ success: true });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };