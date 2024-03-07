const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Prueba', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Conexión a MongoDB exitosa.'))
        .catch(err => console.error('Error al conectar a MongoDB:', err));


app.listen(PORT, () => {
    console.log('Successful server initialization!')
    console.log(`Server is running on port ${PORT}`);
  });

// Rutas para los controladores
app.use("/", userRoutes);