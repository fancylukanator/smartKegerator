const express = require('express');
const path = require('path');
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {      
    res.send('24 °C');
});

app.get('/humidity', function(req, res) {
    res.send('48%');
});

app.listen(3000, function(){
    console.log('Server listening on port 3000');
});