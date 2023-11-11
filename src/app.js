const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebars Engine and Views Location
app.set('view engine', 'hbs');
app.set('views', viewPath); // Default 'views' dir as 'templates'
hbs.registerPartials(partialsPath);

// Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => { // Index
    res.render('index', {
        title: 'Weather App',
        name: 'Pasindu MJ'
    });
});

app.get('/about', (req, res) => { // About
    res.render('about', {
        title: 'About me',
        name: 'Pasindu MJ'
    });
});

app.get('/help', (req, res) => { // Help
    res.render('help', {
        helpText: 'input the city name or zip code you desire for weather updates, click on \'Search\' and that\'s it. The latest weather data is at your fingertips.',
        title: 'Help',
        name: 'Pasindu MJ'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, data = {}) => { // setup an empty object default value if needed for an error
        if (error) {
            return res.send({ error }); // error: error shorthand
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });

        });
    });

    // res.send({
    //     forecast: 'Pk',
    //     location: 'Colombo',
    //     address: req.query.address // /weather?address=Colombo
    // });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ //return
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Pasindu MJ',
        errorMessage: 'Help Article Not Found!'
    });
});

app.get('*', (req, res) => { // * -> Match anything that hasn't been matched so far. // 404 page
    res.render('404', {
        title: '404',
        name: 'Pasindu MJ',
        errorMessage: 'Page Not Found!'
    });
});

// server run
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

// nodemon src/app.js -e js,hbs
