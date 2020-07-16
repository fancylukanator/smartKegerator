const { spawn } = require('child_process');
const python3 = spawn('python3', ['serialData.py']);

python3.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});