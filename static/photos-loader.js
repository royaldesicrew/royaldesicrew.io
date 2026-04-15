// Photos Loader - Manages photo data and loading
class PhotosLoader {
    constructor() {
        this.photos = [];
        this.filteredPhotos = [];
        this.currentFilter = 'all';
    }

    // Load photos from JSON file
    async loadPhotos() {
        try {
            const response = await fetch('static/photos.json');
            if (!response.ok) {
                throw new Error('Failed to load photos');
            }
            const data = await response.json();
            this.photos = data.photos;
            this.filteredPhotos = this.photos;
            return this.photos;
        } catch (error) {
            console.error('Error loading photos:', error);
            return [];
        }
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
