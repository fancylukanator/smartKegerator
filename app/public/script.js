//check for active connection
var isConnectionActive = false;

//connect to socket server
var connection = io( 'http://192.168.2.17:3000' );

//when connection is established
connection.on( 'connect', () => {
  isConnectionActive = true;
} );

connection.on( 'disconnect', () => {
  isConnectionActive = false;
} );

// Websocket event emitter function
var socket = io.connect();

socket.on('message', function(data){
    console.log(data.message);
});