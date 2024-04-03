const io = require("./server");
const socketIo = require("socket.io");

function emitMessage(message) {
  io.emit("mqtt_message", {
    message: message.toString(),
  });
}

module.exports = {
  emitMessage,
};
