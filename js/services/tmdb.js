// TMDB service functions
let movieGenres = [];
let tvGenres = [];

// Load genres
async function loadGenres() {
    console.log('Loading genres...');
    const [movieGenresData, tvGenresData] = await Promise.all([
        fetchFromTMDB('/genre/movie/list'),
        fetchFromTMDB('/genre/tv/list')
    ]);
    
    if (movieGenresData) {
        movieGenres = movieGenresData.genres;
        populateGenreFilter('movieGenreFilter', movieGenres);
    }
    
    if (tvGenresData) {
        tvGenres = tvGenresData.genres;
        populateGenreFilter('tvGenreFilter', tvGenres);
    }
}

