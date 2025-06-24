// Storage functions
let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

function isInWatchlist(id) {
    return watchlist.some(item => item.id === id);
}

function toggleWatchlistItem(movie) {
    console.log('Toggling watchlist for:', movie.title || movie.name);
    const index = watchlist.findIndex(item => item.id === movie.id);
    
    if (index === -1) {
        watchlist.push(movie);
        showToast(`Added "${movie.title || movie.name}" to watchlist`);
    } else {
        watchlist.splice(index, 1);
        showToast(`Removed "${movie.title || movie.name}" from watchlist`);
    }
    
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    // Update watchlist view if currently active
    if (currentView === 'watchlist') {
        showWatchlist();
    }
    
    // Close modal and refresh if needed
    closeModal();
}