const db = require("../models");
const Log = db.log;
const Tap = db.tap;
const User = db.user;
const SerialPort = require('serialport');
const Ready = require('@serialport/parser-ready');
const Readline = require('@serialport/parser-readline');
const { serialize } = require('v8');
const { user } = require("../models");
const port = new SerialPort('/dev/ttyACM0', { baudRate: 9600 });       //COM3 for windown /dev/ttyACM0 for Rpi



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



exports.serialSensorData = (req, res) => {
  function logPour () {
    
    if (parsedData.Vol1 !=0) {
        Tap.find({ inUse: true, tapNumber: 1}).
            then(keg1 => {
                var cost = keg1[0].price*parsedData.Vol1;  // unit price of keg 1 times units
                console.log(req.username);
                const doc = new Log({"user":req.username,"tap":keg1[0]._id,"volume":parsedData.Vol1,"price":cost});  //create log
                doc.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Keg 1 logged succesfully")
                });
                User.findOneAndUpdate({ username: req.username }, {
                    $inc: {
                        balance: cost,                      // keep track of users balance
                        totalVolume: parsedData.Vol1         // keep track of users total volume
                    },
                    lastActive: Date.now(),                   // last pour time
                },
                    function(err, res) {
                        if (err) return console.error(err);
                        console.log("Stats updated succesfully")
                    });
            });
    }
    if (parsedData.Vol2 !=0) { 
        Tap.find({ inUse: true, tapNumber: 2}).
            then(keg2 => {
                var cost = keg2[0].price*parsedData.Vol2;
                const doc = new Log({"user":req.username,"tap":keg2[0]._id,"volume":parsedData.Vol2,"price":cost});
                doc.save(function(err, doc) {
                if (err) return console.error(err);
                console.log("Keg 2 logged succesfully")
                });
                User.findOneAndUpdate({ username: req.username }, {
                    $inc: {
                        balance: cost,
                        totalVolume: parsedData.Vol2
                    },
                    lastActive: Date.now(),
                },
                    function(err, res) {
                        if (err) return console.error(err);
                        console.log("Stats updated succesfully")
                    });
            });
    }
  };
  
  function updateStats () {
    var today = new Date(),
        oneDay = ( 1000 * 60 * 60 * 24 ),
        thirtyDays = new Date( today.valueOf() - ( 30 * oneDay ) )
  
    console.log("hello from aggregate");
  
    Log.aggregate([
        { '$match': {
          time: {
            $gte: thirtyDays
          },
          user: req.username
        }},
        {'$group': {
          "_id": '$user',
          "dayVolume": {
            '$sum': {
              '$cond': [
                { "$gt": [
                  { "$subtract": [ "$time", new Date("1970-01-01") ] },
                  new Date().valueOf() - ( 1000 * 60 * 60 * 24 )
                ]},
                '$volume',
                0
              ]
            }
          },
          "weekVolume": {
            '$sum': {
              '$cond': [
                { "$gt": [
                  { "$subtract": [ "$time", new Date("1970-01-01") ] },
                  new Date().valueOf() - ( 1000 * 60 * 60 * 24 * 7)
                ]},
                '$volume',
                0
              ]
            }
          },
          "monthVolume": {
            '$sum': {
              '$cond': [
                { "$gt": [
                  { "$subtract": [ "$time", new Date("1970-01-01") ] },
                  new Date().valueOf() - ( 1000 * 60 * 60 * 24 * 30 )
                ]},
                '$volume',
                0
              ]
            }
          }
        }}
      ])
      .then(stats => {
          console.log(stats)
          console.log(stats[0]._id, stats[0].dayVolume);
        User.findOneAndUpdate({ username: stats[0]._id}, {
            dayVolume: stats[0].dayVolume,
            weekVolume: stats[0].weekVolume,
            monthVolume: stats[0].monthVolume
        },
            function(err, res) {
                if (err) return console.error(err);
                console.log("AGGREGATION WORKED")
            });
      })
  
  };
    // Read the port data
    var count = 0;
    ready = port.pipe(new Ready( { delimiter: '{'}));
    parser = port.pipe(new Readline({ delimiter: '\n' }));
    port.open(function () {
        global.io.sockets.emit('status', 'initializing sensor, please wait');
        console.log('serial port open');
        port.flush((error) => {
          console.log("flushed at start");
          parser.on('data', sensorData => {
            console.log('got word from arduino:', sensorData);
            var n = sensorData.startsWith("{");
            parsedData = '';
            if (n == true) {
              parsedData = JSON.parse(sensorData);
            };
            global.io.sockets.emit('sensorData', {sensorData:parsedData});        //send data to socket
            
            if (parsedData.Rate1 == 0 && parsedData.Rate2 == 0){
              count += 1;
            }
            if (parsedData.Rate1 != 0 || parsedData.Rate2 != 0){
                count = 0;
            }
            
            console.log("COUNT" + count);

            if (count == 2) {
              global.io.sockets.emit('status', 'ready to pour');
            }

            if (count == 10) {
              setTimeout(doAllTheThings, 5000);
            };

            //var count = 0;
            //if (parsedData.Rate1 == 0 && parsedData.Rate2 == 0) {
              //console.log("rate 1: " + parsedData.Rate1)
              //count += 1;
              //console.log("count: " + count)
              //if (count == 10) {
              //  setTimeout(doAllTheThings, 5000);
              //};
            //};
            //if (parsedData.State == 0) {                 //State == 1 when rate is non zero and == 0 when rate is 0 for 10 seconds
            //};
        });
        });
        function doAllTheThings () {
          global.io.sockets.emit('status', 'Pour logged succefully, please log out');
          port.flush((error) => {
            console.log('port flushed at end')
            port.unpipe(parser);
            port.close((error) => {
              console.log('port closed')
              updateKeg();
              logPour();
              setTimeout(updateStats, 1000);
            });
            return;
          });

        };
        //setTimeout(doAllTheThings, 10000);


    });
};




