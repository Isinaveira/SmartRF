const mqtt = require("mqtt");

const brokerUrl = "mqtt://127.0.0.1:1883"; // Adjust as per your MQTT broker configuration

const client = mqtt.connect(brokerUrl);

//EVENTS HANDLERS

// Connection to broker

client.on("connect", () => {
  console.log("Connected to MQTT broker");
});

//Reconnection to broker

client.on("reconnect", () => {
  console.log("Reconnected to the MQTT broker");
});

//Error Handling

client.on("error", (error) => {
  console.error("MQTT client error:", error);
});

//Message receiver handler

client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

module.exports = client;
