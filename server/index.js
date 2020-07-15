const app = require('express')(); //Express Library

const server = require('http').Server(app); //Create HTTP instance

const io = require('socket.io')(server); //Socket.IO Library

const {spawn} = require('child_process');

const path = require('path');


app.get('/', function(req, res) {                  
    res.sendfile(__dirname + '/index.html'); //serve the static html file
}); 

const SerialPort = require('serialport');

constReadline = SerialPort.parsers.Readline;

const port = new SerialPort('/dev/ttyACM0');

const parser = port.pipe(new Readline({delimiter: '\r\n'}));

parser.on('data', (temp) => {
    console.log(temp);
    var today = new Date();
    io.sockets.emit('temp', {date: today.getDate()+"-"+today.getMonth()+1+"-"+today.getFullYear(), time: (today.getHours())+":"+(today.getMinutes()), temp:temp})
});

io.on('connection', (socket) => {
    console.log("someone connected");
})

app.listen(3000, () => console.log(`Smart Kegerator listening on port 
3000!`))