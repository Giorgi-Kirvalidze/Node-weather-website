const request = require('request')


const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=299bf1ae18d0c8952381296534dccfd0&query=${lat},${long}&units=s`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current
            callback(undefined, `${weather_descriptions}.it is currently ${temperature}. THere is a ${feelslike} chance of changing degree`)
        }
    })

}




module.exports = forecast