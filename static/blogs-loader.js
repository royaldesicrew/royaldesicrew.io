// Blogs Loader - Manages blog data and dynamic rendering
class BlogsLoader {
    constructor() {
        this.blogs = [];
        this.container = document.querySelector('.blog-posts');
    }

    // Load blogs from API
    async loadBlogs() {
        if (!this.container) return;

        // Show loading state
        this.container.innerHTML = `
            <div class="loading-spinner" style="text-align: center; padding: 50px; grid-column: 1/-1;">
                <i class="fas fa-spinner fa-spin" style="font-size: 40px; color: #D4AF37; margin-bottom: 15px;"></i>
                <p style="color: #e0e0e0;">Fetching latest stories...</p>
            </div>
        `;

        try {
            const blogs = await BlogsAPI.getAll();
            this.blogs = blogs;
            console.log('✅ Blogs loaded from API:', blogs.length);
            this.renderBlogs();
        } catch (error) {
            console.error('❌ Failed to load blogs:', error);
            this.showError();
        }
    }

    // Render blogs to the container
    renderBlogs() {
        if (!this.container) return;

        if (this.blogs.length === 0) {
            this.container.innerHTML = `
                <div class="empty-blogs" style="text-align: center; padding: 60px; border: 1px dashed rgba(212, 175, 55, 0.3); border-radius: 10px;">
                    <i class="fas fa-book-open" style="font-size: 50px; color: rgba(212, 175, 55, 0.5); margin-bottom: 20px;"></i>
                    <h3 style="color: #D4AF37; font-family: 'Bodoni Moda', serif; font-size: 24px;">New Stories Coming Soon</h3>
                    <p style="color: #b0b0b0; font-family: 'Poppins', sans-serif;">We're currently penning down some magical event stories. Stay tuned!</p>
                </div>
            `;
            return;
        }

        this.container.innerHTML = this.blogs.map(blog => this.createBlogHTML(blog)).join('');
    }

    // Create HTML for a single blog post
    createBlogHTML(blog) {
        const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Use a placeholder if no image is provided
        const imageUrl = blog.image || 'static/Images/Background.png';

        return `
            <div class="blog-post" data-id="${blog._id}">
                <div class="blog-post-date">${date}</div>
                <h2 class="blog-post-title">${blog.title}</h2>
                <div class="blog-post-meta" style="margin-bottom: 15px; font-size: 13px; color: #888;">
                    By <span style="color: #D4AF37;">${blog.author || 'Royal Desi Crew'}</span>
                </div>
                <p class="blog-post-excerpt">${blog.content.substring(0, 250)}${blog.content.length > 250 ? '...' : ''}</p>
                <div class="blog-post-footer">
                    <span class="blog-category">Article</span>
                    <a href="blog-single.html?id=${blog._id}" class="read-more">Read Full Story <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
    }

    showError() {
        if (!this.container) return;
        this.container.innerHTML = `
            <div class="error-blogs" style="text-align: center; padding: 50px; color: #ff4d4d;">
                <i class="fas fa-exclamation-circle" style="font-size: 40px; margin-bottom: 15px;"></i>
                <p>Unable to connect to the blog server. Please check your connection or try again later.</p>
                <button onclick="blogsLoader.loadBlogs()" class="btn" style="margin-top: 20px; border: 1px solid #ff4d4d; color: #ff4d4d; background: transparent; padding: 8px 20px; border-radius: 5px; cursor: pointer;">Retry</button>
            </div>
        `;
    }
    // Load a single blog by ID
    async loadSingleBlog(id) {
        const container = document.getElementById('single-blog-container');
        if (!container) return;

        container.innerHTML = `<div class="loading-spinner" style="text-align: center; padding: 100px;"><i class="fas fa-spinner fa-spin" style="font-size: 50px; color: #D4AF37;"></i></div>`;

        try {
            const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
            if (!response.ok) throw new Error('Blog not found');
            const data = await response.json();
            const blog = data.blog;

            const date = new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            container.innerHTML = `
                <article class="blog-full-content">
                    <div class="blog-post-date">${date}</div>
                    <h1 class="blog-post-title" style="font-size: 48px; margin-bottom: 20px;">${blog.title}</h1>
                    <div class="blog-post-meta" style="margin-bottom: 40px; font-size: 16px;">
                        By <span style="color: #D4AF37;">${blog.author || 'Royal Desi Crew'}</span>
                    </div>
                    ${blog.image ? `<img src="${blog.image}" alt="${blog.title}" style="width: 100%; border-radius: 15px; margin-bottom: 40px; border: 1px solid rgba(212, 175, 55, 0.3);">` : ''}
                    <div class="blog-text" style="font-size: 18px; line-height: 1.8; color: #e0e0e0; white-space: pre-wrap;">${blog.content}</div>
                </article>
            `;
            
            // Track view
            if (typeof AnalyticsAPI !== 'undefined') {
                AnalyticsAPI.trackBlogView(id);
            }
        } catch (error) {
            container.innerHTML = `<div class="error-msg" style="text-align: center; padding: 100px;"><h2>Blog not found</h2><p>${error.message}</p><a href="blog.html" class="blog-back-btn" style="margin-top: 20px;">Back to Blogs</a></div>`;
        }
    }
}

// Initialize on page load
const blogsLoader = new BlogsLoader();
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (blogId && window.location.pathname.includes('blog-single.html')) {
        blogsLoader.loadSingleBlog(blogId);
    } else if (window.location.pathname.includes('blog.html')) {
        blogsLoader.loadBlogs();
    }
});
