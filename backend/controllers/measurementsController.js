const { client } = require('../mqttClient');// Import the socket.io library

exports.startMeasurement = async (req, res) => {
    try{    
        console.log(req.body);
        client.publish('variable_updates', JSON.stringify(req.body));
    }catch(error){
        console.log(error);
    }
}

    