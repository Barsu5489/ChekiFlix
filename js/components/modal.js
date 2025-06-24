// Modal functionality
let currentHeroMovie = null;

// Open movie modal
async function openMovieModal(movie) {
    console.log('Opening modal for:', movie.title || movie.name);
    const modal = document.getElementById('movieModal');
    const modalContent = document.getElementById('modalContent');
    
    showLoading(true);
    
    try {
        const mediaType = movie.title ? 'movie' : 'tv';
        const [details, credits, videos] = await Promise.all([
            fetchFromTMDB(`/${mediaType}/${movie.id}`),
            fetchFromTMDB(`/${mediaType}/${movie.id}/credits`),
            fetchFromTMDB(`/${mediaType}/${movie.id}/videos`)
        ]);
        
        if (details) {
            modalContent.innerHTML = createModalContent(details, credits, videos, mediaType);
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error loading movie details:', error);
        showToast('Error loading movie details');
    } finally {
        showLoading(false);
    }
}

