const db = require("../models");
const Log = db.log;
const Tap = db.tap;
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const { user } = require("../models");
const port = new SerialPort('COM3', { baudRate: 9600 });       //COM3 for windown /dev/ttyACM0 for Rpi



function updateKeg () {
    Tap.findOneAndUpdate({ inUse: true, tapNumber: 1}, {
        $inc: {remainingVolume: -parsedData.Vol1}
    },
        function(err, res) {
            if (err) return console.error(err);
            console.log("Keg 1 updated succesfully")
          });
    Tap.findOneAndUpdate({ inUse: true, tapNumber: 2}, {
        $inc: {remainingVolume: -parsedData.Vol2}
    },
        function(err, res) {
            if (err) return console.error(err);
            console.log("Keg 2 updated succesfully")
          });

};

function updateUser () {

};

exports.serialSensorData = (req, res) => {
    Tap.find({ inUse: true, tapNumber: 1}).
        then(data => {
            console.log(data[0].beer);
        });
    // Read the port data
    parser = port.pipe(new Readline({ delimiter: '\n' }));
    port.open(function () {
        console.log('serial port open');
    });
    parser.on('data', sensorData => {
        console.log('got word from arduino:', sensorData);
        parsedData = JSON.parse(sensorData);
        if (parsedData.State == 0) {                 //parsedData.State == 1 when rate is non zero and == 0 when rate is 0 for 10 seconds
            console.log(parsedData.Vol1, parsedData.Vol2);
            updateKeg();
            console.log
            function createLog () {

                if (parsedData.Vol1 !=0) {
                    Tap.find({ inUse: true, tapNumber: 1}).
                        then(keg1 => {
                            const doc = new Log({"user":req.username,"tap":keg1[0]._id,"volume":parsedData.Vol1});
                            doc.save(function(err, doc) {
                            if (err) return console.error(err);
                            console.log("Keg 1 logged succesfully")
                        });
                    });
                }
                if (parsedData.Vol2 !=0) { 
                    Tap.find({ inUse: true, tapNumber: 2}).
                        then(keg2 => {
                            const doc = new Log({"user":req.username,"tap":keg2[0]._id,"volume":parsedData.Vol1});
                            doc.save(function(err, doc) {
                            if (err) return console.error(err);
                            console.log("Keg 2 logged succesfully")
                        });
                    });
                }
            };
            createLog();

            port.unpipe(parser)
            port.close();
            console.log(req.username);
            return;
        }
    });
};

