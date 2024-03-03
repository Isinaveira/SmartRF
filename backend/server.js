const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Prueba', { useNewUrlParser: true, useUnifiedTopology: true });

const userController = require('./controllers/userController');

app.post('/createUser', userController.createUser);
app.get('/retreiveUsers', userController.getUsers);
app.put('/updateUser/:name', userController.updateUser);
app.delete('/deleteUserbyName/:name', userController.deleteUser);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });