var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");



//add body-parser and cors middlewares
var corsOptions = {
    origin: 'http://localhost:8081',
    credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//initialize Mongoose connection to MongoDB database
const db = require("./models");
const Role = db.role;
const Sensor = db.sensor;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("MongoDB connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}


//Read arduino data via serial port and send data to socket
//const SerialPort = require('serialport')
//const Readline = require('@serialport/parser-readline');
//const { serialize } = require('v8');
//const port = new SerialPort('COM3')       //COM3 for windown /dev/ttyACM0 for Rpi
//const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
//parser.on('data', (sensorData) => {
    //console.log(sensorData);
   // Sensor.create(JSON.parse(sensorData));
    //send data to mongo
   // const doc = new Sensor(JSON.parse(sensorData));
   // doc.save(function(err, doc) {
   //   if (err) return console.error(err);
    //  console.log("Document inserted Successfully")
   // });
    //send data to socket
   // io.sockets.emit('sensorData', {sensorData:sensorData});
//});

//const doc = new Sensor({"Temperature":90,"Rate1":0,"Vol1":0.00,"PourVol1":0.00,"Rate2":0,"Vol2":0.00,"PourVol2":0.00});

//doc.save(function(err, doc) {
  //if (err) return console.error(err);
  //console.log("Document inserted Successfully")
//});

//serve index.html at localhost:3000
//app.get('/', (req, res) => {
    //res.sendFile(`${__dirname}/../angularapp/index.html`);
//});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});




//listen for connection
io.on('connection', (socket) => {
    console.log('A user connected');
    //now send the data
    socket.emit('test event', 'here is some data');
    socket.emit('test two', 'here is different data');
    //listen for disconnects
    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//server listening on port 3000
//http.listen(3000, () => {
    //console.log('Listening on port 3000')
//});
