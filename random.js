var randomSelect = Math.floor(Math.random() * 3) + 1;
console.log(randomSelect);

if (randomSelect === 1) {
    command = 'concert-this';
} else if (randomSelect === 2) {
    command = 'spotify-this-song';
} else if (randomSelect === 3) {
    command = 'movie-this';
}
console.log(command);
