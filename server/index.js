const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/temperature', (req, res) => {      
    
})

app.listen(port, () => console.log(`Smart Kegerator listening on port 
${port}!`))