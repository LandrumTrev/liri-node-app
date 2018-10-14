// ====================================================
// LIRI BOT node app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================


// ====================================================
// REQURED MODULES BELOW
// ====================================================

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

// require the REQUST module to make HTTP requests
var request = require('request');

// require the MOMENT module to format datetime objects into desired output format
var moment = require('moment');

// ====================================================

// and then access the Spotify data in the required ./keys.js with keys.spotify
var spotify = new Spotify(keys.spotify);
// console.log(spotify);

// ====================================================

// divider and newlines to separate entries written to the log.txt file
var divider = "\n ================================= \n\n"



// ====================================================
// ARGV INPUT VARIABLES
// ====================================================

// node = process.argv[0];
// liri or liri.js = process.argv[1];
var command = process.argv[2];
var mediaName = process.argv.slice(3).join(" ");
// var command;
// var mediaName;

// global var for a random {command: mediaName} from random.txt data
// var randomObject;

// ====================================================
// FUNCTION CHOOSER BASED ON INPUT ARGS
// ====================================================


if (command === 'rando') {

    randoData();

} else {

    var command = process.argv[2];
    var mediaName = process.argv.slice(3).join(" ");
    apiSelector();

}



// ====================================================
// RANDO BELOW
// ====================================================


function apiSelector() {

    if (command === 'concert-this') {

        getBandsintownData(mediaName);

    } else if (command === 'spotify-this-song') {

        getSpotifyData(mediaName);

    } else if (command === 'movie-this') {

        getOMDbData(mediaName);

    }

};




// ====================================================
// RANDO BELOW
// ====================================================

function randoData() {

    // use FS to read the random.txt file
    fs.readFile('./random.txt', 'utf8', function read(err, data) {

        if (err) {
            throw err;
        }

        // set a variable to stand for the text contents of the file
        var randomTxtCSV = data;

        // send that text content to a function to be processed
        csvToArray(randomTxtCSV);

    });

    // console.log(fs.readFile.randomObject);
    // return fs.readFile;


    // function that processes the data from the random.txt file
    function csvToArray(csv) {

        // use .split to make the file data an Array
        // with a new Array element created for each newline
        randomTxtArray = csv.split('\n');
        // console.log(randomTxtArray);

        // define a new Array that will hold all the individual lines
        // {'command':'"mediaName"'} objects
        var objectArray = [];

        // define an Object structure for the individual lines
        // {'command':'"mediaName"'} objects
        var arrayObject = {};

        // then loop over every element of the raw all-data Array
        // ['command,"mediaName"', 'command,"mediaName"', ...]
        // and split each Array element into an Object
        for (var i = 0; i < randomTxtArray.length; i++) {

            // make each Array element its own mini Array
            // [ 'concert-this', '"Dead Can Dance"' ]
            // [ 'concert-this', '"Thievery Corporation"' ]
            var commandSubject = randomTxtArray[i].split(',');
            // console.log(commandSubject);

            // separate out each first element for an object key
            var theKey = commandSubject[0];
            // console.log(theKey);

            // separate out each second element for an object value
            // and .replace every " with nothing
            var theValue = commandSubject[1].replace(/["]+/g, '');
            // console.log(theValue);

            // take theKey and theValue, construct an Object, 
            // and push them into the objectArray
            objectArray.push({
                [theKey]: theValue
            });

        };

        // after loop finishes, print out the resulting filled objectArray:
        // csv content of random.txt turned into an Array of Objects
        // console.log(objectArray);

        // then get a random number between 1 and the length of objectArray
        var randomNumber = Math.floor(Math.random() * objectArray.length) + 1;
        // console.log(randomNumber);

        // and use the random number to pick one random object out of objectArray
        var randomObject = objectArray[randomNumber];
        // console.log(randomObject);

        // set the COMMAND value to the string value of randomObject's single KEY
        command = Object.keys(randomObject).toString();
        // console.log(command);

        // set the MEDIANAME value to the string value of randomObject's single VALUE
        mediaName = Object.values(randomObject).toString();
        // console.log(mediaName);

        // and call the apiSelector function with random input values now set
        apiSelector();

        // node liri.js rando
    };
};



// ====================================================
// BANDSINTOWN BELOW
// ====================================================


function getBandsintownData(mName) {

    var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + mName + "/events?app_id=7ed0c7d7d54a0ea01c5b00adf0d359ea";
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

};



// ====================================================
// SPOTIFY BELOW
// ====================================================



function getSpotifyData(mName) {

    var spotifyAPI;

    if (!mName) {

        // then get Rick Rolled: Never Gonna Give You Up by Rick Astley
        spotifyAPI = "https://api.spotify.com/v1/search?q=track%3ANever%20Gonna%20Give%20You%20Up%20artist%3ARick%20Astley&type=track";

        // or, get Aced: The Sign by Ace of Base
        // spotifyAPI = "https://api.spotify.com/v1/search?q=track%3AThe%20Sign%20artist%3AAce%20Of%20Base&type=track";

    } else {
        spotifyAPI = "https://api.spotify.com/v1/search?q=" + mName + "&type=track";
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
            ].join("\n");

            // Append showData and the divider to log.txt, print showData to the console
            fs.appendFile("log.txt", songDetails + divider, function (err) {
                if (err) throw err;
                console.log(songDetails);
            });

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

};



// ====================================================
// OMDb BELOW
// ====================================================



// function that calls the OMDb API
function getOMDbData(mName) {

    var OMDbAPI;

    if (!mName) {

        // Mr. Nobody
        // OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=Mr. Nobody";

        // The Big Blue
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=The Big Blue";

    } else {
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=" + mName;
    }

    request(OMDbAPI, function (error, response, body) {

        // use JSON.parse(body) to turn JSON data body into a normal Object
        var OMDbData = JSON.parse(body);
        // console.log(body); 
        // console.log(OMDbData);

        // * Title of the movie.
        var movieTitle = OMDbData.Title;
        // * Year the movie came out.
        var movieYear = OMDbData.Year;
        // * IMDB Rating of the movie.
        var movieIMDbRating = OMDbData.Ratings[0].Value;
        // * Rotten Tomatoes Rating of the movie.
        var movieRTRating = OMDbData.Ratings[1].Value;
        // * Country where the movie was produced.
        var movieCountry = OMDbData.Country;
        // * Language of the movie.
        var movieLanguage = OMDbData.Language;
        // * Actors in the movie.
        var movieActors = OMDbData.Actors;
        // * Plot of the movie.
        var moviePlot = OMDbData.Plot;

        // or plop all that data into a single variable:
        var movieData = [
            "Title: " + movieTitle,
            "Year: " + movieYear,
            "IMDb Rating: " + movieIMDbRating,
            "Rotten Tomatoes Rating: " + movieRTRating,
            "Country: " + movieCountry,
            "Language: " + movieLanguage,
            "Actors: " + movieActors,
            "Plot: " + moviePlot,
        ].join("\n");

        // Append movieData and the divider to log.txt, print movieData to the console
        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(movieData);
        });
    });
};



// ====================================================
// SAMPLE ENTRIES FROM/FOR THE random.txt FILE
// ====================================================

// node liri.js rando

// node liri.js concert-this Dead Can Dance
// node liri.js concert-this The Birthday Massacre
// node liri.js concert-this Thievery Corporation
// node liri.js concert-this Sting
// node liri.js concert-this Sigur Ros
// node liri.js concert-this Royksopp
// node liri.js concert-this Nine Inch Nails
// node liri.js concert-this Neko Case
// node liri.js concert-this New Order
// node liri.js concert-this Mylène Farmer
// node liri.js concert-this Morrissey
// node liri.js concert-this Michael Brook
// node liri.js concert-this M83
// node liri.js concert-this Lykke Li
// node liri.js concert-this Hooverphonic
// node liri.js concert-this Grimes
// node liri.js concert-this God Is an Astronaut
// node liri.js concert-this The Church
// node liri.js concert-this Above & Beyond
// node liri.js concert-this Slowdive
// node liri.js concert-this Man Without Country
// node liri.js concert-this Mumford & Sons

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
// node liri.js spotify-this-song Shape of My Heart 

// node liri.js movie-this The Big Blue 
// node liri.js movie-this Leon The Professional 
// node liri.js movie-this La Femme Nikita 
// node liri.js movie-this 2001 A Space Odyssey 
// node liri.js movie-this Amelie 
// node liri.js movie-this Avatar 
// node liri.js movie-this Bolero 
// node liri.js movie-this Despicable Me 
// node liri.js movie-this Euro Trip 
// node liri.js movie-this The Last Mimzy 
// node liri.js movie-this The Life Aquatic with Steve Zissou 
// node liri.js movie-this The Princess Bride 
// node liri.js movie-this The Pink Panther 
// node liri.js movie-this The Wicker Man 
// node liri.js movie-this Tropic Thunder 
// node liri.js movie-this Watership Down 
// node liri.js movie-this The X-Files Fight the Future 
// node liri.js movie-this The Jerk 
// node liri.js movie-this The Hunger 
// node liri.js movie-this Talladega Nights 
// node liri.js movie-this Straight to Hell 
// node liri.js movie-this Spaceballs

// node liri.js rando