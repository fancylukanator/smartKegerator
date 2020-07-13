const getSensorReading = require('./getTemp36')

const cache = {
    temperature: null
}

setInterval(() => {
    getSensorReading((err, temperature) => {
        if (err) {
            return console.error(err)
        }
        cache.temperature = temperature
    })
}, 2000)

module.exports.getTemperature = () => cache.temperature