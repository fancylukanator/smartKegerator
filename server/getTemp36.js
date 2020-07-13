const path = require('path')
const {spawn} = require('child_process');

const getSensorReading = (callback) => {
  function runScript(){
    return spawn('python', [
      "-u", 
      path.join(__dirname, 'serialTemp36.py')
    ]);
  callback(null, temperature)
  }
  const subprocess = runScript()
}



module.exports = getSensorReading