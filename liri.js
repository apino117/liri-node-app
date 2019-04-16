// ------------------------------------------------------------- UNIVERSALS -----------------------------------------------------------------//

var operandum = process.argv[2];

// ------------------------------------------------------------- CONCERT THIS -----------------------------------------------------------------//

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// Establish Variables and Require
var axios = require("axios");

var artist = process.argv[3];

function concert() {
    // AJAX CalL
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            // If the axios was successful...
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);
        })
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}




// ------------------------------------------------------------- SPOTIFY --------------------------------------------------------------------//

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

    // Song Name
    console.log(JSON.stringify(data.tracks.items[0].name, null, 2));

    // Album Name
    console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));


});


// ------------------------------------------------------------- SWITCHBOARD -----------------------------------------------------------------//


switch (operandum) {
    case "concert":
        concert();
        break;
}







