const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/' + latitude + ',' + longitude + '?key=NGCBF2DZS6C49GPE3H8DPQXF7';

    request({ url, json: true }, (error, response) => { // didn't destructure as { body } because 'response.statusCode !== 200'
        if (error) {
            callback('Unable to Connect.', undefined);
        } else if (response.statusCode !== 200) { // 200 indicates a successful response
            callback('Unable to Find Location.', undefined);
        } else {
            callback(
                undefined,
                response.body.days[0].description +
                ' It is currently ' +
                response.body.currentConditions.temp +
                ' degrees out. The high today is ' +
                response.body.days[0].tempmax +
                ' with a low of ' +
                response.body.days[0].tempmin +
                '. There is a ' +
                response.body.currentConditions.precipprob +
                '% chance of rain.'
            );
        }
    });
};

module.exports = forecast;



// https://www.visualcrossing.com/weather/weather-data-services
// docs - https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/