const Measurement = require("../models/measurement"); // Assuming the Measurement model is imported correctly
const client = require("../mqttClient"); // Assuming the MQTT client is imported correctly
const {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
} = require("../mqttActions");

//This function modifies the current parameter of the stations measurements

//Example of what should be received in the request body!============>
/* {
"topic": "measurement_topic",
"message": {
      "name": "Measurement 1",
      "freqIni": 1000,
      "freqFinal": 2000,
      "threshold": "high",
      "t_capt": 10,
      "chanBW": 20,
      "nfft": 1024,
      "mode": "continuous"
}
} */

/*
  Endpoint to start measurement to any topic, depending on request body.message:(msg_type: 0 or 1)
                1º If no measurement specification in message content => the station will start measuring with default parameters
                2º If specification in body, must send the parameters to the station(s)
                MUST CHECK NAME FIELD ON THE BODY TO SEE IF THERE ARE DEFAULT PARAMETERS IN DATABASE, IF EXISTS THEN RETREIVE AND IF NOT SAVE. ALSO THERE WILL BE A USER ADDON.
                
*/
exports.startMeasurement = async (req, res) => {
  console.log("Received measurement data:", req.body);

  try {
    const { topic, message } = req.body;

    // Call clientPublisher function with topic and message
    clientPublisher(0, JSON.stringify(message), topic);

    // Save the measurement to the database
    const measurement = new Measurement({
      ...message,
    });
    const savedMeasurement = await measurement.save();

    // Send a JSON response with the newly created measurement
    res.status(201).json(savedMeasurement); // 201 status code for resource created
  } catch (error) {
    // Log the error to the console
    console.error("Error starting measurement:", error);

    // Send a 500 Internal Server Error response with an error message
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
};

/*
  Endpoint to stop measurement to any topic, depending on request:(msg_type: 2). NO BODY NEEDED ! WILL BE IGNORED

*/

exports.stopMeasurement = async (req, res) => {
  client
    .publishMessage("stop", JSON.stringify("stop"))
    .then(() => {
      const measurement = new Measurement({
        ...req.body,
      });
      return measurement.save(); // Devolver la promesa aquí
    })
    .then((savedMeasurement) => {
      // Send a JSON response with the newly created measurement
      res.status(201).json(savedMeasurement); // 201 status code for resource created
    })
    .catch((error) => {
      // Log the error to the console
      console.error("Error starting measurement:", error);

      // Send a 500 Internal Server Error response with an error message
      res
        .status(500)
        .json({ status: 500, message: "Error interno del servidor" });
    });
};

exports.getMeasurement = async (req, res) => {
  Measurement.findById(req.params.id)
    .then((measurement) => {
      // Log the retrieved users to the console
      console.log(measurement);

      // Send a JSON response with the retrieved users
      res.json(measurement);
    })
    .catch((error) => {
      // Send a 500 Internal Server Error response with the error message
      res.status(500).json({ error: error.message });
    });
};
