const Measurement = require('../models/measurement'); // Assuming the Measurement model is imported correctly
const client = require('../mqttClient'); // Assuming the MQTT client is imported correctly

exports.startMeasurement = async (req, res) => {
    // Log the received request body to the console
    console.log("Received measurement data:", req.body);

    // Publish the received measurement data to the 'config' topic using MQTT
    client.publishMessage('config', JSON.stringify(req.body))
        .then((savedMeasurement) => {
            // Send a JSON response with the newly created measurement
            res.status(201).json(savedMeasurement); // 201 status code for resource created
        })
        .catch((error) => {
            // Log the error to the console
            console.error("Error starting measurement:", error);

            // Send a 500 Internal Server Error response with an error message
            res.status(500).json({ status: 500, message: "Error interno del servidor" });
        });
};

exports.getMeasurements = async (req, res) => {
    Measurement.find(/* select * from users where users.dni = '123' */)
        .then(measurements => {
            // Log the retrieved users to the console
            console.log(measurements);

            // Send a JSON response with the retrieved users
            res.json(measurements);
        })
        .catch(error => {
            // Send a 500 Internal Server Error response with the error message
            res.status(500).json({ error: error.message });
        });
};
