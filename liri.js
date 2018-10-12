// require FS to write to an external log files
var fs = require("fs");

// require DOTENV and have it load the info in .env to the .config() settings
var dotenv = require("dotenv").config();
// console.log(dotenv);

// require the NODE-SPOTIFY-API to be able to use its functionality
var Spotify = require('node-spotify-api');
// console.log(Spotify);

// and require the keys.js file, which holds placeholders for the secret info in .env
var keys = require("./keys.js");
// console.log(keys);

// and then access the Spotify data in the required ./keys.js with keys.spotify
var spotify = new Spotify(keys.spotify);
// console.log(spotify);


// ===============================

// require the REQUST module to make HTTP requests
var request = require('request');

// require the MOMENT module to format datetime objects into desired output format
var moment = require('moment');

// ===============================

// variables for the CLI inputs
var command = process.argv[2];
var mediaName = process.argv.slice(3).join(" ");
// console.log(mediaName);

// ===============================

// a nice divider and newlines to separate entries written to the log.txt file
var divider = "\n\n=================================\n\n"

// ===============================

if (command === 'concert-this') {

    // node liri.js concert-this "Slowdive"
    // node liri.js concert-this "Man Without Country"
    // node liri.js concert-this "Mumford & Sons"

    var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=7ed0c7d7d54a0ea01c5b00adf0d359ea";
    // console.log(bandsInTownAPI);

    request(bandsInTownAPI, function (error, response, body) {

        // use JSON.parse(body) to turn the returned JSON data body into a normal Object
        var bodyData = JSON.parse(body);
        // console.log('new bodyData object:', bodyData); 

        // make variables for properties of the new bodyData whose values you want to use
        var venueName = bodyData[0].venue.name;
        var venueLocation = bodyData[0].venue.city;
        // use MOMENT.JS to format the datetime data received into human-readable data
        var venueDate = moment(bodyData[0].datetime, moment.ISO_8601).format('MMMM Do YYYY, h:mm a');

        // output the requested infomation back to the CLI
        var showData = `${mediaName} are playing at the ${venueName} in ${venueLocation} on ${venueDate}`;

        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function (err) {
            if (err) throw err;
            console.log(showData);
        });

    });


} else if (command === 'spotify-this-song') {

    // node liri.js spotify-this-song Cruel Summer
    // node liri.js spotify-this-song As Long as You Follow 
    // node liri.js spotify-this-song Bizarre Love Triangle 
    // node liri.js spotify-this-song Voices Carry
    // node liri.js spotify-this-song Year of the Cat
    // node liri.js spotify-this-song A Preacher in New England 
    // node liri.js spotify-this-song Before Barbed Wire 
    // node liri.js spotify-this-song Clumsy Sky 
    // node liri.js spotify-this-song Radau 
    // node liri.js spotify-this-song World Princess part II 
    // node liri.js spotify-this-song Algebra of Darkness 
    // node liri.js spotify-this-song Carolyns Fingers 
    // node liri.js spotify-this-song Avatar 
    // node liri.js spotify-this-song Oregon Hill 

    var spotifyAPI;

    if (!mediaName) {

        // then get Rick Rolled: Never Gonna Give You Up by Rick Astley
        spotifyAPI = "https://api.spotify.com/v1/search?q=track%3ANever%20Gonna%20Give%20You%20Up%20artist%3ARick%20Astley&type=track";

        // or, get Aced: The Sign by Ace of Base
        // spotifyAPI = "https://api.spotify.com/v1/search?q=track%3AThe%20Sign%20artist%3AAce%20Of%20Base&type=track";

    } else {
        spotifyAPI = "https://api.spotify.com/v1/search?q=" + mediaName + "&type=track";
    }

    spotify
        .request(spotifyAPI)
        .then(function (data) {

            console.log(data.tracks.items[0].artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].album.name);
            console.log(data.tracks.items[0].preview_url);

            // make variables for properties of the new trackData whose values you want to use
            // var songArtist = data.tracks.items[0].artists[0].name;
            // var songName = data.tracks.items[0].name;
            // var songAlbum = data.tracks.items[0].album.name;
            // var songPreview = data.tracks.items[0].preview_url;

            // or plop all that data into a single variable:
            var songDetails = [
                "Artist: " + data.tracks.items[0].artists[0].name,
                "Song : " + data.tracks.items[0].name,
                "Album : " + data.tracks.items[0].album.name,
                "Preview : " + data.tracks.items[0].preview_url,
            ].join("\n\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", songDetails + divider, function (err) {
                if (err) throw err;
                console.log(songDetails);
            });

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });


} else if (command === 'movie-this') {

    // node liri.js movie-this The Big Blue 
    // node liri.js movie-this The Big Blue 
    // node liri.js movie-this The Big Blue 
    // node liri.js movie-this The Big Blue 
    // node liri.js movie-this The Big Blue 
    // node liri.js movie-this The Big Blue 

    var OMDbAPI;

    if (!mediaName) {

        // Mr. Nobody
        // OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=Mr. Nobody";

        // The Big Blue
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=The Big Blue";

    } else {
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=" + mediaName;
    }

    request(OMDbAPI, function (error, response, body) {

        // use JSON.parse(body) to turn the returned JSON data body into a normal Object
        var OMDbData = JSON.parse(body);
        // console.log('new bodyData object:', bodyData); 

        // make variables for properties of the new bodyData whose values you want to use
        var venueName = OMDbData[0].venue.name;
        var venueLocation = OMDbData[0].venue.city;
        // use MOMENT.JS to format the datetime data received into human-readable data
        var venueDate = moment(OMDbData[0].datetime, moment.ISO_8601).format('MMMM Do YYYY, h:mm a');

        // output the requested infomation back to the CLI
        var movieData = `${mediaName} are playing at the ${venueName} in ${venueLocation} on ${venueDate}`;

        // Append movieData and the divider to log.txt, print movieData to the console
        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
        });

    });



} else if (command === 'do-what-it-says') {
    // console.log(command);
    // console.log(mediaName);


}