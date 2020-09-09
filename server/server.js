
//l;kasjdfl;kasjdf;lksjadf

const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
global.io = io;
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");



//add body-parser and cors middlewares
var corsOptions = {
    origin: 'http://192.168.2.21:8081',
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
    useUnifiedTopology: true,
    useFindAndModify: false
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


// set port, listen for requests
const PORT = process.env.PORT || 8080;
http.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});




//listen for socket connection
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
