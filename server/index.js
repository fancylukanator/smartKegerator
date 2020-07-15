const app = require('express')(); //Express Library
const server = require('http').Server(app); //Create HTTP instance
const io = require('socket.io')(server); //Socket.IO Library
const {spawn} = require('child_process');
const path = require('path');

app.get('/', function(req, res) {                  
    res.sendfile(__dirname + '/index.html'); //serve the static html file
}); 

io.on('connection', function(socket){
    console.log("New client connected"), setInterval(
        () => getData(socket),
        1000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));    
});                                                   
 
server.listen(3000); //run on port 3000

const getData = function () {
    return spawn('python', [
      "-u", 
      path.join(__dirname, 'serialData.py')
    ]);
}
