const path =require('path');
const express = require('express');
const socketIO = require('socket.io');

//import data API
const { toggle } = require('./getData')

//create express app
const app = express();

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,  'public/index.html'), {
        headers: {
            'Content-Type': 'text/html',
        }
    });
});


//listen for connection
io.on('connection', (socket) => {
    console.log('a user connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    socket.on('disconnect', () => {
        console.log('disconnected')
    })
});

//send asset files
//app.use( '/assets/', express.static( path.resolve( __dirname, 'public' ) ) );
//app.use( '/assets/', express.static( path.resolve( __dirname, 'node_modules/socket.io-client/dist' ) ) );

//server listening on port 3000
const server = app.listen(3000, () => console.log('Listening on port 3000'));

//create websocket server
const io = socketIO(server);

//listen for connection
io.on('connection', (client) => {
    console.log('SOCKET: ', 'A client connected', client.id);

    //listen for d
})