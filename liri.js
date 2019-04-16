// ----------- PSUEDO CODE ------------ //
// 1) Set up a capture for what the user types in
// 2) User types something in and it writes that to another file
// 3) That file gets referenced for the API call 
// 4) We need: 
// *) Artist
// *) Song name
// *) Preview link of the song from Spotify
// *) Album
// 5) Once we have the API call working maybe setup a prompt to ask the user what they want to do for each field



// Code to read and set any environment variables with the dotenv package:
require("dotenv").config()

// Import the keys.js file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);



// Search Method
spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 }, function (err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    // Artist Name
    console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));

    // External Link
    console.log(JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2));



});







