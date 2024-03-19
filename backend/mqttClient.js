const mqtt = require('mqtt');

const setupClient = () => {
  const brokerUrl = 'mqtt://192.168.1.140:1883';
  const options = {
    clientId: '1222',
  };
  return mqtt.connect(brokerUrl, options);
};

module.exports = setupClient();
