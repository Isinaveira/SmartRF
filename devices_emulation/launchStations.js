const { spawn } = require("child_process");

// Configuration for launching multiple instances
const numberOfStations = 5; // Specify the number of stations you want to launch
const baseStationId = 100; // Base ID for station, will increment for each new station
const baseLat = 40.7128; // Starting latitude (example value)
const baseLng = -74.006; // Starting longitude (example value)
const timePerSample = 1000; // Time per sample in milliseconds
const constellationId = "Constellation1"; // Constellation ID (if applicable)

// Function to launch a station with specific parameters
function launchStation(stationId, lat, lng, constellationId, timePerSample) {
  const process = spawn("node", [
    "measurementScript.js",
    stationId,
    constellationId,
    lat,
    lng,
    timePerSample,
  ]);

  process.stdout.on("data", (data) => {
    console.log(`Station ${stationId}: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`Error from station ${stationId}: ${data}`);
  });

  process.on("close", (code) => {
    console.log(`Station ${stationId} process exited with code ${code}`);
  });
}

// Launching multiple stations
for (let i = 0; i < numberOfStations; i++) {
  const stationId = baseStationId + i;
  const lat = baseLat + i * 0.01; // Slightly changing latitude for each station
  const lng = baseLng + i * 0.01; // Slightly changing longitude for each station
  launchStation(stationId, lat, lng, constellationId, timePerSample);
}
