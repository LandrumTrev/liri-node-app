// require DOTENV and have it load the info in .env to the .config() settings
// require("dotenv").config();

// and require the keys.js file, which holds placeholders for the secret info in .env
// use the capital letter convention on variables that are imported data
// var Keys = require("./keys.js");

// and then access the Spotify data in the required ./keys.js with keys.spotify
// var spotify = new Spotify(keys.spotify);

// ===============================

// require the REQUST module to make HTTP requests
var request = require('request');

// require the MOMENT module to format datetime objects into desired output format
var moment = require('moment');

// ===============================

var command = process.argv[2];
var mediaName = process.argv[3];

if (command === 'concert-this') {
    // console.log(command);
    // console.log(mediaName);

    var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + mediaName + "/events?app_id=7ed0c7d7d54a0ea01c5b00adf0d359ea";
    // console.log(bandsInTownAPI);

    request(bandsInTownAPI, function (error, response, body) {

        // console.log('error:', error); 
        // console.log('statusCode:', response && response.statusCode); 
        // console.log('body:', body); 

        // use JSON.parse(body) to turn the returned JSON data body into a normal Object
        var bodyData = JSON.parse(body);
        // console.log('new bodyData object:', bodyData); 

        // make variables for properties of the new bodyData whose values you want to use
        var venueName = bodyData[0].venue.name;
        var venueLocation = bodyData[0].venue.city;
        // use MOMENT.JS to format the datetime data received into human-readable data
        var venueDate = moment(bodyData[0].datetime, moment.ISO_8601).format('MMMM Do YYYY, h:mm a');

        // output the requested infomation back to the CLI
        console.log(`${mediaName} are playing at the ${venueName} in ${venueLocation} on ${venueDate}`);

        // node liri.js concert-this "Slowdive"
        // node liri.js concert-this "Man Without Country"
        // node liri.js concert-this "Mumford & Sons"

    });


} else if (command === 'spotify-this-song') {
    console.log(command);
    console.log(mediaName);


} else if (command === 'movie-this') {
    console.log(command);
    console.log(mediaName);


} else if (command === 'do-what-it-says') {
    console.log(command);
    console.log(mediaName);


}