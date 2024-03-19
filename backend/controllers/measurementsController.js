const { client } = require('../server');// Import the socket.io library

const  startMeasurement = async (req, res) => {
    console.log(req.body);
    client.publish('config', JSON.stringify(req.body));
}