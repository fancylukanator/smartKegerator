const express = require('express')
const path = require('path')
const app = express()
const {spawn} = require('child_process');
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', function(req, res) {      
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
})

app.listen(port, () => console.log(`Smart Kegerator listening on port 
${port}!`))