const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    // Obtener la contraseña del cuerpo de la solicitud
    const { password } = req.body;

    // Encriptar la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Reemplazar la contraseña sin encriptar por la encriptada
    });

    // Guardar el nuevo usuario en la base de datos
    await newUser.save();

    // Enviar la respuesta con el nuevo usuario creado
    res.json(newUser);
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    res.status(400).json({ error: error.message });
  }
};

// Método para obtener un usuario
exports.getUser = async (req, res) => {
  try {
    let user = await User.findOne({ dni: req.params.dni });

    if (!user) {
      res.status(404).json({
        msg: "No se ha encontrado el user en la BD, inténtelo de nuevo.",
      });
    } else if (user) {
      res.json(user);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Se ha producido un error en el servidor.");
  }
};

// Get all todos
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update all by ID
exports.updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // Verificar si se ha proporcionado una nueva contraseña
    if (password != null) {
      // Encriptar la nueva contraseña antes de actualizar el usuario
      const hashedPassword = await bcrypt.hash(password, 10);
      // Actualizar la contraseña en los datos a actualizar
      updateData.password = hashedPassword;
    }

    const user = await User.findOneAndUpdate(
      { dni: req.params.dni },
      updateData,
      { new: true }
    );

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

    // Buscar el usuario en la base de datos por su número de DNI
    const user = await User.findOne({ dni: dni });

    if (!user) {
      // Si no se encuentra ningún usuario con el DNI proporcionado, devolver un mensaje de error
      return res.status(200).json({ success: "No user found" });
    } else {
      // Si se encuentra el usuario, comparar la contraseña introducida con el hash almacenado en la base de datos
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          // Si la contraseña coincide, devolver un mensaje de éxito
          return res.status(200).json({ success: true });
        } else {
          // Si la contraseña no coincide, devolver un mensaje de error
          return res.status(200).json({ success: false });
        }
      });
    }
  } catch (error) {
    // Manejar cualquier error que ocurra durante el proceso
    res.status(400).json({ error: error.message });
  }
};
