// Movies view functionality
let currentPage = 1;

// Load movies view
async function loadMoviesView() {
    console.log('Loading movies view');
    showLoading(true);
    currentPage = 1;
    
    try {
        const genreFilter = document.getElementById('movieGenreFilter').value;
        const yearFilter = document.getElementById('movieYearFilter').value;
        const sortBy = document.getElementById('movieSortBy').value;
        
        let endpoint = '/discover/movie?sort_by=' + sortBy;
        if (genreFilter) endpoint += '&with_genres=' + genreFilter;
        if (yearFilter) endpoint += '&year=' + yearFilter;
        endpoint += '&page=' + currentPage;
        
        const data = await fetchFromTMDB(endpoint);
        
        if (data && data.results) {
            displayMovies('moviesGrid', data.results);
        }
    } catch (error) {
        console.error('Error loading movies view:', error);
    } finally {
        showLoading(false);
    }
}