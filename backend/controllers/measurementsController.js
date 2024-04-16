const Measurement = require("../models/measurement"); // Assuming the Measurement model is imported correctly
const client = require("../mqttClient"); // Assuming the MQTT client is imported correctly
const {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
} = require("../mqttActions");

//This function modifies the current parameter of the stations measurements
let default_message = {
  name: "Measurement 1",
  freqIni: 1000,
  freqFinal: 2000,
  threshold: "high",
  t_capt: 10,
  chanBW: 20,
  nfft: 1024,
  mode: "continuous",
};

/*
  Endpoint to start measurement to any topic, depending on request body.message:(msg_type: 0 or 1)
                1º If no measurement specification in message content => the station will start measuring with default parameters
                2º If specification in body, must send the parameters to the station(s)
                MUST CHECK NAME FIELD ON THE BODY TO SEE IF THERE ARE DEFAULT PARAMETERS IN DATABASE, IF EXISTS THEN RETREIVE AND IF NOT SAVE. ALSO THERE WILL BE A USER ADDON.
                
*/
exports.startMeasurement = async (req, res) => {
  console.log("Received measurement data:", req.body);

  try {
    const {topic, message } =  req.body;    
    let measurement = null;
    // Save the measurement to the database
    if (!message || !('freqIni'  in message)) {
      measurement = new Measurement({
      ...req.body.message,
        ...default_message,
      });
    } else {
      measurement = new Measurement({
        ...message,
      });
    }
    const savedMeasurement = await measurement.save(); // saving before starting measurement. 

    if (!message || Object.keys(message).length === 0) {
      clientPublisher("0", JSON.stringify(" "), topic);
    } else {
      clientPublisher("1", JSON.stringify(message), topic);
    }
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
  try {
    const { topic, message } = req.body;
    console.log("Stopping measurement to: ", topic);
    clientPublisher("2", JSON.stringify(" "), topic);
    res.status(201).json(topic);
  } catch (error) {
    // Log the error to the console
    console.error("Error stopping measurement:", error);

    // Send a 500 Internal Server Error response with an error message
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
};

/*
  Endpoint to join a specific constellation

*/
exports.joinConstellation = async (req, res) => {
  try {
    const { topic, message } = req.body;
    console.log("Sending join constellation to: ", topic);
    console.log("The constellation is: ", message.constellation);
    console.log("Directed to: ", message.stations);
    clientPublisher("3", JSON.stringify(message), topic);
    res.status(201).json(message);
  } catch (error) {
    // Log the error to the console
    console.error("Error sending join constellation:", error);

    // Send a 500 Internal Server Error response with an error message
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
};

/*
  Endpoint to change the default parameters of the stations

*/
exports.changeDefoParameters = async (req, res) => {
  try {
    const { topic, message } = req.body;
    console.log("Setting new default parameters: ", message);
    clientPublisher("4", JSON.stringify(message), topic);
    res.status(201).json(message);
  } catch (error) {
    // Log the error to the console
    console.error("Error sending setting new default parameters:", error);

    // Send a 500 Internal Server Error response with an error message
    res
      .status(500)
      .json({ status: 500, message: "Error interno del servidor" });
  }
};

exports.getMeasurement = async (req, res) => {
    try {
      let lastMeasureConf = await Measurement.findOne().sort({_id:-1});
  
      if (!lastMeasureConf) {
        res.status(404).json({
          msg: "No se ha encontrado en la BD, inténtelo de nuevo.",
        });
      } else if (lastMeasureConf) {
        res.json(lastMeasureConf);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Se ha producido un error en el servidor.");
    }
};


