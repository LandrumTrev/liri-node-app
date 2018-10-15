# LIRI Node App

### LIRI Node App, a CLI Language Interpretation and Recognition Interface

Node.js, npm, node_modules (fs, dotenv, request, moment, node-spotify-api), log file, error-handling, and protected API keys: BandsInTown, Spotify, OMDb. Takes in band, song, or movie information requests from the terminal, makes an async call to one of three APIs, and outputs the returned info to the console as well as logging it to a .txt file.
_________________________________________________

LIRI is a Command Line Interface node.js app that provides information about a band's next show from BandsInTown, a song's Spotify info, or a movie's OMDb info. The information returned is both printed out to the CLI console and logged into the log.txt file. 

LIRI's functions are accessed by the Terminal commands:

```
$ node liri concert-this <band name>
$ node liri spotify-this-song <song name>
$ node liri movie-this <movie name>
```

A semi-random band, song, or movie (from a hard-coded list in random.txt) can be obtained with:

```
$ node liri rando
```

And a single hard-coded response for each category will be returned by these commands:

```
$ node liri
$ node liri concert-this
$ node liri spotify-this-song
$ node liri movie-this
```

LIRI also features error-handlers to prevent the code from breaking if no information is found about the requested item or if any cateogry of information is missing for a requested item.

NOTE: to use this app, you must obtain your own API keys from [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api), [SPOTIFY API](https://developer.spotify.com/documentation/web-api/quick-start/), and [OMDB API](http://www.omdbapi.com).

When you have your personal API keys, create a file called .env in the app's root directory and place this code inside it, replacing the xxxxxx with your API keys:


```
# Spotify API keys
SPOTIFY_ID=xxxxxx
SPOTIFY_SECRET=xxxxxx

# BandsInTown API key
BITAPIKEY=xxxxxx

# OMDb API key
OMDBAPIKEY=xxxxxx
```
_________________________________________________

[source: https://github.com/LandrumTrev/liri-node-app](https://github.com/LandrumTrev/liri-node-app)

###### ©2018 Richard Trevillian
###### University of Richmond, Full Stack Web Development Bootcamp
###### 2018-10-14