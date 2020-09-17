const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publidDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publidDirectoryPath))
// everytime we refresh a page we will see same result cause we have static files.otherwise we can use template engines for dynamic web pages.

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'George' /* first parameter is must but second is optional we are making name and title available for us */
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'zura'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Giorgi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'Please provide an adress'
        })

    }
    geocode(req.query.adress, (error, { lat, long, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                adress: req.query.adress
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide Search term'
        })
    }
    //we are putting here return in order to stop function executing if there is not search term
    //console.log(req.query.search)
    res.send({
        products: []
    })
})
//app.com
//app.com/help 
//app.com/about
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'giorgi',
        errorMessage: 'Help article not found'

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'giorgi',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is up on port.' + port)
})
