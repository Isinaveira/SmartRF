const socketIo = require('socket.io');
const client = require('./mqttClient');

let io;

function setupSocketIO(server) {
  io = socketIo(server, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Additional socket.io event handling goes here
  });

  return io;
}

function setupMQTT() {
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
}

module.exports = {
  setupSocketIO,
  setupMQTT
};
