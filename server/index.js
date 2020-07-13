const express = require('express')
const path = require('path')
const app = express()
const {spawn} = require('child_process');
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {      
    res.send(getCachedSensorReading.getTemperature().toFixed(1))
})

app.listen(port, () => console.log(`Smart Kegerator listening on port 
${port}!`))