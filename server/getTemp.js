const {spawn} = require('child_process');

var dataToSend;

const python = spawn('python', ['serialTemp36.py']);

python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    console.log(`${data}`);
    dataToSend = data.toString();
});

python.stderr.on('data', (data) => {
    console.log(`error:${data}`);
  });

python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    res.send(dataToSend)
});