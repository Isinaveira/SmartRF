const mqtt = require("mqtt");
const webSocket = require("./webSocketEmitter");
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

/*
  MUST ADD FILTER TO CHECK FOR THE DIFFERENT TYPES OF MESSAGES 
    1º If it is a "hello" message then it must subscribe to a new topic (a new station)
    2ºIf it is a "sample" message the store it.
                
*/

client.on("message", (topic, message) => {
  let msg = JSON.stringify(message);
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  if (topic == "hello") {
    const resultString = "Station_sub_" + msg.id_device;
    client.subscribe(resultString);
    console.log("Subscribed to:", resultString);
  } else {
    webSocket.emitMessage(msg);
    console.log(msg);
  }
});

module.exports = client;
