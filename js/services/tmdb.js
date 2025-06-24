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

// Populate genre filter
function populateGenreFilter(filterId, genres) {
    const filter = document.getElementById(filterId);
    if (!filter) return;
    
    filter.innerHTML = '<option value="">All Genres</option>';
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.name;
        filter.appendChild(option);
    });
}

// Load trending movies
async function loadTrendingMovies() {
    console.log('Loading trending movies...');
    const data = await fetchFromTMDB('/trending/movie/week');
    
    if (data && data.results) {
        displayMovies('trendingMovies', data.results.slice(0, 12));
    }
}

// Load popular movies
async function loadPopularMovies() {
    console.log('Loading popular movies...');
    const data = await fetchFromTMDB('/movie/popular');
    
    if (data && data.results) {
        displayMovies('popularMovies', data.results.slice(0, 12));
    }
}

