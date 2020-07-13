const {spawn} = require('child_process');

const python = spawn('python', ['serialTemp36.py']);

python.stdout.on('data', function (data) {
    console.log(`${data}`);
});