import { io } from "./server.js";

function emitMessage(message) {
  io.emit("mqtt_message", {
    message: message.toString(),
  });
}

module.exports = {
  emitMessage,
};
