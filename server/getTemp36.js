/*const path = require('path')
const {spawn} = require('child_process')

/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 
function runScript(){
  return spawn('python', [
    "-u", 
    path.join(__dirname, 'serialTemp36.py')
  ]);
}

const subprocess = runScript()

// print output of script
subprocess.stdout.on('data', (data) => {
  console.log(`${data}`);
});
subprocess.stderr.on('data', (data) => {
  console.log(`error:${data}`);
});
subprocess.on('close', () => {
  console.log("Closed");
});
*/

const { spawn } = require('child_process');
const pyProg = spawn('python', ['./serialTemp.py']);

pyProg.stdout.on('data', function(data) {
  console.log(data.toString());
  res.write(data);
  res.end('end');
});