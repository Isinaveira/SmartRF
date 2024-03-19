const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mqtt = require('mqtt'); // Import the MQTT library
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const constellationRoutes = require("./routes/constellationRoutes");
const socketIo = require('socket.io'); // Import the socket.io library
const client = require('./mqttClient');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  },
});
// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/Prueba')
  .then(() => console.log('Conexión a MongoDB exitosa.'))
  .catch((err) => console.error('Error al conectar a MongoDB:', err));

// MQTT Setup
const brokerUrl = 'mqtt://192.168.1.103:1883'; // Replace with your MQTT broker URL
const options = {
  clientId: '1222', // Replace with a unique client ID
};




const mqttTopics = {
  prueba: {
    topic: 'prueba',
    message: ''
  },
  configuration: {
    topic: 'config',
    message: ''
  }
}; // Replace with the MQTT topic you want to subscribe to

// Subscribe to the MQTT topic
client.subscribe(mqttTopics.prueba.topic);

// Handle incoming MQTT messages
client.on('message', (receivedTopic, message) => {
  // Emit the MQTT message to all connected WebSocket clients
  io.emit('mqtt_message', {
    topic: receivedTopic,
    message: message.toString()
  });

  // Additional processing if needed
  console.log(`Received MQTT message on topic ${receivedTopic}: ${message.toString()}`);
});

// Handle MQTT connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
});

// Handle MQTT disconnection events
client.on('close', () => {
  //console.log('Disconnected from MQTT broker');
});
io.on('connection', (socket) => {
  console.log('A user connected');

  // Additional socket.io event handling goes here
});

module.exports = {
  client: client,
  io: io
};


// Rutas para los controladores
app.use("/users", userRoutes);
app.use("/devices", deviceRoutes);
app.use("/constellations", constellationRoutes);
app.use("/measurements", measurementRoutes);

app.listen(PORT, () => {
  console.log('Successful server initialization!');
  console.log(`Server is running on port ${PORT}`);
});
server.listen(4000, () => {
  console.log("Websocket server running");
});