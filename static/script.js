// Email Solutions:
// - User notifications: Resend (API endpoint in backend)
// - Admin notifications: FormSubmit.co (form submissions)
// - API keys configured in backend/.env.local

// Background Image Carousel for Hero Section
const slides = [
    'static/Images/Background.png',
    'static/Images/background image 2.jpg',
    'static/Images/background 3.jpg',
    'static/Images/corporate event1.jpeg',
    'static/Images/Wedding.png'
];

let slideIndex = 0;

function showSlide(index) {
    const allSlides = document.querySelectorAll('.hero-bg-slide');
    
    if (allSlides.length === 0) {
        console.error('❌ No slides found!');
        return;
    }
    
    // Log current slide info
    const currentSlide = allSlides[index];
    const bgImage = window.getComputedStyle(currentSlide).backgroundImage;
    console.log(`Slide ${index + 1} background-image:`, bgImage);
    
    // Hide all slides
    allSlides.forEach((slide, i) => {
        slide.style.opacity = '0';
        slide.style.transition = 'opacity 1s ease-in-out';
    });
    
    // Show current slide
    allSlides[index].style.opacity = '1';
    console.log(`✓ Showing slide ${index + 1}/${slides.length}`);
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ DOM loaded - Setting up website');
    
    console.log('Slides array:', slides);
    
    const allSlides = document.querySelectorAll('.hero-bg-slide');
    console.log(`Found ${allSlides.length} slide elements`);
    
    // Check each slide's background-image
    allSlides.forEach((slide, i) => {
        const bgImage = window.getComputedStyle(slide).backgroundImage;
        console.log(`Slide ${i + 1} computed background-image:`, bgImage);
        
        // Add image load listeners
        if (bgImage && bgImage !== 'none') {
            const imageUrl = bgImage.slice(5, -2); // Extract URL from url("...")
            const img = new Image();
            img.onload = () => console.log(`✓ Image loaded: ${imageUrl}`);
            img.onerror = () => console.error(`❌ Failed to load: ${imageUrl}`);
            img.src = imageUrl;
        }
    });
    
    // Show first slide immediately
    showSlide(0);
    slideIndex = 0;
    
    // Change slides every 5 seconds
    setInterval(function() {
        slideIndex = (slideIndex + 1) % slides.length;
        showSlide(slideIndex);
    }, 5000);
    
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Gallery Modal Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryModal) {
        // Close modal when clicking outside the modal-content
        galleryModal.addEventListener('click', function(event) {
            if (event.target === galleryModal) {
                closeGalleryModal();
            }
        });
        
        // Close modal when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && galleryModal.classList.contains('show')) {
                closeGalleryModal();
            }
        });
    }
});

// Scroll animation for elements
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

// Observe service cards, gallery items, testimonial cards
document.querySelectorAll('.service-card, .gallery-item, .testimonial-card, .package-card, .info-item').forEach(el => {
    el.style.animation = 'none';
    observer.observe(el);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(212, 175, 55, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// View All Photos Button
const viewAllPhotosBtn = document.getElementById('viewAllPhotosBtn');
if (viewAllPhotosBtn) {
    viewAllPhotosBtn.addEventListener('click', function() {
        window.location.href = 'gallery.html';
    });
}

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.3)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// Button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.opacity = '0.9';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.opacity = '1';
    });
});

// WhatsApp Enquiry Function for Services
function openWhatsApp(serviceType) {
    const phoneNumber = '919614028424'; // +91 9614028424 without + sign
    const message = `Hi Royal Desi Crew, I'm interested in your ${serviceType} services. Can you please provide more details and pricing?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// WhatsApp Enquiry Function for Packages
function openWhatsAppPackage(packageName) {
    const phoneNumber = '919614028424'; // +91 9614028424 without + sign
    const message = `Hi Royal Desi Crew, I'm interested in your ${packageName}. Can you please provide more details and booking information?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Package card behavior removed - now uses WhatsApp function via onclick

// Photos Modal Functionality
const photosModal = document.getElementById('photosModal');
const closeModal = document.getElementById('closeModal');

if (closeModal) {
    closeModal.addEventListener('click', function() {
        if (photosModal) {
            photosModal.classList.remove('show');
        }
    });
}

// Close modal when clicking outside
if (photosModal) {
    photosModal.addEventListener('click', function(event) {
        if (event.target === photosModal) {
            photosModal.classList.remove('show');
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && photosModal && photosModal.classList.contains('show')) {
        photosModal.classList.remove('show');
    }
});

// Booking Modal Functionality
function openBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.style.display = 'flex';
        bookingModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeBookingModal() {
    const bookingModal = document.getElementById('bookingModal');
    if (bookingModal) {
        bookingModal.classList.remove('show');
        bookingModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Allow scrolling
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const bookingModal = document.getElementById('bookingModal');
    if (event.target === bookingModal) {
        closeBookingModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBookingModal();
    }
});

// Generic form handler for all three forms
async function handleFormSubmit(e, formType) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Support both name="" and user_name="" formats
        const customerName = (form.querySelector('[name="name"]') || form.querySelector('[name="user_name"]')).value;
        const customerEmail = (form.querySelector('[name="email"]') || form.querySelector('[name="user_email"]')).value;
        const customerPhone = (form.querySelector('[name="phone"]') || form.querySelector('[name="user_phone"]')).value;
        const eventType = form.querySelector('[name="event_type"]').value;
        const customerMessage = form.querySelector('[name="message"]').value;
        
        const packageSelect = form.querySelector('[name="package"]');
        const packageType = packageSelect ? packageSelect.value : '';

        const payload = {
            name: customerName,
            email: customerEmail,
            phone: customerPhone,
            event_type: eventType,
            package_type: packageType,
            message: customerMessage,
            form_type: formType,
            _captcha: "false" // Disable FormSubmit captcha
        };

        console.log(`📧 Sending ${formType}...`);
        
        // 1. Send Admin Notification via FormSubmit.co
        const adminResponse = await fetch('https://formsubmit.co/ajax/royaldesicrew@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...payload,
                _subject: `New ${formType} from ${customerName}`
            })
        });

        if (!adminResponse.ok) {
            throw new Error('Failed to send admin notification');
        }

        // 2. Send User Confirmation via Backend (Resend API)
        try {
            const result = await EmailsAPI.sendInquiry(payload);
            if (!result.success) {
                console.warn('Backend user confirmation failed:', result.error);
            }
        } catch (backendError) {
            console.warn('Could not connect to backend for user confirmation:', backendError);
        }
        
        console.log('✅ Form submitted successfully!');
        showSuccessModal('✓ Inquiry Sent Successfully!', 'Thank you for your inquiry.\nWe will contact you within 24 hours.');
        form.reset();
        
        if (typeof closeBookingModal === 'function') closeBookingModal();
        if (typeof closeConsultationModal === 'function') closeConsultationModal();
        
    } catch (error) {
        console.error('❌ Error:', error);
        showSuccessModal('⚠️ Error Sending Inquiry', error.message || 'Please try again or contact us directly at +91 9614028424.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Booking Form
    const modalForm = document.getElementById('modalContactForm');
    if (modalForm) {
        modalForm.addEventListener('submit', (e) => handleFormSubmit(e, 'booking'));
    }
    
    // 2. Consultation Form
    const consultationForm = document.getElementById('consultationForm');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => handleFormSubmit(e, 'consultation'));
    }

    // 3. Main Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    }
});

// ===== Success Modal Functions =====

function showSuccessModal(title, message) {
    const successModal = document.getElementById('successModal');
    const successTitle = document.getElementById('successTitle');
    const successMessage = document.getElementById('successMessage');
    
    if (successModal && successTitle && successMessage) {
        successTitle.textContent = title;
        successMessage.textContent = message;
        successModal.style.display = 'flex';
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.classList.remove('show');
        successModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close success modal when clicking outside
window.addEventListener('click', function(event) {
    const successModal = document.getElementById('successModal');
    if (event.target === successModal) {
        closeSuccessModal();
    }
});

// Close success modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const successModal = document.getElementById('successModal');
        if (successModal && successModal.style.display === 'flex') {
            closeSuccessModal();
        }
    }
});

// ===== Consultation Modal Functions =====

function openConsultationModal() {
    const consultationModal = document.getElementById('consultationModal');
    if (consultationModal) {
        consultationModal.style.display = 'flex';
        consultationModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeConsultationModal() {
    const consultationModal = document.getElementById('consultationModal');
    if (consultationModal) {
        consultationModal.classList.remove('show');
        consultationModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Allow scrolling
    }
}

// Close consultation modal when clicking outside
window.addEventListener('click', function(event) {
    const consultationModal = document.getElementById('consultationModal');
    if (event.target === consultationModal) {
        closeConsultationModal();
    }
});

// Close consultation modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const consultationModal = document.getElementById('consultationModal');
        if (consultationModal && consultationModal.style.display === 'flex') {
            closeConsultationModal();
        }
    }
});

// Handle consultation form submission handled by the unified handleFormSubmit logic

// ===== Gallery Modal Functionality =====

let currentPhotoId = null;

function openGalleryModal(category = 'weddings') {
    console.log('🎬 openGalleryModal called with category:', category);
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryModal) {
        renderGalleryByCategory(category);
        galleryModal.classList.add('show');
        galleryModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error('❌ Gallery modal element not found!');
    }
}

function closeGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.classList.remove('show');
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function goToGalleryFilter(category) {
    openGalleryModal(category);
}

async function renderGalleryByCategory(category) {
    const mainGallery = document.getElementById('mainGallery');
    const titleEl = document.getElementById('galleryModalTitle');
    const descEl = document.getElementById('galleryModalDesc');
    const modalFilters = document.getElementById('modalFilters');
    
    if (!mainGallery) return;

    // Update active state of filter buttons
    if (modalFilters) {
        modalFilters.querySelectorAll('.filter-btn').forEach(btn => {
            const btnOnClick = btn.getAttribute('onclick');
            if (btnOnClick && btnOnClick.includes(`'${category}'`)) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Update titles based on category
    const titles = {
        'weddings': { title: 'Luxury <span class="gold">Wedding</span> Gallery', desc: 'Capturing your eternal love stories' },
        'corporate': { title: 'Premium <span class="gold">Corporate</span> Events', desc: 'Professional moments that define brands' },
        'birthdays': { title: 'Joyful <span class="gold">Birthday</span> Celebrations', desc: 'Making every year more magical' },
        'decor': { title: 'Exquisite <span class="gold">Decor & Design</span>', desc: 'Artistic visions brought to life' },
        'all': { title: 'Our <span class="gold">Signature</span> Portfolio', desc: 'Explore our diverse range of premium events' }
    };

    const info = titles[category] || titles['all'];
    if (titleEl) titleEl.innerHTML = info.title;
    if (descEl) descEl.textContent = info.desc;

    // Show loading state
    mainGallery.innerHTML = `
        <div class="loading-spinner" style="grid-column: 1/-1; text-align: center; padding: 50px;">
            <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #d4af37; margin-bottom: 15px;"></i>
            <p>Fetching magical moments...</p>
        </div>
    `;

    // Ensure photos are loaded
    if (photosLoader.getAllPhotos().length === 0) {
        await photosLoader.loadPhotos();
    }

    const photos = photosLoader.filterByCategory(category);

    if (photos.length === 0) {
        mainGallery.innerHTML = `
            <div class="empty-gallery-state" style="grid-column: 1/-1;">
                <div class="empty-content">
                    <i class="fas fa-camera-retro"></i>
                    <h3>Coming Soon</h3>
                    <p>We're currently curating the best moments for this category. Stay tuned!</p>
                </div>
            </div>
        `;
        return;
    }

    mainGallery.innerHTML = photos.map((photo, index) => `
        <div class="gallery-item" data-id="${photo.id}" style="animation-delay: ${index * 0.1}s" onclick="openLightbox('${photo.id}')">
            <div class="gallery-item-image" style="background-image: url('${photo.url}');">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <p class="overlay-text">${photo.title || 'Event Moment'}</p>
                        <span class="overlay-btn"><i class="fas fa-expand"></i> View Full Size</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// ===== Lightbox Functionality =====

function openLightbox(photoId) {
    currentPhotoId = photoId;
    const photo = photosLoader.getPhotoById(photoId);
    if (!photo) return;

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (lightbox && lightboxImage) {
        lightboxImage.src = photo.url;
        lightboxImage.alt = photo.title || 'Event Photo';
        if (lightboxCaption) lightboxCaption.textContent = photo.title || photo.description || 'Royal Desi Crew Moment';
        
        const currentIndex = photosLoader.getPhotoIndex(photoId) + 1;
        const total = photosLoader.getTotalPhotos();
        if (lightboxCounter) lightboxCounter.textContent = `${currentIndex} / ${total}`;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        if (!document.getElementById('galleryModal').classList.contains('show')) {
            document.body.style.overflow = 'auto';
        }
    }
    currentPhotoId = null;
}

function nextPhoto() {
    if (!currentPhotoId) return;
    const photo = photosLoader.getNextPhoto(currentPhotoId);
    if (photo) openLightbox(photo.id);
}

function previousPhoto() {
    if (!currentPhotoId) return;
    const photo = photosLoader.getPreviousPhoto(currentPhotoId);
    if (photo) openLightbox(photo.id);
}

// Setup Lightbox Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('closeLightbox');
    const nextBtn = document.getElementById('nextPhoto');
    const prevBtn = document.getElementById('prevPhoto');
    const lightbox = document.getElementById('lightbox');

    if (closeBtn) closeBtn.onclick = closeLightbox;
    if (nextBtn) nextBtn.onclick = nextPhoto;
    if (prevBtn) prevBtn.onclick = previousPhoto;

    if (lightbox) {
        lightbox.onclick = (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-image-container')) {
                closeLightbox();
            }
        };
    }

    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') previousPhoto();
    });
});

// ===== Questionnaire Modal Functionality =====

let questionnaireState = {
    currentStep: 1,
    serviceType: '',
    guestsCount: null,
    preferences: [],
    budget: null,
    selectedPackage: '12-15'  // Default to Gold package
};

function openQuestionnaire(serviceType) {
    questionnaireState.serviceType = serviceType;
    questionnaireState.currentStep = 1;
    questionnaireState.guestsCount = null;
    questionnaireState.preferences = [];
    questionnaireState.budget = null;
    questionnaireState.selectedPackage = '12-15';
    
    const modal = document.getElementById('questionnaireModal');
    if (modal) {
        // Update title and subtitle to make it feel dedicated
        const titleEl = modal.querySelector('h2');
        const subtitleEl = modal.querySelector('.form-subtitle');
        
        if (titleEl) titleEl.textContent = `Plan Your ${serviceType}`;
        if (subtitleEl) subtitleEl.textContent = `Tell us about your ${serviceType.toLowerCase()} vision`;
        
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        goToStep(1);
    }
    console.log(`Opened questionnaire for: ${serviceType}`);
}

function closeQuestionnaire() {
    const modal = document.getElementById('questionnaireModal');
    if (modal) {
        modal.classList.remove('show');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.questionnaire-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show selected step
    const selectedStep = document.getElementById(`step${stepNumber}`);
    if (selectedStep) {
        selectedStep.classList.add('active');
        questionnaireState.currentStep = stepNumber;
    }
    
    // Update budget range when in step 1 (budget question is here)
    if (stepNumber === 1) {
        updateBudgetRangeByService();
    }
    
    // Display package recommendation when going to step 3
    if (stepNumber === 3) {
        displayPackageRecommendation();
    }
    
    // Update body scroll
    document.body.style.overflow = 'hidden';
}

function updateBudgetRangeByService() {
    const slider = document.getElementById('budgetSlider');
    const budgetMin = document.getElementById('budgetMin');
    const budgetMax = document.getElementById('budgetMax');
    
    let min, max, defaultValue;
    
    // Wedding has 2L to 50L range
    if (questionnaireState.serviceType.includes('Wedding')) {
        min = 2;
        max = 50;
        defaultValue = 15;
        if (budgetMin && budgetMax) {
            budgetMin.textContent = '₹2L';
            budgetMax.textContent = '₹50L';
        }
    } else {
        // All other services: 0.25 (25k) to 10 (10L)
        min = 0.25;
        max = 10;
        defaultValue = 3;
        if (budgetMin && budgetMax) {
            budgetMin.textContent = '₹25K';
            budgetMax.textContent = '₹10L';
        }
    }
    
    if (slider) {
        slider.min = min;
        slider.max = max;
        slider.step = questionnaireState.serviceType.includes('Wedding') ? "1" : "0.25";
        slider.value = defaultValue;
    }
    
    // Update display
    updateBudgetDisplay();
}

function updateBudgetDisplay() {
    const slider = document.getElementById('budgetSlider');
    const budgetValue = document.getElementById('budgetValue');
    const budgetUnit = document.getElementById('budgetUnit');
    
    if (slider && budgetValue) {
        const value = parseFloat(slider.value);
        let displayValue, packageKey;
        
        // Wedding budget range (2L to 50L)
        if (questionnaireState.serviceType.includes('Wedding')) {
            const intValue = parseInt(slider.value);
            displayValue = intValue;
            if (budgetUnit) budgetUnit.textContent = 'Lakhs';
            
            // Map slider value to package key for wedding
            if (intValue >= 2 && intValue <= 7) {
                packageKey = '5-7';
            } else if (intValue >= 8 && intValue <= 19) {
                packageKey = '12-15';
            } else if (intValue >= 20 && intValue <= 50) {
                packageKey = '20-35';
            }
        } else {
            // Other services budget range (25K to 10L)
            if (value <= 1) {
                displayValue = (value * 100).toFixed(0); // Convert to K
                if (budgetUnit) budgetUnit.textContent = 'K';
            } else {
                displayValue = value.toFixed(1); // Show in Lakhs
                if (budgetUnit) budgetUnit.textContent = 'Lakhs';
            }
            
            // Map to standard package ranges
            if (value >= 0.25 && value <= 2) {
                packageKey = 'basic';
            } else if (value > 2 && value <= 5) {
                packageKey = 'standard';
            } else if (value > 5 && value <= 10) {
                packageKey = 'premium';
            }
        }
        
        budgetValue.textContent = displayValue;
        questionnaireState.budget = slider.value;
        questionnaireState.selectedPackage = packageKey || '12-15';
    }
}

function selectGuests(count) {
    questionnaireState.guestsCount = count;
    
    // Update button states
    document.querySelectorAll('.guest-btn').forEach(btn => {
        btn.classList.remove('active');
        const btnCount = parseInt(btn.textContent);
        if ((count === 100 && btn.textContent.includes('Up to 100')) ||
            (count === 250 && btn.textContent.includes('100-250')) ||
            (count === 500 && btn.textContent.includes('500')) && !btn.textContent.includes('500+') ||
            (count === 1000 && btn.textContent.includes('500+'))) {
            btn.classList.add('active');
        }
    });
    
    console.log(`Guest count selected: ${count}`);
}

function selectBudget(budgetRange) {
    questionnaireState.budget = budgetRange;
    
    // Update button states
    document.querySelectorAll('.budget-btn').forEach(btn => {
        btn.classList.remove('active');
        if ((budgetRange === '5-7' && btn.textContent.includes('Standard')) ||
            (budgetRange === '12-15' && btn.textContent.includes('Premium')) ||
            (budgetRange === '20-35' && btn.textContent.includes('Luxury'))) {
            btn.classList.add('active');
        }
    });
    
    console.log(`Budget selected: ${budgetRange}`);
}

function getPackageRecommendation(budget) {
    const packages = {
        '5-7': {
            name: '💎 SILVER PACKAGE',
            desc: 'Perfect for intimate gatherings with essential services',
            features: [
                'Basic Event Planning & Coordination',
                'Venue Liaison & Setup',
                'Professional Basic Décor',
                'Photography (4-6 hours)',
                'Sound & Lighting System',
                'Professional Team Support'
            ],
            price: '₹5,00,000 - ₹7,00,000'
        },
        '12-15': {
            name: '👑 GOLD PACKAGE',
            desc: 'Comprehensive planning with premium amenities included',
            features: [
                'Full Event Planning & Coordination',
                'Premium Décor & Theme Design',
                'Professional Photography & Videography (8 hours)',
                'HD Video Editing & Highlights',
                'Expert Lighting & Sound System',
                'Catering Coordination',
                'Guest Management & Flow Coordination',
                'Post-Event Photo Albums'
            ],
            price: '₹12,00,000 - ₹15,00,000'
        },
        '20-35': {
            name: '✨ PLATINUM PACKAGE',
            desc: 'Ultimate luxury experience with white-glove service',
            features: [
                'Dedicated Event Manager & Team',
                'Luxury Décor & Bespoke Themework',
                'Full Day Photography + Videography (12+ hours)',
                '4K Professional Video Production',
                'Premium Drone Photography & Videography',
                'Live Streaming Services',
                'Celebrity/Artist Coordination (if applicable)',
                'Premium Catering Coordination',
                'Professional Guest Flow Management',
                'Complete Post-Production with Cinema-Quality Editing',
                'Custom Photo & Video Books'
            ],
            price: '₹20,00,000 - ₹35,00,000'
        }
    };
    
    return packages[budget] || packages['12-15'];
}

function displayPackageRecommendation() {
    let packages;
    let recommendedPackageKey;
    let recommendedPackageName;
    
    // Different packages for wedding vs other services
    if (questionnaireState.serviceType.includes('Wedding')) {
        packages = {
            'basic': {
                name: '💎 Basic',
                desc: 'Essential planning services',
                features: [
                    'Basic Event Planning & Coordination',
                    'Venue Liaison & Setup',
                    'Simple Décor Setup',
                    'Photography (2-4 hours)',
                    'Sound & Lighting System',
                    'Professional Team Support'
                ],
                price: 'Below ₹5 Lakhs'
            },
            '5-7': {
                name: '💎 Silver',
                desc: 'Perfect for intimate gatherings with essential services',
                features: [
                    'Basic Event Planning & Coordination',
                    'Venue Liaison & Setup',
                    'Professional Basic Décor',
                    'Photography (4-6 hours)',
                    'Sound & Lighting System',
                    'Professional Team Support'
                ],
                price: '₹5,00,000 - ₹7,00,000'
            },
            '12-15': {
                name: '👑 Gold',
                desc: 'Comprehensive planning with premium amenities included',
                features: [
                    'Full Event Planning & Coordination',
                    'Premium Décor & Theme Design',
                    'Photography & Videography (8 hours)',
                    'HD Video Editing & Highlights',
                    'Expert Lighting & Sound System',
                    'Catering Coordination',
                    'Guest Management & Flow Coordination',
                    'Post-Event Photo Albums'
                ],
                price: '₹12,00,000 - ₹15,00,000'
            },
            '20-35': {
                name: '✨ Platinum',
                desc: 'Ultimate luxury experience with white-glove service',
                features: [
                    'Dedicated Event Manager & Team',
                    'Luxury Décor & Bespoke Themework',
                    'Full Day Photography + Videography (12+ hours)',
                    '4K Professional Video Production',
                    'Premium Drone Photography & Videography',
                    'Live Streaming Services',
                    'Celebrity/Artist Coordination (if applicable)',
                    'Premium Catering Coordination',
                    'Professional Guest Flow Management',
                    'Complete Post-Production with Cinema-Quality Editing',
                    'Custom Photo & Video Books'
                ],
                price: '₹20,00,000 - ₹35,00,000'
            }
        };
        
        // Determine recommended package for Wedding based on budget
        if (questionnaireState.budget <= 5) {
            recommendedPackageKey = 'basic';
            recommendedPackageName = 'Basic';
        } else if (questionnaireState.budget <= 10) {
            recommendedPackageKey = '5-7';
            recommendedPackageName = 'Silver';
        } else if (questionnaireState.budget <= 15) {
            recommendedPackageKey = '12-15';
            recommendedPackageName = 'Gold';
        } else {
            recommendedPackageKey = '20-35';
            recommendedPackageName = 'Platinum';
        }
    } else {
        // For non-wedding services
        packages = {
            'basic': {
                name: '💎 Basic',
                desc: 'Essential services for your event',
                features: [
                    'Event Planning & Coordination',
                    'Basic Décor Setup',
                    'Standard Photography (4-6 hours)',
                    'Sound & Lighting System',
                    'Professional Team Support',
                    'Guest Management Assistance'
                ],
                price: '₹25,000 - ₹1,00,000'
            },
            'silver': {
                name: '🥈 Silver',
                desc: 'Perfect for intimate gatherings with quality amenities',
                features: [
                    'Full Event Planning & Coordination',
                    'Premium Décor & Theme Design',
                    'Photography & Videography (6-8 hours)',
                    'Video Editing & Highlights',
                    'Expert Lighting & Sound System',
                    'Catering Coordination',
                    'Professional Guest Flow Management',
                    'Post-Event Photo Albums'
                ],
                price: '₹1,00,000 - ₹3,00,000'
            },
            'gold': {
                name: '👑 Gold',
                desc: 'Comprehensive planning with premium amenities',
                features: [
                    'Dedicated Event Manager & Team',
                    'Luxury Décor & Bespoke Themework',
                    'Full Day Photography + Videography (10 hours)',
                    '4K Professional Video Highlights',
                    'Premium Sound & Lighting Production',
                    'Catering Management',
                    'Advanced Guest Management',
                    'Custom Photo Albums'
                ],
                price: '₹3,00,000 - ₹6,00,000'
            },
            'platinum': {
                name: '✨ Platinum',
                desc: 'Ultimate luxury experience with all premium services',
                features: [
                    'Dedicated Senior Event Architect',
                    'Grand Luxury Décor & Signature Design',
                    'Full Event Coverage (Photography & 4K Cinematography)',
                    'Drone Photography & Videography',
                    'Premium Entertainment Coordination',
                    'VIP Guest Concierge Services',
                    'Professional Lighting & Stage Production',
                    'Live Streaming Services',
                    'Premium Post-Production Services',
                    'Custom Hardcover Photo & Video Books'
                ],
                price: '₹6,00,000 - ₹10,00,000'
            }
        };
        
        // Determine recommended package for non-wedding based on budget
        const budgetValue = parseFloat(questionnaireState.budget);
        if (budgetValue <= 1.0) {
            recommendedPackageKey = 'basic';
            recommendedPackageName = 'Basic';
        } else if (budgetValue <= 3.0) {
            recommendedPackageKey = 'silver';
            recommendedPackageName = 'Silver';
        } else if (budgetValue <= 6.0) {
            recommendedPackageKey = 'gold';
            recommendedPackageName = 'Gold';
        } else {
            recommendedPackageKey = 'platinum';
            recommendedPackageName = 'Platinum';
        }
    }
    
    // Update recommendation text
    const recommendationText = document.getElementById('recommendationText');
    if (recommendationText) {
        let budgetDisplay = '';
        if (questionnaireState.budget < 1) {
            budgetDisplay = (questionnaireState.budget * 100).toFixed(0) + 'K';
        } else {
            budgetDisplay = questionnaireState.budget + ' Lakh';
        }
        recommendationText.textContent = `Based on your budget of ₹${budgetDisplay}, we recommend the ${recommendedPackageName} Package.`;
    }
    
    // Pre-select the recommended package
    questionnaireState.selectedPackage = recommendedPackageKey;
    
    const packagesGrid = document.getElementById('packagesGrid');
    packagesGrid.innerHTML = '';
    
    // Only display the recommended package
    const package = packages[recommendedPackageKey];
    const packageCard = document.createElement('div');
    packageCard.className = `package-card featured selected`;
    packageCard.onclick = () => selectPackage(recommendedPackageKey, packageCard);
    
    // Icon mapping
    const iconMap = {
        'Basic': '<i class="fas fa-star"></i>',
        'Silver': '<i class="fas fa-medal"></i>',
        'Gold': '<i class="fas fa-crown"></i>',
        'Platinum': '<i class="fas fa-gem"></i>'
    };
    const icon = iconMap[recommendedPackageName] || '<i class="fas fa-star"></i>';
    const displayName = recommendedPackageName;
    
    // Build features HTML
    const featuresHTML = package.features.map(feature => `
        <li><i class="fas fa-check"></i> ${feature}</li>
    `).join('');
    
    packageCard.innerHTML = `
        <div class="package-tier-icon">${icon}</div>
        <div class="package-header">
            <h3>${displayName} Package</h3>
        </div>
        <ul class="package-features">
            ${featuresHTML}
        </ul>
    `;
    
    packagesGrid.appendChild(packageCard);
}

function selectPackage(budgetKey, element) {
    questionnaireState.selectedPackage = budgetKey;
    
    // Remove selected class from all cards
    document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    element.classList.add('selected');
}

function connectViaWhatsApp() {
    let packageName = 'Standard';
    
    if (questionnaireState.serviceType.includes('Wedding')) {
        const weddingPackages = {
            '5-7': 'SILVER',
            '12-15': 'GOLD',
            '20-35': 'PLATINUM'
        };
        packageName = weddingPackages[questionnaireState.selectedPackage] || 'GOLD';
    } else {
        const otherPackages = {
            'basic': 'BASIC',
            'silver': 'SILVER',
            'gold': 'GOLD',
            'platinum': 'PLATINUM'
        };
        packageName = otherPackages[questionnaireState.selectedPackage] || 'BASIC';
    }
    
    const preferencesText = questionnaireState.preferences.length > 0 
        ? questionnaireState.preferences.join(', ')
        : 'Standard Services';
    
    // Format budget display
    let budgetDisplay = '';
    if (questionnaireState.budget && questionnaireState.budget > 0) {
        budgetDisplay = `₹${questionnaireState.budget} Lakhs`;
    } else {
        budgetDisplay = 'Not specified';
    }
    
    const message = `Hi Royal Desi Crew! I'm interested in planning my ${questionnaireState.serviceType}. 

Estimated Guests: ${questionnaireState.guestsCount || 'Not specified'}
Budget Range: ${budgetDisplay}
Preferences: ${preferencesText}

I'm interested in the ${packageName} package.

Can you provide more details and confirm availability?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/919614028424?text=${encodedMessage}`;
    
    closeQuestionnaire();
    window.open(whatsappURL, '_blank');
    
    console.log('Connected via WhatsApp with package:', selectedPackage.name);
}

// Close questionnaire modal when clicking outside
window.addEventListener('click', function(event) {
    const questionnaireModal = document.getElementById('questionnaireModal');
    if (event.target === questionnaireModal) {
        closeQuestionnaire();
    }
});

// Close questionnaire with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const questionnaireModal = document.getElementById('questionnaireModal');
        if (questionnaireModal && questionnaireModal.style.display === 'flex') {
            closeQuestionnaire();
        }
    }
});

// Update recommendation when moving to step 3
document.addEventListener('click', function(event) {
    if (event.target.textContent.includes('Next →') && questionnaireState.currentStep === 2) {
        setTimeout(() => {
            displayPackageRecommendation();
        }, 100);
    }
});

// Track preferences checkbox changes
document.addEventListener('change', function(event) {
    if (event.target.name === 'preferences') {
        questionnaireState.preferences = [];
        document.querySelectorAll('input[name="preferences"]:checked').forEach(checkbox => {
            questionnaireState.preferences.push(checkbox.value);
        });
        console.log('Updated preferences:', questionnaireState.preferences);
    }
    
    // Handle Select All checkbox
    if (event.target.id === 'selectAllPreferences') {
        const isChecked = event.target.checked;
        document.querySelectorAll('input[name="preferences"]').forEach(checkbox => {
            checkbox.checked = isChecked;
        });
        
        // Update preferences array
        questionnaireState.preferences = [];
        if (isChecked) {
            document.querySelectorAll('input[name="preferences"]').forEach(checkbox => {
                questionnaireState.preferences.push(checkbox.value);
            });
        }
        console.log('Select All - Updated preferences:', questionnaireState.preferences);
    }
});

// Initialize dynamic content on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Show wedding gallery and hide empty states by default
    const mainGallery = document.getElementById('mainGallery');
    if (mainGallery) {
        mainGallery.style.display = 'grid';
    }
    document.querySelectorAll('.empty-gallery-state').forEach(state => {
        state.style.display = 'none';
    });

    // Load dynamic photos from backend
    try {
        await photosLoader.loadPhotos();
        updateSignatureMomentsFromAPI();
        populateHomeGallery();
    } catch (error) {
        console.warn('Could not load dynamic content:', error);
    }
});

// Update "Signature Moments" cards with first photo from each category from API
function updateSignatureMomentsFromAPI() {
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

    // Reset filter
    photosLoader.filterByCategory('all');
}

// Populate the main gallery on home page from API
function populateHomeGallery() {
    const mainGallery = document.getElementById('mainGallery');
    if (!mainGallery) return;

    const photos = photosLoader.getFilteredPhotos().slice(0, 16); // Show first 16
    if (photos.length === 0) return;

    mainGallery.innerHTML = photos.map((photo, index) => {
        const isLarge = index % 3 === 0 || index % 7 === 0;
        return `
            <div class="gallery-item ${isLarge ? 'large' : ''}" data-category="${photo.category}" 
                 style="background-image: url('${photo.url}'); background-size: cover; background-position: center;">
                <div class="gallery-overlay">
                    <div class="overlay-content">
                        <p class="overlay-text">${photo.title || 'Wedding Moment'}</p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}
