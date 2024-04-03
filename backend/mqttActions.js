const socketIo = require("socket.io");
const mqttClient = require("./mqttClient");

let io;

//Creates a websocket

function setupSocketIO(server) {
  io = socketIo(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");
    // Additional socket.io event handling goes here
  });
  mqttClient.on("message", (topic, message) => {
    const msg = message.toString();
    io.emit("mqtt_message", { message: msg });
    console.log(`Emitted MQTT message: ${msg}`);
  });
  return io;
}

// Allows to subscribe to a new topic

function clientSubscriber(topics) {
  if (!Array.isArray(topics)) {
    throw new Error("Topics must be provided as an array");
  }

  topics.forEach((topic) => {
    mqttClient.subscribe(topic, (err) => {
      if (err) {
        console.error("Error subscribing to topic", topic, err);
      } else {
        console.log("Subscribed to topic:", topic);
      }
    });
  });
}

// Allows to publish to a specific topic

function clientPublisher(msg_type, message, topic) {
  if (typeof msg_type !== "string" || !msg_type.trim()) {
    throw new Error("msg_type must be a non-empty string");
  }

  if (!message || Array.isArray(message)) {
    throw new Error("message must be a non-null object");
  }

  if (typeof topic !== "string" || !topic.trim()) {
    throw new Error("topic must be a non-empty string");
  }

  const jsonMessage = {
    msg_type: msg_type,
    message: message,
  };

  mqttClient.publish(topic, JSON.stringify(jsonMessage), (err) => {
    if (err) {
      console.error("Error publishing message:", err);
    } else {
      console.log("Message published to topic:", topic);
    }
  });
}

module.exports = {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
};
