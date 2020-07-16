var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
var { sensorData } = require('./getData')
console.log(sensorData);


//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    socket.emit('data', sensorData);
    //listen for disconnects
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
});

//server listening on port 3000
http.listen(3000, () => {
    console.log('Listening on port 3000')
});