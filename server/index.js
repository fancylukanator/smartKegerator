var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
//const { sensorData } = require('./getData');

//Read arduino data via serial port
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/ttyACM0')
var sensorData = data;
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)


//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    socket.emit('broadcast', 'sensorData');
    //listen for disconnects
    socket.on('disconnect', () => {
        console.log('Disconnected')
    });
});

//server listening on port 3000
http.listen(3000, () => {
    console.log('Listening on port 3000')
});