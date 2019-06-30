# liri-node-app

In this CLI app, the user is able to obtain more information about movies, songs, and upcoming concerts.

Overall, there are four sections:
    1. Search the spotify-node-api for songs using "spotify-this-song" as the first argument and the song title as the second argument. This will output the following information.
        1. Artist name
        2. Song name
        3. Spotify preview link
        4. Album name

        ![Spotify example screenshot](/img/spotify_example.png)
        
    2. Search OMDB api for movies using "movie-this" as the first argument and the movie title as the second argument. This will output the following information.
        1. Movie title
        2. Year
        3. IMDB rating
        4. Rotten Tomatoes rating
        5. Country
        6. Language
        7. Plot

        ![OMDB example screenshot](/img/omdb_example.png)

    3. Search Bands in Town api for concerts using "concert-this" as the first argument and the band/artist name as the second argument. This will output the following information for every upcoming event.
        1. Venue name
        2. Location
        3. Date

        ![Bands In Town example screenshot](/img/bands_in_town_example.png)

    4. The user can also input any of these search terms into the log.txt file separating the first and second arguments with a comma. The user will then enter "do-what-it-says" into the command line. This will output one of the first three options.

        ![do-what-it-says example screenshot](/img/do_what_it_says_example.png)
