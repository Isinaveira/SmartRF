const Measurement = require("../models/measurement"); // Assuming the Measurement model is imported correctly
const client = require("../mqttClient"); // Assuming the MQTT client is imported correctly
const {
  setupSocketIO,
  clientSubscriber,
  clientPublisher,
} = require("../mqttActions");

//This function modifies the current parameter of the stations measurements
let default_message = {
  freqIni: 758,
  freqFinal: 768.77,
  t_capt: 0.25,
  threshold: "auto",
  nfft: 1024,
  mode: "avg",
  chanBW: 500,
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
    const { topic, message } = req.body;
    console.log(topic);
  
    let m = {};
    Object.keys(default_message).forEach((key) => {

      if (!(key in message) || message[key]=="") {
        m[key] = default_message[key];
        console.log(m[key]);
      } else {
       
          m[key] = message[key];
          
       
      }
    })


    m['type.id']=message.type.id;
    m['type.isConstellation']=message.type.isConstellation;
    m['dni_user']= message.user_dni;
    m['startedAt']= formatDateTime(new Date(), 'es-ES');

    if(message.name == ""){
      m['name']="Default";
    }else{
      m['name']=message.name;
    }
    // Save the measurement to the database
    console.log(m);
    const measurement = new Measurement({ ...m })

    const savedMeasurement = await measurement.save(); // saving before starting measurement. 
    console.log(savedMeasurement);
    
    let msg = {
        freqIni: m.freqIni,
        freqFinal: m.freqFinal,
        t_capt: m.t_capt,
        threshold: m.threshold,
        nfft: m.nfft,
        mode: m.mode,
        chanBW: m.chanBW,
        measurement_id: savedMeasurement._id
    };
 

    if ((message['freqIni']) == "") {
      clientPublisher("0", JSON.stringify(msg.measurement_id), topic);
    } else {
      clientPublisher("1", JSON.stringify(msg), topic);
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
    const  constellation  = req.body;
    //console.log("Sending join constellation to: ", constellation.devices_list);
    //console.log("The constellation is: ", constellation.constellation_id);
    
    JSON.parse(constellation.devices_list).forEach( device => {
      const topic = `station_id_pub_${device}`;
      const message = {
        constellation_id: constellation.constellation_id
      }
      clientPublisher("3", JSON.stringify(message), topic);
    });

    
    res.status(201).json("Measurement OK");
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

exports.getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurement.find();
    console.log(measurements);
    res.json(measurements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMeasurementByName = async (req, res) => {
  try {
    let measureConf = await Measurement.findOne({ name: req.params.name});

    if (!measureConf) {
      res.status(404).json({
        msg: "No se ha encontrado en la BD, inténtelo de nuevo.",
      });
    } else if (measureConf) {
      res.json(measureConf);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Se ha producido un error en el servidor.");
  }
};

// exports.getMyMeasurements = async (req, res) => {
//   try {
//     const measurements = await Measurement.find({dni_user: req.params.dni_user});
//     console.log(measurements);
//     res.json(measurements);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Se ha producido un error en el servidor.");
//   }
// };


function formatDateTime(date, locale) {
  const options = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false // Usar formato de 24 horas
  };

  return date.toLocaleString(locale, options);
}


