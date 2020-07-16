const { spawn } = require('child_process');
const python = spawn('python', ['serialData.py']);

python.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

python.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

python.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});