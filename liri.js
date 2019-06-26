require("dotenv").config();

const axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2].toLowerCase();
var searchMovie = process.argv.slice(3).join("+");
var searchConcert = process.argv.slice(3).join("%20");
var display = process.argv.slice(3).join(" ");
var searchTerm = process.argv.slice(3);

function spotifySearch() {
    console.log("This is the spotify search");
    if(process.argv.length === 3){
        searchTerm = "Closer to Fine";
    }
    spotify.search({
        type: "track",
        query: searchTerm,
        limit: 3,
    }, function(err,data) {
        if(err) {
            return console.log("Error occurred: " + err);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {

        console.log(`Artist: ${data.tracks.items[i].artists[0].name}\nSong Name: ${data.tracks.items[i].name}\nSpotify Preview Link: ${data.tracks.items[i].preview_url}\nAlbum: ${data.tracks.items[i].album.name}\n\n`);
    }
    })
}

function omdbSearch() {
    
    if(process.argv.length === 3){
        searchMovie = "Mean Girls";
    }

    axios.get("http://www.omdbapi.com/?apikey=1557ce71&t=" + searchMovie)
        .then(function (response) {
        
            console.log(`Title: ${response.data.Title}\nYear: ${response.data.Year}\nIMDB Rating: ${response.data.imdbRating}\nRotten Tomatoes Rating: ${response.data.Ratings[1].Value}\nCountry: ${response.data.Country}\nLanguage: ${response.data.Language}\nPlot: ${response.data.Plot}\nActors: ${response.data.Actors}`);

        })
        .catch(function (error) {
            console.log(error);
        })
    console.log("This is the OMDB search");
}

function concertSearch() {
    console.log(`\n\nUpcoming concerts for ${display}\n\n`);
    axios.get("https://rest.bandsintown.com/artists/" + searchConcert + "/events?app_id=codingbootcamp").then(function (response) {
     for (var i = 0; i < response.data.length; i++) {
         console.log(`Venue: ${response.data[i].venue.name}\nLocation: ${response.data[i].venue.city}, ${response.data[i].venue.region}, ${response.data[i].venue.country}\nDate: ${moment}(${response.data[i].datetime}).${format(MM/DD/YYYY)}\n\n`);
     };
    });
  };
function doThis() {
    console.log("This is Do This");
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
        doThis();
        break;
    default:
        console.log("Please input proper command.")
}