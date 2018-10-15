# LIRI Node App

### LIRI Node App, a CLI Language Interpretation and Recognition Interface

LIRI is a Command Line Interface node.js app that provides information about a band's next show from BandsInTown, a song's Spotify info, or a movie's OMDb info. These functions are accessed by the commands:

$ node liri concert-this <band name>
$ node liri spotify-this-song <song name>
$ node liri movie-this <movie name>

A random band, song, or movie (from a short hard-coded list in random.txt) can be obtained with:

$ node liri rando

And a single hard-coded response for each category will be returned by these commands:

$ node liri
$ node liri concert-this
$ node liri spotify-this-song
$ node liri movie-this

LIRI also features error-handlers to prevent the code from breaking if no information is found about the requested item or if any cateogry of information is missing for a requested item.

NOTE: to use this app, you must obtain your own API keys