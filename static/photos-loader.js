// Photos Loader - Manages photo data and loading
class PhotosLoader {
    constructor() {
        this.photos = [];
        this.filteredPhotos = [];
        this.currentFilter = 'all';
        this.baseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:5000'
            : 'https://backend-six-theta-99.vercel.app';
    }

    // Load photos from API (MongoDB), fallback to JSON
    async loadPhotos() {
        try {
            const photos = await PhotosAPI.getAll();
            if (photos && photos.length > 0) {
                // If it's from API, map it
                if (photos[0]._id || photos[0].url.startsWith('http')) {
                    this.photos = photos.map(photo => ({
                        id: photo._id || photo.id,
                        title: photo.title || photo.caption,
                        url: photo.url,
                        description: photo.description,
                        category: this.normalizeCategory(photo.category),
                        views: photo.views || 0,
                        uploadedAt: photo.createdAt
                    }));
                    this.filteredPhotos = this.photos;
                    console.log('✅ Loaded photos via PhotosAPI', this.photos);
                    return this.photos;
                }
            }
        } catch (error) {
            console.warn('API unavailable, falling back to static photos:', error);
        }

        // Fallback to static JSON file
        try {
            const response = await fetch('static/photos.json');
            if (!response.ok) {
                throw new Error('Failed to load photos');
            }
            const data = await response.json();
            this.photos = data.photos;
            this.filteredPhotos = this.photos;
            console.log('✅ Loaded photos from static JSON');
            return this.photos;
        } catch (error) {
            console.error('Error loading photos:', error);
            return [];
        }
    }

    // Normalize category names for filtering
    normalizeCategory(category) {
        if (!category) return 'gallery';
        
        const cat = category.toLowerCase().trim();
        
        // Map exact backend names from admin panel to frontend keys
        const categoryMap = {
            'luxury wedding': 'weddings',
            'luxury weddings': 'weddings',
            'wedding': 'weddings',
            'weddings': 'weddings',
            'corporate events': 'corporate',
            'corporate': 'corporate',
            'birthday celebrations': 'birthdays',
            'birthday': 'birthdays',
            'birthdays': 'birthdays',
            'decor and design': 'decor',
            'decor': 'decor',
            'design': 'decor',
            'background images': 'gallery'
        };
        
        // Check map first, then fall back to includes
        if (categoryMap[cat]) return categoryMap[cat];
        
        if (cat.includes('wedding')) return 'weddings';
        if (cat.includes('corporate')) return 'corporate';
        if (cat.includes('birthday')) return 'birthdays';
        if (cat.includes('decor') || cat.includes('design')) return 'decor';
        
        return 'gallery';
    }

    // Get all photos
    getAllPhotos() {
        return this.photos;
    }

    // Filter photos by category
    filterByCategory(category) {
        this.currentFilter = category;
        if (category === 'all') {
            this.filteredPhotos = this.photos;
        } else {
            this.filteredPhotos = this.photos.filter(photo => photo.category === category);
        }
        return this.filteredPhotos;
    }

    // Get filtered photos
    getFilteredPhotos() {
        return this.filteredPhotos;
    }

    // Get photo by ID
    getPhotoById(id) {
        return this.photos.find(photo => photo.id === id);
    }

    // Get photo index in filtered list
    getPhotoIndex(id) {
        return this.filteredPhotos.findIndex(photo => photo.id === id);
    }

    // Get next photo
    getNextPhoto(currentId) {
        const currentIndex = this.getPhotoIndex(currentId);
        if (currentIndex < this.filteredPhotos.length - 1) {
            return this.filteredPhotos[currentIndex + 1];
        }
        return this.filteredPhotos[0]; // Loop to first
    }

    // Get previous photo
    getPreviousPhoto(currentId) {
        const currentIndex = this.getPhotoIndex(currentId);
        if (currentIndex > 0) {
            return this.filteredPhotos[currentIndex - 1];
        }
        return this.filteredPhotos[this.filteredPhotos.length - 1]; // Loop to last
    }

    // Get total photos in current filter
    getTotalPhotos() {
        return this.filteredPhotos.length;
    }

    // Get categories
    getCategories() {
        const categories = new Set(this.photos.map(photo => photo.category));
        return Array.from(categories);
    }

    // Search photos by caption
    searchPhotos(query) {
        return this.filteredPhotos.filter(photo =>
            photo.caption.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Create global instance
const photosLoader = new PhotosLoader();
