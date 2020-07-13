const fetchTemperature = () => {
    fetch('/temperature')
      .then(results => {
        return results.text()
      })
      .then(text => {
        const temperatureDisplay = document.getElementById('temperature-display')
        temperatureDisplay.innerHTML = text
      })
}

setInterval(() => {
    fetchTemperature()
}, 2000)