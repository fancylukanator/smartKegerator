const express = require('express')
const path = require('path')
const app = express()
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', (req, res) => {      
    let tempRaw = execSync(__dirname + '/serialTemp36.py').toString();
    let temp = parseFloat(tempRaw.split('\n')[0]);
    res.json({
        temperature: {
        value: temp,
        description: 'Temperature in Celcius'
        }
    });
})

app.listen(port, () => console.log(`Smart Kegerator listening on port 
${port}!`))