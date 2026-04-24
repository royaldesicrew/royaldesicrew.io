// Gallery Script - Handle gallery interactions and rendering

let currentPhotoId = null;

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Load photos
    await photosLoader.loadPhotos();
    
    // Update Signature Moments cards with first photo from each category
    updateSignatureMomentsCards();
    
    // Render initial gallery
    renderGallery();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Update signature moments cards with first photo from each category
function updateSignatureMomentsCards() {
    const categories = [
        { key: 'weddings', card: '.wedding-card' },
        { key: 'corporate', card: '.corporate-card' },
        { key: 'birthdays', card: '.birthday-card' },
        { key: 'decor', card: '.decor-card' }
    ];

    categories.forEach(cat => {
        const photos = photosLoader.filterByCategory(cat.key);
        if (photos.length > 0) {
            const firstPhoto = photos[0];
            const card = document.querySelector(cat.card);
            if (card) {
                const momentImage = card.querySelector('.moment-image');
                if (momentImage) {
                    momentImage.style.backgroundImage = `url('${firstPhoto.url}')`;
                }
            }
        }
    });

    // Reset filter to show all
    photosLoader.filterByCategory('all');
}

// Render gallery grid
function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const photos = photosLoader.getFilteredPhotos();
    
    if (photos.length === 0) {
        galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #d4af37;">No photos found</p>';
        return;
    }
    
    galleryGrid.innerHTML = photos.map(photo => `
        <div class="gallery-item" data-id="${photo.id}" onclick="openLightbox(${photo.id})">
            <div class="gallery-item-image" style="background-image: url('${photo.url}');">
                <div class="gallery-item-overlay">
                    <i class="fas fa-expand"></i>
                </div>
            </div>
            <div class="gallery-item-caption">
                <p>${photo.caption}</p>
            </div>
        </div>
    `).join('');
    
    // Add animation
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.style.animation = `fadeInUp 0.6s ease forwards`;
        item.style.animationDelay = `${index * 0.1}s`;
    });
}

// Open lightbox
function openLightbox(photoId) {
    currentPhotoId = photoId;
    const photo = photosLoader.getPhotoById(photoId);
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = photo.url;
    lightboxImage.alt = photo.caption;
    lightboxCaption.textContent = photo.caption;
    
    const currentIndex = photosLoader.getPhotoIndex(photoId) + 1;
    const total = photosLoader.getTotalPhotos();
    lightboxCounter.textContent = `${currentIndex} / ${total}`;
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    currentPhotoId = null;
    document.body.style.overflow = 'auto';
}

// Navigate to next photo
function nextPhoto() {
    if (!currentPhotoId) return;
    const nextPhoto = photosLoader.getNextPhoto(currentPhotoId);
    openLightbox(nextPhoto.id);
}

// Navigate to previous photo
function previousPhoto() {
    if (!currentPhotoId) return;
    const prevPhoto = photosLoader.getPreviousPhoto(currentPhotoId);
    openLightbox(prevPhoto.id);
}

// Handle filter buttons
function handleFilterClick(event) {
    if (event.target.classList.contains('filter-btn')) {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // Filter and re-render
        const category = event.target.getAttribute('data-filter');
        photosLoader.filterByCategory(category);
        renderGallery();
        
        // Smooth scroll to gallery
        document.querySelector('.gallery-main').scrollIntoView({ behavior: 'smooth' });
    }
}

// Setup all event listeners
function setupEventListeners() {
    // Lightbox controls
    document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
    document.getElementById('nextPhoto').addEventListener('click', nextPhoto);
    document.getElementById('prevPhoto').addEventListener('click', previousPhoto);
    
    // Close on background click
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Filter buttons
    document.querySelector('.filter-buttons').addEventListener('click', handleFilterClick);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'ArrowLeft') previousPhoto();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'Escape') closeLightbox();
    });
}

// Smooth scroll animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe gallery items
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.gallery-item').forEach(el => {
            observer.observe(el);
        });
    }, 100);
});
