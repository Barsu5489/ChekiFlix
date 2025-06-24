let currentSearchQuery = '';
let searchTimeout;

// Search functionality
async function performSearch(query) {
    if (!query.trim()) {
        document.getElementById('searchResults').classList.add('hidden');
        return;
    }
    
    console.log('Searching for:', query);
    currentSearchQuery = query;
    showLoading(true);
    
    try {
        const data = await fetchFromTMDB(`/search/multi?query=${encodeURIComponent(query)}`);
        
        if (data && data.results) {
            displayMovies('searchGrid', data.results);
            showView('search');
        }
    } catch (error) {
        console.error('Search error:', error);
        showToast('Search failed. Please try again.');
    } finally {
        showLoading(false);
    }
}