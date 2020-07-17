var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
//const { sensorData } = require('./getData');

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//Read arduino data via serial port
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const port = new SerialPort('/dev/ttyACM0')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', (temp) => {
    console.log("Receiving Data");
    //var today = new Date();
    io.sockets.emit('temp', temp);
});

//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    //socket.emit('broadcast', 'sensorData');
    //listen for disconnects
    socket.on('disconnect', () => {
        console.log('Disconnected')
    });
});

//server listening on port 3000
http.listen(3000, () => {
    console.log('Listening on port 3000')
});
