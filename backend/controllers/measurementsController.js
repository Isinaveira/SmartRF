const  client  = require('../mqttClient');

exports.startMeasurement = async (req, res) => {
    try {    
        console.log(req.body);
        client.publishMessage('config', JSON.stringify(req.body))
    } catch(error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Error interno del servidor" });
    }
}
