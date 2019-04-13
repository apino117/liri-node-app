// ----------- PSUEDO CODE ------------ //
// 1) Set up a capture for what the user types in
// 2) User types something in and it writes that to another file
// 3) That file gets referenced for the API call 
// 4) We need: 
    // *) Artist
    // *) Song name
    // *) Preview link of the song from Spotify
    // *) Album



// Code to read and set any environment variables with the dotenv package:
require("dotenv").config()

// Import the keys.js file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// Search Method
spotify
    .search({ type: 'track', query: 'All the Small Things' })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (err) {
        console.log(err);
    });

// Request Method
spotify
    .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function (data) {
        console.log(data);
    })
    .catch(function (err) {
        console.error('Error occurred: ' + err);
    });






