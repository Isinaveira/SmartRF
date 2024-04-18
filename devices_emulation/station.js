const mqtt = require('mqtt');


const stationId = process.argv[2];
const lat = process.argv[3];
const lng = process.argv[4];


const defaultMeasurementParams =  {
    "freqIni": 758,
    "freqFinal": 768.77,
    "threshold": "auto",
    "t_capt": 0.25,
    "chanBW": 500,
    "nfft": 1024,
    "mode": "avg"
}

idMeasurement = "";
let shouldMeasure = false;

//handel params errors 
if(!stationId){
    console.error('Se requiere el ID de la estación como argumento');
}

if(!lat){
    console.error('Se requiere indicar la latitud como argumento');
}

if(!lng){
    console.error('Se requiere indicar la longitud como argumento');
}



//important variables
const client = mqtt.connect('mqtt://127.0.0.1:1883');
const topic_sub = `station_id_pub_${stationId}`;
const topic_pub = `station_id_sub_${stationId}`;
const coordinates = {
    lat : lat,
    lng : lng
}

client.subscribe(topic_sub, function(err){
    if(err){
        console.error('Error al subscribirse al topic: ', err);
    }else{
        console.log(`Suscripción exitosa al topic: ${topic_sub}`);
    }
});


function calculateParams(params) {
    const nPointsPerChan = Math.round(params.nfft * (params.chanBW*1e3) / 2.56e6);
    const nChannels = Math.floor((params.nfft * ((params.freqFinal*1e6) - (params.freqIni*1e6)) / 2.56e6) / nPointsPerChan);
    const realChanBW = nPointsPerChan * 2.56e6 / params.nfft;
  
    return {
      nPointsPerChan: nPointsPerChan,
      nChannels: nChannels,
      realChanBW: realChanBW
    };
}


let measurementInterval;

client.on('message', function(topic, message) {
    console.log(`Mensaje recibido en el topic ${topic}: ${message.toString()}`);
    const msg = JSON.parse(message.toString());
    const msgType = msg.msg_type;
  
    switch (msgType) {
      case '0':
        // Usar los parámetros predeterminados
        console.log('Usando parámetros predeterminados.');
        idMeasurement = msg.message.measurement_id;
        const defaultParamsResult = calculateParams(defaultMeasurementParams);
        console.log('Parámetros calculados:', defaultParamsResult);
        shouldMeasure = true;
        setupMeasurementInterval(defaultParamsResult);
        break;
      case '1':
        // Calcular los parámetros según el mensaje
        console.log('Calculando parámetros según el mensaje.');
        const customParams = JSON.parse(msg.message);
        const customParamsResult = calculateParams(customParams);
        console.log('Parámetros calculados:', customParamsResult);
        shouldMeasure = true;
        setupMeasurementInterval(customParamsResult);
        break;
      case '2':
        console.log('Detener emisión de mediciones.');
        shouldMeasure = false;
        clearInterval(measurementInterval);
        break;
      case '3':
        console.log('Iniciar emisión de mediciones.');
        shouldMeasure = true;
        break;
      default:
        console.log('Tipo de mensaje desconocido.');
    }
  });

  function setupMeasurementInterval(params) {
    clearInterval(measurementInterval); // Limpiar intervalo anterior si existe
    measurementInterval = setInterval(function() {
        if (shouldMeasure) {
            console.log('Realizando mediciones...');
            const nChannels = params.nChannels;
            const measurements = Array.from({ length: nChannels }, () => Math.floor(Math.random() * 41) - 20);
            console.log(measurements);

            const message_data = 
            {
                payload:{
                    "id_measurement": idMeasurement,
                    "id_device": stationId,
                    "date": Date.now(),
                    "results": measurements,
                    "threshold": defaultMeasurementParams.threshold
                },
                hash: "231A1214q122",
                signature: "235901"
            }

            client.publish(topic_pub, JSON.stringify(message_data), function(err) {
                if (err) {
                    console.error('Error al publicar mediciones:', err);
                } else {
                    console.log(`Mediciones publicadas en el topic ${topic_pub}:`, message_data);
                }
            });
        }
    }, 1000);
}


