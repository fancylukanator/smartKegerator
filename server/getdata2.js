var child = require('child_process').execFile('serialData.py', function(err, stdout, stderr) { 
  // Node.js will invoke this callback when process terminates.
  console.log(stdout); 
});  