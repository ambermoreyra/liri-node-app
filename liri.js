require("dotenv").config();

const axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2].toLowerCase();
var searchMovie = process.argv.slice(3).join("+");
var searchConcert = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");
var searchTerm = process.argv.slice(3);
var seperate = "=================================";

function spotifySearch() {
    console.log(`\n\nSPOTIFY RESULTS FOR: ${display}\n${seperate}\n`);
    if (process.argv[3] === "") {
        searchTerm = "Closer to Fine";
    }
    spotify.search({
        type: "track",
        query: searchTerm,
        limit: 3,
    }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {

            console.log(`--------------------\nArtist: ${data.tracks.items[i].artists[0].name}\nSong Name: ${data.tracks.items[i].name}\nSpotify Preview Link: ${data.tracks.items[i].preview_url}\nAlbum: ${data.tracks.items[i].album.name}\n--------------------\n\n`);
        }
    })
}

function omdbSearch() {

    if (process.argv[3] === "") {
        searchMovie = "Mean Girls";
    }
    console.log(`\n\nOMDB RESULTS FOR: ${display}\n${seperate}\n`);

    axios.get("http://www.omdbapi.com/?apikey=1557ce71&t=" + searchMovie)
        .then(function (response) {
            console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage: ${response.dataLanguage}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}\n\n`);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function concertSearch() {
    console.log(`\n\n========== UPCOMING CONCERTS FOR: ${display} ==========\n\n`);
    axios.get("https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp").then(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var concertDate = moment(response.data[i].datetime).format("MM/DD/YYYY");
            // console.log(concertDate);
            console.log(`--------------------\nVenue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${concertDate}\n--------------------\n\n`);
        };
    });
};

function doWhatItSays() {

    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArray = data.split(",");
        action = dataArray[0].toLowerCase();
        searchTerm = dataArray[1].replace(/"/g, '').toLowerCase();
        searchMovie = searchTerm.replace(/ /g, "+");
        searchConcert = searchTerm.replace(/ /g, "%20");
        display = dataArray[1].replace(/"/g, '');

        switch (action) {
            case "spotify-this-song":
                spotifySearch();
                break;
            case "movie-this":
                omdbSearch();
                break;
            case "concert-this":
                concertSearch();
                break;
            default:
                return console.log("Please input a proper command.");
        }
    })
}



switch (action) {
    case "concert-this":
        concertSearch();
        break;
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        omdbSearch();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    default:
        console.log("Please input a proper command.")
}