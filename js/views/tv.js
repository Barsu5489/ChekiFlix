// Load TV view
async function loadTVView() {
    console.log('Loading TV view');
    showLoading(true);
    currentPage = 1;
    
    try {
        const genreFilter = document.getElementById('tvGenreFilter').value;
        const sortBy = document.getElementById('tvSortBy').value;
        
        let endpoint = '/discover/tv?sort_by=' + sortBy;
        if (genreFilter) endpoint += '&with_genres=' + genreFilter;
        endpoint += '&page=' + currentPage;
        
        const data = await fetchFromTMDB(endpoint);
        
        if (data && data.results) {
            displayMovies('tvGrid', data.results);
        }
    } catch (error) {
        console.error('Error loading TV view:', error);
    } finally {
        showLoading(false);
    }
}