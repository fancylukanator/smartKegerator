var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var port = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  parser: serialport.parsers.readline("\n")
});

port.on("open", function () {
  console.log('open');
  port.on('data', function(data) {
      console.log(data);
  });
});