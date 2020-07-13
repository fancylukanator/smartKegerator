const path = require('path')
const {spawn} = require('child_process');

/**
 * Run python script, pass in `-u` to not buffer console output 
 * @return {ChildProcess}
 */
function runScript(){
  return spawn('python', [
    "-u", 
    path.join(__dirname, 'serialTemp36.py')
  ]);
}

const subprocess = runScript()

module.exports = getSensorReading