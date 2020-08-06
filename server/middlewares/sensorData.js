const db = require("../models");
const Role = db.role;
const User = db.user;
const Sensor = db.sensor;
const { authJwt } = require("./authJwt");


const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const port = new SerialPort('COM3');       //COM3 for windown /dev/ttyACM0 for Rpi
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

serialSensorData = parser.on('data', (sensorData) => {
    console.log(req.username, sensorData);
    //send data to mongo
    const doc = new Sensor(JSON.parse({"AccountName": req.body.username,sensorData}));
    res.doc.save(function(err, doc) {
      if (err) return console.error(err);
      console.log("Document inserted Successfully")
    });
    //send data to socket
    io.sockets.emit('sensorData', {sensorData:sensorData});
    next();
  });


const getData = {
  serialSensorData
};

module.exports = getData;
