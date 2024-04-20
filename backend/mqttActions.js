const socketIo = require("socket.io");
const mqttClient = require("./mqttClient");
const crypto = require('crypto');
const fs = require('fs');
const Session = require("./models/session");


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
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
  
    
    validation = validateHashSignature(message);
    if(validation) {
      console.log(`Emitted MQTT message: ${msg}`);

      try {
        const msg= JSON.parse(message);
  
        const datos = msg.payload;
        const newSample= Session(datos);
    
         newSample.save();
    
       
      } catch (error) {
       
        console.log(error);
      }
      io.emit("mqtt_message", { message: msg });
    }
    
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


function validateHashSignature (message2validate){

  const public_key_pem = fs.readFileSync('./keys/public_key.pem');
  const public_key = crypto.createPublicKey(public_key_pem);
  
  // Cargar el mensaje firmado desde el archivo JSON
  const signed_message = JSON.parse(message2validate);
  
  // Extraer el mensaje original, hash y firma del mensaje firmado
  const original_message = signed_message.payload.results;
  const received_hash_hex = signed_message.hash;
  const signature_hex = signed_message.signature;
 
  // Serializar el JSON del mensaje original
  const json_string = JSON.stringify(original_message, Object.keys(original_message).sort());
  
  // Calcular el hash SHA-256 del mensaje original
  const digest = crypto.createHash('sha256');
  digest.update(json_string);
  const computed_hash_hex = digest.digest('hex');
  // Comparar el hash calculado con el hash recibido del mensaje firmado
  if (computed_hash_hex !== received_hash_hex) {
      console.log("Hash del mensaje no coincide. El mensaje puede haber sido alterado.");
     return false;
  }
  
  // Convertir la firma recibida de hexadecimal a bytes
  const signature = Buffer.from(signature_hex, 'hex');
  
  // Verificar la firma utilizando la clave pública
  try {
      const isVerified = crypto.verify(
          'sha256',
          Buffer.from(json_string, 'utf8'),
          {
              key: public_key,
              padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
              saltLength: crypto.constants.RSA_PSS_SALTLEN_AUTO
          },
          signature
      );
      if (isVerified) {
          console.log("La firma es válida. El mensaje es auténtico.");
          return true;
      } else {
          console.log("La firma no es válida. El mensaje puede haber sido alterado o la clave pública es incorrecta.");
          return false;
      }
  } catch (e) {
      console.log("Error al verificar la firma:", e.message);
      return false;
  }



}

module.exports = {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
};
