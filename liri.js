// ====================================================
// LIRI BOT node app
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================

// NOTE: band/song/movie names containing "&" will cause minor errors
// use "and" instead of "&" in names


// ====================================================
// REQURED MODULES BELOW
// ====================================================

// require FS to write to an external log files
var fs = require("fs");

// require DOTENV so it can load the info in .env to the .config() settings
var dotenv = require("dotenv").config();

// and require the keys.js file, which holds placeholders for the secret info in .env
var keys = require("./keys.js");

// require the REQUST module to make HTTP requests
var request = require('request');

// require the MOMENT module to format datetime objects into desired output format
var moment = require('moment');

// require the NODE-SPOTIFY-API to be able to use its functionality
var Spotify = require('node-spotify-api');

// ====================================================

// and then access the Spotify data in the required ./keys.js with keys.spotify
var spotify = new Spotify(keys.spotify);

// ====================================================

// divider and newlines to separate entries written to the console and log.txt file
var divider = "\n\n+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=\n\n"



// ====================================================
// ARGV INPUT VARIABLES
// ====================================================

var command = process.argv[2];
var mediaName = process.argv.slice(3).join(" ");


// ====================================================
// FUNCTION CHOOSER BASED ON INPUT ARGS
// ====================================================

if (command === 'rando') {

    // if user enters $node liri rando
    randoData();

} else {

    if (!command) {

        // if user enters $node liri
        command = "spotify-this-song";
        mediaName = "Never Gonna Give You Up";

        apiSelector();

    } else {

        // if user enters $node liri <command> <mediaName>
        apiSelector();
    }
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

// FUNCTION CALLED BY: node liri.js rando
function randoData() {

    // use FS to read the random.txt file
    fs.readFile('./random.txt', 'utf8', function read(err, data) {

        if (err) {
            throw err;
        }

        // set a variable to stand for the text contents of the file
        var randomTxtCSV = data;

        // send random.txt file contents to csvArray(csv) to format data
        csvToArray(randomTxtCSV);

    });


    // function that formats the data from the random.txt file
    function csvToArray(csv) {

        // make the file data an Array, .split() at each new line
        randomTxtArray = csv.split('\n');
        // console.log(randomTxtArray);

        // Array that will hold all the individual {'command':'"mediaName"'} objects
        var objectArray = [];

        // Object structure for each {'command':'"mediaName"'} object
        var arrayObject = {};

        // loop through randomTxtArray ['command,"mediaName"', 'command,"mediaName"', ...]
        for (var i = 0; i < randomTxtArray.length; i++) {

            // .split() each element into its own two-element Array [ 'concert-this', '"Dead Can Dance"' ]
            var commandSubject = randomTxtArray[i].split(',');
            // console.log(commandSubject);

            // make a key variable out of the first element of the two-element Array
            var theKey = commandSubject[0];
            // console.log(theKey);

            // make a value variable out of the second element of the two-element Array
            // and strip off the surrounding quotes
            var theValue = commandSubject[1].replace(/["]+/g, '');
            // console.log(theValue);

            // then take theKey and theValue, construct an Object, 
            // and push each Object into objectArray, which holds Object-ified data from random.txt
            objectArray.push({
                [theKey]: theValue
            });

        };

        // print the resulting objectArray to check it
        // console.log(objectArray);

        // then get a random number between 1 and the length of objectArray
        var randomNumber = Math.floor(Math.random() * objectArray.length) + 1;
        // console.log(randomNumber);

        // and use that random number to pick one object out of objectArray
        var randomObject = objectArray[randomNumber];
        // console.log(randomObject);

        // COMMAND: catch any input data errors in the command input data 
        // by replacing command with a hard-coded value
        if (randomObject === null || randomObject === undefined) {
            command = "concert-this";
        } else {
            command = Object.keys(randomObject).toString();
        }

        // MEDIANAME: catch any input data errors in the mediaName input data 
        // by replacing mediaName with a hard-coded value
        if (randomObject === null || randomObject === undefined) {
            mediaName = "Thievery Corporation";
        } else {
            mediaName = Object.values(randomObject).toString();
        }

        // and call the apiSelector function with input values now set
        apiSelector();
    };
};
// FUNCTION CALLED BY: node liri.js rando



// ====================================================
// BANDSINTOWN BELOW
// ====================================================

// FUNCTION CALLED BY: node liri.js concert-this George Winston
// function gets called with (mediaName) passed into it's (nName) argument
// but if no (mediaName) is passed into the function, then...
// DEAD CAN DANCE FUNCTIONALITY CALLED BY: node liri.js concert-this
function getBandsintownData(mName) {

    if (!mName) {

        // Dead Can Dance
        var bandsInTownAPI = "https://rest.bandsintown.com/artists/Dead+Can+Dance/events?app_id=7ed0c7d7d54a0ea01c5b00adf0d359ea";

    } else {

        var bandsInTownAPI = "https://rest.bandsintown.com/artists/" + mName + "/events?app_id=7ed0c7d7d54a0ea01c5b00adf0d359ea";
        // console.log(bandsInTownAPI);

    }

    request(bandsInTownAPI, function (error, response, body) {

        // use JSON.parse(body) to turn the returned JSON data body into a normal Object
        var bodyData = JSON.parse(body);
        // console.log('new bodyData object:', bodyData); 


        // set variables for data, with error handlers for no returned property value set
        if (bodyData[0] === undefined || bodyData[0].lineup === undefined) {
            var theLineup = "(no band info)";
        } else {
            var theLineup = bodyData[0].lineup;
        }

        if (bodyData[0] === undefined || bodyData[0].venue === undefined || bodyData[0].venue.name === undefined) {
            var venueName = "(no venue name info)";
        } else {
            var venueName = bodyData[0].venue.name;
        }

        if (bodyData[0] === undefined || bodyData[0].venue === undefined || bodyData[0].venue.city === undefined) {
            var venueLocation = "(no city info)";
        } else {
            var venueLocation = bodyData[0].venue.city;
        }

        if (bodyData[0] === undefined || bodyData[0].datetime === undefined) {
            var venueDate = "(no date info)";
        } else {
            var venueDate = moment(bodyData[0].datetime, moment.ISO_8601).format('MMMM Do YYYY, h:mm a');
        }


        // construct a String Literal for reader-friendly output of the data
        var showData = `${mediaName}: ${theLineup} are playing at the ${venueName} in ${venueLocation} on ${venueDate}`;

        // and then append the data entry to log.txt, and also output it to the console
        fs.appendFile("log.txt", showData + divider, function (err) {
            if (err) throw err;
            console.log(divider + showData + divider);
        });
    });
};
// function gets called with (mediaName) passed into it's (nName) argument
// but if no (mediaName) is passed into the function, then...
// DEAD CAN DANCE FUNCTIONALITY CALLED BY: node liri.js concert-this



// ====================================================
// SPOTIFY BELOW
// ====================================================

// FUNCTION CALLED BY: node liri.js spotify-this-song Enter Sandman
// function gets called with (mediaName) passed into it's (nName) argument
// but if no (mediaName) is passed into the function, then...
// RICK-ROLLED FUNCTIONALITY CALLED BY: node liri.js spotify-this-song
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

    // construct a new Spotify() object with node-spotify-api
    // with an Async .request and .then Promise function to handle returned data
    spotify
        .request(spotifyAPI)
        .then(function (data) {

            // set variables for data, with error handlers for no returned property value set
            if (data.tracks.items[0].artists[0].name === undefined) {
                var songArtist = "no info";
            } else {
                var songArtist = data.tracks.items[0].artists[0].name;
            }

            if (data.tracks.items[0].name === undefined) {
                var songName = "no info";
            } else {
                var songName = data.tracks.items[0].name;
            }

            if (data.tracks.items[0].album.name === undefined) {
                var songAlbum = "no info";
            } else {
                var songAlbum = data.tracks.items[0].album.name;
            }

            if (data.tracks.items[0].preview_url === undefined) {
                var songPreview = "no info";
            } else {
                var songPreview = data.tracks.items[0].preview_url;
            }

            // and then put all those variables' data into an Array:
            var songDetails = [
                "Artist: " + songArtist,
                "Song : " + songName,
                "Album : " + songAlbum,
                "Preview : " + songPreview,
            ].join("\n");

            // append the songDetails data array to log.txt, and also output it to the CLI
            fs.appendFile("log.txt", songDetails + divider, function (err) {
                if (err) throw err;
                console.log(divider + songDetails + divider);
            });

        })
        .catch(function (err) {
            console.error('Error occurred: ' + err);
        });

};
// function gets called with (mediaName) passed into it's (nName) argument
// but if no (mediaName) is passed into the function, then...
// RICK-ROLLED FUNCTIONALITY CALLED BY: node liri.js spotify-this-song



// ====================================================
// OMDb BELOW
// ====================================================

// function gets called with (mediaName) passed into it's (nName) argument
// FUNCTION CALLED BY: node liri.js movie-this Lucy
// but if no (mediaName) is passed into the function, then...
// LUC BESSON GRAPHIC NOVEL FUNCTIONALITY CALLED BY: node liri.js movie-this
function getOMDbData(mName) {

    var OMDbAPI;

    if (!mName) {

        // Valerian and the City of a Thousand Planets
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=Valerian+and+the+City+of+a+Thousand+Planets";

    } else {
        OMDbAPI = "http://www.omdbapi.com/?i=tt3896198&apikey=a7b952c&t=" + mName;
    }

    request(OMDbAPI, function (error, response, body) {

        // use JSON.parse(body) to turn JSON data body into a normal Object
        var OMDbData = JSON.parse(body);
        // console.log(body); 
        // console.log(OMDbData);


        // set variables for data, with error handlers for no returned property value set
        if (OMDbData.Title === undefined) {
            var movieTitle = "no info";
        } else {
            var movieTitle = OMDbData.Title;
        }

        if (OMDbData.Year === undefined) {
            var movieYear = "no info";
        } else {
            var movieYear = OMDbData.Year;
        }

        if (OMDbData.Ratings === undefined || OMDbData.Ratings[0] === undefined) {
            var movieIMDbRating = "no info";
        } else {
            var movieIMDbRating = OMDbData.Ratings[0].Value;
        }

        if (OMDbData.Ratings === undefined || OMDbData.Ratings[1] === undefined) {
            var movieRTRating = "no info";
        } else {
            var movieRTRating = OMDbData.Ratings[1].Value;
        }

        if (OMDbData.Country === undefined) {
            var movieCountry = "no info";
        } else {
            var movieCountry = OMDbData.Country;
        }

        if (OMDbData.Language === undefined) {
            var movieLanguage = "no info";
        } else {
            var movieLanguage = OMDbData.Language;
        }

        if (OMDbData.Actors === undefined) {
            var movieActors = "no info";
        } else {
            var movieActors = OMDbData.Actors;
        }

        if (OMDbData.Plot === undefined) {
            var moviePlot = "no info";
        } else {
            var moviePlot = OMDbData.Plot;
        }

        // put all the movie data values into an Array
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

        // and append the movie data to random.txt, and also print it out to the console
        fs.appendFile("log.txt", movieData + divider, function (err) {
            if (err) throw err;
            console.log(mediaName + "\n" + divider + movieData + divider);
        });
    });
};
// FUNCTION CALLED BY: node liri.js movie-this Lucy
// but if no (mediaName) is passed into the function, then...
// LUC BESSON GRAPHIC NOVEL FUNCTIONALITY CALLED BY: node liri.js movie-this
