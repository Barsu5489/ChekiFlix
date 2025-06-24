// Show watchlist
function showWatchlist() {
    console.log('Showing watchlist:', watchlist.length, 'items');
    const watchlistGrid = document.getElementById('watchlistGrid');
    const emptyWatchlist = document.getElementById('emptyWatchlist');
    
    if (watchlist.length === 0) {
        watchlistGrid.innerHTML = '';
        emptyWatchlist.classList.remove('hidden');
    } else {
        emptyWatchlist.classList.add('hidden');
        displayMovies('watchlistGrid', watchlist);
    }
}