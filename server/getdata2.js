const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const port = new SerialPort('/dev/ttyACM0')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', (sensorData) => {
    console.log(sensorData);
    //send data to socket
    //io.sockets.emit('sensorData', {sensorData: sensorData});
});