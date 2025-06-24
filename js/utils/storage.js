// Storage functions
let watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');

function isInWatchlist(id) {
    return watchlist.some(item => item.id === id);
}

