// ------------------------------------------------------------- UNIVERSALS -----------------------------------------------------------------//

var operandum = process.argv[2];

// ------------------------------------------------------------- CONCERT THIS -----------------------------------------------------------------//

// Name of the venue
// Venue location
// Date of the Event (use moment to format this as "MM/DD/YYYY")

// Establish Variables and Require
var axios = require("axios");

var moment = require("moment")

function concert() {

    // Scope variable in function so it doesnt fire other functions(?)
    var artist = process.argv[3];

    // AJAX CalL
    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {

            // Venue Name
            console.log(response.data[0].venue.name);

            // Venue City, Country
            console.log(response.data[0].venue.city + ", " + response.data[0].venue.country);

            // Date of concert
            var rawDate = response.data[0].datetime;
            console.log(moment(rawDate).format("dddd, MMMM Do YYYY, h:mm:ss a"));

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


// Code to read and set any environment variables with the dotenv package:
require("dotenv").config()

// Import the keys.js file and store it in a variable.
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


function spotifyThis() {

    var songName = process.argv[3];

    // Search Method
    spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // Artist Name
        console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));

        // // External Link
        console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));

        // Song Name
        console.log(JSON.stringify(data.tracks.items[0].name, null, 2));

        // Album Name
        console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));


    });

}



// ------------------------------------------------------------- SWITCHBOARD -----------------------------------------------------------------//


switch (operandum) {
    case "concert":
        concert();
        break;
    case "spotify":
        spotifyThis();
        break;
}







