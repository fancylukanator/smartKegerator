const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', (req, res) => {      
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./serialTemp.py']);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        res.write(data);
        res.end('end');
    });
})

app.listen(port, () => console.log(`Smart Kegerator listening on port 
${port}!`))