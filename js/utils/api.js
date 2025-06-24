// API functions
async function fetchFromTMDB(endpoint) {
    try {
        const response = await fetch(`${TMDB_BASE_URL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${TMDB_API_KEY}`,
                'accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('TMDB API response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching from TMDB:', error);
        showToast('Error loading content. Please try again.');
        return null;
    }
}