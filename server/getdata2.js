var child = require('child_process').execFile('serialData.py'); 
// use event hooks to provide a callback to execute when data are available: 
child.stdout.on('data', function(data) {
  console.log(data.toString()); 
});