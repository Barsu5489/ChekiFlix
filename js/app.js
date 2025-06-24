// Main app functionality
let currentView = 'home';

// Initialize the app
async function initApp() {
    console.log('Initializing CineVault app...');
    showLoading(true);
    
    try {
        // Load genres
        await loadGenres();
        
        // Load initial content
        await Promise.all([
            loadTrendingMovies(),
            loadPopularMovies(),
            loadTopRatedTV(),
            loadHeroContent()
        ]);
        
        // Setup event listeners
        setupEventListeners();
        
        // Generate background particles
        generateParticles();
        
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showToast('Failed to load content. Please refresh the page.');
    } finally {
        showLoading(false);
    }
}

// View management
function showView(viewName) {
    console.log('Showing view:', viewName);
    currentView = viewName;
    
    // Hide all views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('hidden');
    });
    
    // Show selected view
    switch (viewName) {
        case 'home':
            document.getElementById('homeView').classList.remove('hidden');
            break;
        case 'movies':
            document.getElementById('moviesView').classList.remove('hidden');
            loadMoviesView();
            break;
        case 'tv':
            document.getElementById('tvView').classList.remove('hidden');
            loadTVView();
            break;
        case 'watchlist':
            document.getElementById('watchlistView').classList.remove('hidden');
            showWatchlist();
            break;
        case 'search':
            document.getElementById('searchResults').classList.remove('hidden');
            break;
    }
    
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('text-primary');
        btn.classList.add('text-white');
    });
}

// Event listeners
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
    
    // Filter changes
    document.getElementById('movieGenreFilter').addEventListener('change', loadMoviesView);
    document.getElementById('movieYearFilter').addEventListener('change', loadMoviesView);
    document.getElementById('movieSortBy').addEventListener('change', loadMoviesView);
    document.getElementById('tvGenreFilter').addEventListener('change', loadTVView);
    document.getElementById('tvSortBy').addEventListener('change', loadTVView);
    
    // Load more buttons
    document.getElementById('loadMoreMovies').addEventListener('click', async () => {
        currentPage++;
        // Load more movies logic
    });
    
    document.getElementById('loadMoreTV').addEventListener('click', async () => {
        currentPage++;
        // Load more TV shows logic
    });
    
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
        // Theme toggle functionality
        const icon = document.querySelector('#themeToggle i');
        if (icon.classList.contains('fa-moon')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Modal close on backdrop click
    document.getElementById('movieModal').addEventListener('click', (e) => {
        if (e.target.id === 'movieModal') {
            closeModal();
        }
    });
    
    // Populate year filter
    const currentYear = new Date().getFullYear();
    const yearFilter = document.getElementById('movieYearFilter');
    for (let year = currentYear; year >= 1950; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    }
}

// Initialize app when page loads
document.addEventListener('DOMContentLoaded', initApp);