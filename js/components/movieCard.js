// Movie card component
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card bg-dark-200 rounded-xl overflow-hidden cursor-pointer animate-fade-in';
    card.onclick = () => openMovieModal(movie);
    
    const posterUrl = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : '/api/placeholder/300/450';
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = movie.release_date || movie.first_air_date 
        ? new Date(movie.release_date || movie.first_air_date).getFullYear()
        : '';
    
    card.innerHTML = `
        <div class="relative">
            <img src="${posterUrl}" alt="${movie.title || movie.name}" class="w-full h-64 object-cover">
            <div class="absolute top-2 right-2 bg-black/80 text-white px-2 py-1 rounded-full text-sm">
                <i class="fas fa-star star-rating mr-1"></i>${rating}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div class="p-3 w-full">
                    <button onclick="event.stopPropagation(); toggleWatchlistItem(${JSON.stringify(movie).replace(/"/g, '&quot;')})" 
                            class="w-full bg-primary text-black py-2 rounded-lg font-semibold hover:bg-primary/80 transition-colors">
                        <i class="fas fa-bookmark mr-2"></i>
                        ${isInWatchlist(movie.id) ? 'Remove' : 'Add to Watchlist'}
                    </button>
                </div>
            </div>
        </div>
        <div class="p-4">
            <h3 class="font-semibold text-white truncate">${movie.title || movie.name}</h3>
            <p class="text-gray-400 text-sm">${year}</p>
        </div>
    `;
    
    return card;
}

// Display movies in grid
function displayMovies(containerId, movies) {
    console.log(`Displaying ${movies.length} items in ${containerId}`);
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        container.appendChild(movieCard);
    });
}