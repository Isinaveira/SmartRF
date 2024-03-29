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

function clientPublisher(message, topic) {
  if (typeof message !== "string" || !message.trim()) {
    throw new Error("Message must be a non-empty string");
  }

  if (typeof topic !== "string" || !topic.trim()) {
    throw new Error("Topic must be a non-empty string");
  }

  mqttClient.publish(topic, message, (err) => {
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
