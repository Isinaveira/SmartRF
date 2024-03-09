const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt'); // Import the MQTT library

const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/Prueba')
  .then(() => console.log('Conexión a MongoDB exitosa.'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// MQTT Setup
const brokerUrl = 'mqtt://192.168.1.42:1883'; // Replace with your MQTT broker URL
const options = {
  clientId: '1222', // Replace with a unique client ID
  //username: 'your-username', // Replace with your MQTT broker username (if required)
  //password: 'your-password', // Replace with your MQTT broker password (if required)
};
const client = mqtt.connect(brokerUrl, options);

const mqttTopic = 'prueba'; // Replace with the MQTT topic you want to subscribe to

// Subscribe to the MQTT topic
client.subscribe(mqttTopic);

// Handle incoming MQTT messages
client.on('message', (receivedTopic, message) => {
  // Process the received MQTT message
  console.log(`Received MQTT message on topic ${receivedTopic}: ${message.toString()}`);
  // You can process the message and perform any necessary actions here
});

// Handle MQTT connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Handle MQTT disconnection events
client.on('close', () => {
  console.log('Disconnected from MQTT broker');
});

// Rutas para los controladores
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log('Successful server initialization!');
  console.log(`Server is running on port ${PORT}`);
});
