//mqttClient.js

const mqtt = require('mqtt');

const setupClient = () => {
  const brokerUrl = 'mqtt://127.0.0.1:1883';
  const options = {
    clientId: '1222',
  };
  
  const client = mqtt.connect(brokerUrl, options);


  client.publishMessage = function(topic, message) {
    return this.publish(topic, message);
  };

  return client
};

module.exports = setupClient();
