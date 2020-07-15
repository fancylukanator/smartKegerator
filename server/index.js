const path =require('path');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
//const { toggle } = require('./getData')

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });


//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
});

//server listening on port 3000
const server = app.listen(3000, () => console.log('Listening on port 3000'));

