const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://us1.locationiq.com/v1/search?key=pk.70fe6381afdf8ef3fcfd94f5fca4b22b&q=' + encodeURIComponent(address) + '&format=json&limit=1'; // encodeURIComponent() -> encode special chars

    request({ url, json: true }, (error, response) => { // desctructuring the 'response' to get { body } changes the output (Unable to Connect)
        if (error) {
            callback('Unable to Connectx.', undefined);
        } else if (response.body.error) {
            callback('Unable to Find Location.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body[0].lat,
                longitude: response.body[0].lon,
                location: response.body[0].display_name
            });
        }
    });
};

module.exports = geocode;



// docs - https://docs.locationiq.com/docs/search-forward-geocoding
// docs - https://docs.locationiq.com/reference/search