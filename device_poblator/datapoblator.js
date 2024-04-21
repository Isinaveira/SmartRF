const mongoose = require("mongoose");
const fs = require("fs");

// Mongoose schema definition
const deviceSchema = new mongoose.Schema({
  station_id: { type: String, required: true },
  coordinates: {
    lng: { type: Number, required: true },
    lat: { type: Number, required: true },
  },
  state: { type: String, required: true },
  last_lectureAt: { type: String, required: true },
});

const Device = mongoose.model("Device", deviceSchema, "Devices");

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/SmartRF", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to read GeoJSON file and create devices
async function createDevices() {
  try {
    const data = await fs.promises.readFile("./map.geojson", "utf8");
    const geojson = JSON.parse(data);

    const devices = [];
    let id = 100; // Start ID from 100
    geojson.features.forEach((feature, index) => {
      const coordinates = feature.geometry.coordinates;
      const newDevice = new Device({
        station_id: id.toString(),
        coordinates: {
          lng: coordinates[0],
          lat: coordinates[1],
        },
        state: ["active", "inactive", "maintenance"][
          Math.floor(Math.random() * 3)
        ],
        last_lectureAt: new Date().toISOString(),
      });
      devices.push(newDevice.save());
      id++;
    });

    await Promise.all(devices);
    console.log("All devices created");
  } catch (err) {
    console.error("Error processing the GeoJSON file:", err);
  }
}

createDevices()
  .then(() => {
    mongoose.disconnect();
    console.log("Database populated and disconnected");
  })
  .catch((err) => {
    console.error("Error populating the database:", err);
    mongoose.disconnect();
  });
