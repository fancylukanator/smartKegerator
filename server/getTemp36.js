const path = require('path')
const {spawn} = require('child_process');

const getSensorReading = (callback) => {
  function runScript(){
    return spawn('python', [
      "-u", 
      path.join(__dirname, 'serialTemp36.py')
    ]);
  const subprocess = runScript()
  callback(temperature)
  }
  
}



module.exports = getSensorReading