const db = require("../models");
const Sensor = db.sensor;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const port = new SerialPort('COM3', { baudRate: 9600 });       //COM3 for windown /dev/ttyACM0 for Rpi 


exports.serialSensorData = (req, res) => {
  parser = port.pipe(new Readline({ delimiter: '\r\n' }));
  port.open(function () {                           //open port when user connects
    parser.on('data', (sensorData) => {
      parsedData = JSON.parse(sensorData);          //make data useable
      //send data to mongo
      console.log(req.username);                    // check who is logged in
      const doc = new Sensor({"User":req.username,"sensorData":parsedData});    //attach logged in username to data
      doc.save(function(err, doc) {
        if (err) return console.error(err);
        console.log("Document inserted Successfully")
      });
      //stop recording data if inactive
      if (parsedData.State == 0) {                 //parsedData.State == 1 when rate is non zero and == 0 when rate is 0 for 10 seconds
        port.unpipe(parser);
        port.close();
        return;
      }
    });
  });
};


      //send data to socket
      //io.sockets.emit('sensorData', {sensorData:sensorData});