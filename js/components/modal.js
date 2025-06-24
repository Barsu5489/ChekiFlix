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

// Create modal content
function createModalContent(movie, credits, videos, mediaType) {
    const backdropUrl = movie.backdrop_path 
        ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
        : '/api/placeholder/1280/720';
    
    const posterUrl = movie.poster_path 
        ? `${IMAGE_BASE_URL}${movie.poster_path}`
        : '/api/placeholder/300/450';
    
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
    const year = movie.release_date || movie.first_air_date 
        ? new Date(movie.release_date || movie.first_air_date).getFullYear()
        : '';
    
    const runtime = movie.runtime ? `${movie.runtime} min` : 
                   movie.episode_run_time && movie.episode_run_time.length > 0 ? `${movie.episode_run_time[0]} min/ep` : '';
    
    const cast = credits && credits.cast ? credits.cast.slice(0, 6) : [];
    const trailer = videos && videos.results ? videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube') : null;
    
    return `
        <div class="relative">
            <div class="h-96 bg-cover bg-center" style="background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backdropUrl})">
                <div class="absolute inset-0 flex items-end p-8">
                    <div class="flex space-x-6">
                        <img src="${posterUrl}" alt="${movie.title || movie.name}" class="w-32 h-48 object-cover rounded-lg">
                        <div class="flex-1">
                            <h2 class="text-4xl font-poppins font-bold mb-2">${movie.title || movie.name}</h2>
                            <div class="flex items-center space-x-4 mb-4">
                                <span class="bg-primary text-black px-3 py-1 rounded-full font-semibold">
                                    <i class="fas fa-star mr-1"></i>${rating}
                                </span>
                                <span class="text-gray-300">${year}</span>
                                ${runtime ? `<span class="text-gray-300">${runtime}</span>` : ''}
                            </div>
                            <div class="flex space-x-4">
                                ${trailer ? `<button onclick="playTrailer('${trailer.key}')" class="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:bg-primary/80 transition-all">
                                    <i class="fas fa-play mr-2"></i>Watch Trailer
                                </button>` : ''}
                                <button onclick="toggleWatchlistItem(${JSON.stringify(movie).replace(/"/g, '&quot;')})" class="bg-dark-300 text-white px-6 py-2 rounded-full font-semibold hover:bg-dark-400 transition-all">
                                    <i class="fas fa-bookmark mr-2"></i>
                                    ${isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="p-8">
                <div class="grid md:grid-cols-3 gap-8">
                    <div class="md:col-span-2">
                        <h3 class="text-2xl font-poppins font-bold mb-4">Overview</h3>
                        <p class="text-gray-300 leading-relaxed">${movie.overview || 'No overview available.'}</p>
                        
                        ${movie.genres && movie.genres.length > 0 ? `
                        <div class="mt-6">
                            <h4 class="text-lg font-semibold mb-2">Genres</h4>
                            <div class="flex flex-wrap gap-2">
                                ${movie.genres.map(genre => `<span class="bg-dark-300 px-3 py-1 rounded-full text-sm">${genre.name}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${cast.length > 0 ? `
                        <div class="mt-6">
                            <h4 class="text-lg font-semibold mb-4">Cast</h4>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                ${cast.map(actor => `
                                    <div class="flex items-center space-x-3">
                                        <img src="${actor.profile_path ? IMAGE_BASE_URL + actor.profile_path : '/api/placeholder/60/60'}" 
                                             alt="${actor.name}" class="w-12 h-12 rounded-full object-cover">
                                        <div>
                                            <p class="font-semibold text-sm">${actor.name}</p>
                                            <p class="text-gray-400 text-xs">${actor.character}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div>
                        <h4 class="text-lg font-semibold mb-4">Details</h4>
                        <div class="space-y-3 text-sm">
                            ${movie.release_date || movie.first_air_date ? `
                            <div>
                                <span class="text-gray-400">Release Date:</span>
                                <span class="ml-2">${new Date(movie.release_date || movie.first_air_date).toLocaleDateString()}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.budget && movie.budget > 0 ? `
                            <div>
                                <span class="text-gray-400">Budget:</span>
                                <span class="ml-2">$${movie.budget.toLocaleString()}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.revenue && movie.revenue > 0 ? `
                            <div>
                                <span class="text-gray-400">Revenue:</span>
                                <span class="ml-2">$${movie.revenue.toLocaleString()}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.number_of_seasons ? `
                            <div>
                                <span class="text-gray-400">Seasons:</span>
                                <span class="ml-2">${movie.number_of_seasons}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.number_of_episodes ? `
                            <div>
                                <span class="text-gray-400">Episodes:</span>
                                <span class="ml-2">${movie.number_of_episodes}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.status ? `
                            <div>
                                <span class="text-gray-400">Status:</span>
                                <span class="ml-2">${movie.status}</span>
                            </div>
                            ` : ''}
                            
                            ${movie.spoken_languages && movie.spoken_languages.length > 0 ? `
                            <div>
                                <span class="text-gray-400">Languages:</span>
                                <span class="ml-2">${movie.spoken_languages.map(lang => lang.english_name).join(', ')}</span>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Close modal
function closeModal() {
    console.log('Closing modal');
    const modal = document.getElementById('movieModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}
