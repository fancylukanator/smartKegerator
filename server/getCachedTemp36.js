const getTemp36 = require('./getTemp36')

const cache = {
    temperature: null
}

setInterval(() => {
    getTemp36((err, temperature) => {
        if (err) {
            return console.error(err)
        }
        cache.temperature = temperature
    })
}, 2000)

module.exports.getTemp36 = () => cache.temperature