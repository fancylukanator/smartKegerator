var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const {spawn} = require('child_process');

//import data API
//const { toggle } = require('./getData')

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
    //get data
    var dataToSend;
    const python = spawn('python', ['serialData.py']);
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
});


//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    socket.emit('data', '${data}');
    //listen for disconnectS
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
});

//server listening on port 3000
http.listen(3000, () => {
    console.log('Listening on port 3000')
})

