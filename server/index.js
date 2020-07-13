const express = require('express')
const path = require('path')
const app = express()
const {spawn} = require('child_process');
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {      
    var dataToSend;
    const python = spawn('python', ['serialTemp36.py'])
    python.stdout.on('data', function (data) {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.on('close', (code)  {
        console.log('child process close allstdio with code${code}');
        res.send(dataToSend)
    });
})

app.listen(port, function(){
    console.log('Server listening on port ${port}')
})