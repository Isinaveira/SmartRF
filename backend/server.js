const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require("./routes/userRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const measurementRoutes = require("./routes/measurementRoutes");
const constellationRoutes = require("./routes/constellationRoutes");
const predefinedMeasurementRoutes = require("./routes/predefinedMeasurementsRoutes");
const alertRoutes = require("./routes/alertRoutes");
const documentationRoutes = require("./routes/documentationRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const imageRoutes = require("./routes/imageRoutes");
const {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
} = require("./mqttActions");

// Middleware
app.use(cors());
// app.use(express.json({ limit: "5000mb" }));
// app.use(express.urlencoded({ limit: "5000mb", extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/SmartRF")
  .then(() => console.log("Conexión a MongoDB exitosa."))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

const server = http.createServer(app);

// Setup MQTT and Socket.io
const initial_topic = ["station_id_sub_1"];

clientSubscriber(initial_topic);

const io = setupSocketIO(server);

// Rutas para los controladores
app.use("/users", userRoutes);
app.use("/devices", deviceRoutes);
app.use("/constellations", constellationRoutes);
app.use("/measurements", measurementRoutes);
app.use("/alerts", alertRoutes);
app.use("/predefinedMeasurements", predefinedMeasurementRoutes);
app.use("/documentations", documentationRoutes);
app.use("/sessions", sessionRoutes);
app.use("/image", imageRoutes);

app.listen(PORT, () => {
  console.log("Successful server initialization!");
  console.log(`Server is running on port ${PORT}`);
});

server.listen(4000, () => {
  console.log("Websocket server running");
});

module.exports = io;
