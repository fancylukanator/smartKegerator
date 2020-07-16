var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

//import data API
//const { sensorData } = require('./getData');

//Read python file and emit data at the same time
const path = require('path')
const {spawn} = require('child_process')

/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 */
function runScript(){
  return spawn('python', [
    "-u", 
    path.join(__dirname, 'serialData.py')
  ]);
}

const subprocess = runScript()
var sensorData;
// print output of script
subprocess.stdout.on('data', (data) => {
    sensorData = stdout.data
    io.emit('broadcast', sensorData);
    console.log(`${data}`);
});
subprocess.stderr.on('data', (data) => {
    console.log(`error:${data}`);
});
subprocess.on('close', () => {
    console.log("Closed");
});

//serve index.html at localhost:3000
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


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