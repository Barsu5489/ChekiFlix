// Home view functionality
// Load hero content
async function loadHeroContent() {
    console.log('Loading hero content...');
    const data = await fetchFromTMDB('/trending/movie/week');
    
    if (data && data.results.length > 0) {
        currentHeroMovie = data.results[0];
        displayHeroContent(currentHeroMovie);
    }
}

// Display hero content
function displayHeroContent(movie) {
    console.log('Displaying hero content:', movie.title);
    const heroSection = document.getElementById('heroSection');
    const heroTitle = document.getElementById('heroTitle');
    const heroOverview = document.getElementById('heroOverview');
    
    if (movie.backdrop_path) {
        heroSection.style.background = `linear-gradient(rgba(10, 10, 10, 0.5), rgba(10, 10, 10, 0.7)), url(${BACKDROP_BASE_URL}${movie.backdrop_path})`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
    }
    
    heroTitle.textContent = movie.title || movie.name;
    heroOverview.textContent = movie.overview;
}

function toggleWatchlist() {
    if (currentHeroMovie) {
        toggleWatchlistItem(currentHeroMovie);
    }
}