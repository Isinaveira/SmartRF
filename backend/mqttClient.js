//mqttClient.js

const mqtt = require('mqtt');

const setupClient = () => {
  const brokerUrl = 'mqtt://127.0.0.1:1883';
  const options = {
    clientId: '1222',
  };
  
  const client = mqtt.connect(brokerUrl, options);


  client.publishMessage = function(topic, message) {
    return new Promise((resolve, reject) => {
      this.publish(topic, message, (err) => {
        if(err){
          reject(err);
        }else{
          resolve();
        }
      })
    })
  };

  return client
};

module.exports = setupClient();
