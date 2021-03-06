// --------------------------------------------------------- UNIVERSALS / REQUIRES -----------------------------------------------------------//

require("dotenv").config();

var fs = require("fs");

var moment = require("moment");

var axios = require("axios");

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

var operandum = process.argv[2];

var searchTerm = process.argv.slice(3).join(" ");

var divider = "\n------------------------------------------------------------\n\n";


// ------------------------------------------------------------- CONCERT THIS ---------------------------------------------------------------//

function concert() {

    console.log(searchTerm)

    // AJAX CalL
    axios
        .get("https://rest.bandsintown.com/artists/" + searchTerm + "/events?app_id=codingbootcamp")
        .then(function (response) {

            var thingData = [
                // Venue Name
                "Venue Name: " + response.data[0].venue.name,

                // Venue City, Country
                "Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country,

                // Date of concert
                rawDate = response.data[0].datetime,
                "Date: " + moment(rawDate).format("dddd, MMMM Do YYYY, h:mm:ss a"),

            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", thingData + divider, function (err) {
                if (err)
                    throw err;
                console.log(thingData);
            });


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

function spotifyThis() {

    // Search Method
    spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var thingData = [

            // Song Name
            "Song: " + JSON.stringify(data.tracks.items[0].name, null, 2),

            // Artist Name
            "Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2),

            // Album Name
            "Album: " + JSON.stringify(data.tracks.items[0].album.name, null, 2),

            // // External Link
            "Link: " + JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2),
        ].join("\n\n");


        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", thingData + divider, function (err) {
            if (err)
                throw err;
            console.log(thingData);
        });
    });
}

// ------------------------------------------------------------- OMDB -----------------------------------------------------------------//

function movieThis() {

    // // If it's two words...not sure the exact best way to handle, some sort of user validation based off the number of spaces or the argvs?
    // var searchTerm = process.argv[3] + "+" + process.argv[4];

    // AJAX CalL
    axios
        .get("https://www.omdbapi.com/?t=" + searchTerm + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {

            var thingData = [
                // Title
                "Title: " + response.data.Title,

                // Year the movie came out
                "Release Date: " + response.data.Released,

                // IMDB Rating of the movie.
                "IMDB Rating: " + response.data.Ratings[0].Value,

                // Rotten Tomatoes Rating of the movie.
                "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value,

                // Country where the movie was produced.
                "Country of Production: " + response.data.Country,

                // * Language of the movie.
                "Language(s): " + response.data.Language,

                // * Plot of the movie.
                "Plot: " + response.data.Plot,

                // * Actors in the movie.
                "Actors: " + response.data.Actors,

            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", thingData + divider, function (err) {
                if (err)
                    throw err;
                console.log(thingData);
            });

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

// ------------------------------------------------------------- DO WHAT IT SAYS ---------------------------------------------------------------//

function doWhatSay() {

    // We will read the existing bank file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.split("-");

        // Operandum
        operandum = data[0];

        // Zooming in on data to do a second split
        refinedData = data[2].split(",")

        // Search Term
        secondStageTerm = refinedData[1];

        // Get the quotes off search term
        searchTerm = secondStageTerm.slice(1, -1);

        console.log(operandum + searchTerm);

        // Switchboard Within DoWhatSay
        switch (operandum) {
            case "concert":
                concert();
                break;
            case "spotify":
                spotifyThis();
                break;
            case "omdb":
                movieThis();
                break;
        }
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
    case "omdb":
        movieThis();
        break;
    case "dowhatsay":
        doWhatSay();
        break;
}







