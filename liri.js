// require DOTENV and have it load the info in .env to the .config() settings
// require("dotenv").config();

// and require the keys.js file, which holds placeholders for the secret info in .env
// use the capital letter convention on variables that are imported data
// var Keys = require("./keys.js");

// and then access the Spotify data in the required ./keys.js with keys.spotify
// var spotify = new Spotify(keys.spotify);

// ===============================

// 9. Make it so liri.js can take in one of the following commands:
//    * `concert-this`
//    * `spotify-this-song`
//    * `movie-this`
//    * `do-what-it-says`


var command = process.argv[2];
var mediaName = process.argv[3];

if( command === 'concert-this' ) {
    console.log(command);
    console.log(mediaName);


} else if( command === 'spotify-this-song') {
    console.log(command);
    console.log(mediaName);


} else if( command === 'movie-this') {
    console.log(command);
    console.log(mediaName);


} else if( command === 'do-what-it-says') {
    console.log(command);
    console.log(mediaName);

    
}

