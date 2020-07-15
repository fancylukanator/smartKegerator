const express = require('express')

const path = require('path')

const app = express()

const port = 3000

const content = require('fs').readFileSync(__dirname + '../public/index.html', 'utf8');

const httpServer = require('http').createServer((req, res) => {
    // serve index.html
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLenght(content));
    res.end(content);
})

const io = require(socket.io)(httpServer);

io.on('connect', socket => {
    console.log('connect');
});


app.listen(port, () => {
    console.log(`Smart Kegerator listening on port ${port}!`);
});