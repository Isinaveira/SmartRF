const { client } = require('../server');// Import the socket.io library
const { mqtt } = require("mqtt");
exports.startMeasurement = async (req, res) => {
    try{    
        console.log(req.body);
        res.json({status: 200, message:"OK"});
        client.publish('variable_updates', JSON.stringify(req.body));
    }catch(error){
        console.log(error);
    }
}

    