var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
//const { toggle } = require('./getData')

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//get data?
app.get('/', (req, res) => {

    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./serialData.py']);

    pyProg.stdout.on('data', function(data) {

        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
})


//listen for connection
io.on('connection', (socket) => {
    console.log('Connected');
    //now send the data
    socket.emit('message', {'message': 'hello world'});
    //socket.emit('data', data);
    //listen for disconnectS
    socket.on('disconnect', () => {
        console.log('Disconnected')
    })
});

//server listening on port 3000
http.listen(3000, () => {
    console.log('Listening on port 3000')
});