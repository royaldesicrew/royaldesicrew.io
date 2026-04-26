const API_BASE_URL = 'https://backend-two-umber-54.vercel.app/api';
// const API_BASE_URL = 'http://localhost:5000/api'; // Local development fallback

console.log('🌐 API Base URL:', API_BASE_URL);

// Photos API Integration
class PhotosAPI {
  static async getAll() {
    console.log('📸 Attempting to fetch photos from:', `${API_BASE_URL}/photos`);
    try {
      const response = await fetch(`${API_BASE_URL}/photos`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors'
      });
      
      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.warn('⚠️ Backend response not OK, status:', response.status);
        throw new Error(`Failed to fetch photos: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        console.warn('⚠️ API returned success:false', data);
        throw new Error(data.error || 'API returned failure');
      }

      console.log('✅ Photos fetched successfully:', data.photos ? data.photos.length : 0, 'photos found');
      return data.photos || [];
    } catch (error) {
      console.error('❌ Error fetching photos from backend:', error);
      console.log('🔄 Falling back to static photos.json');
      return await this.getStaticPhotos();
    }
  }

  static async getStaticPhotos() {
    try {
      const response = await fetch('static/photos.json');
      const data = await response.json();
      return data.photos || [];
    } catch (error) {
      console.error('Error loading static photos:', error);
      return [];
    }
  }
}

// Blogs API Integration
class BlogsAPI {
  static async getAll() {
    console.log('📝 Attempting to fetch blogs from:', `${API_BASE_URL}/blogs`);
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      console.log('📡 Blogs Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        console.warn('⚠️ Blogs API response not OK, status:', response.status);
        throw new Error(`Failed to fetch blogs: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Blogs fetched successfully:', data.blogs ? data.blogs.length : 0, 'blogs found');
      return data.blogs || [];
    } catch (error) {
      console.error('❌ Error fetching blogs:', error);
      console.log('🔄 Falling back to static blogs.json (if available)');
      return await this.getStaticBlogs();
    }
  }

  static async getStaticBlogs() {
    try {
      const response = await fetch('static/blogs.json');
      if (!response.ok) return [];
      const data = await response.json();
      return data.blogs || [];
    } catch (error) {
      console.error('Error loading static blogs:', error);
      return [];
    }
  }
}

// Discounts API Integration
class DiscountsAPI {
  static async getAll() {
    try {
      const response = await fetch(`${API_BASE_URL}/discounts`);
      if (!response.ok) throw new Error('Failed to fetch discounts');
      const data = await response.json();
      return data.discounts || [];
    } catch (error) {
      console.error('Error fetching discounts:', error);
      return [];
    }
  }

  static async validate(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/discounts/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      });
      if (!response.ok) throw new Error('Invalid discount code');
      return await response.json();
    } catch (error) {
      console.error('Error validating discount:', error);
      return null;
    }
  }
}

// Emails API Integration
class EmailsAPI {
  static async sendInquiry(payload) {
    try {
      const response = await fetch(`${API_BASE_URL}/emails/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send inquiry');
      return data;
    } catch (error) {
      console.error('Error sending inquiry:', error);
      return { success: false, error: error.message };
    }
  }
}

// Analytics API Integration
class AnalyticsAPI {
  static async trackPageView() {
    try {
      fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'page_view',
          userAgent: navigator.userAgent,
          ipAddress: 'browser' // IP will be captured by server
        })
      }).catch(err => console.log('Analytics tracking skipped'));
    } catch (error) {
      // Silent error - don't block page for analytics
    }
  }

  static async trackPhotoView(photoId) {
    try {
      fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'photo_view',
          photoId,
          userAgent: navigator.userAgent,
          ipAddress: 'browser'
        })
      }).catch(err => console.log('Photo view tracking skipped'));
    } catch (error) {
      // Silent error
    }
  }

  static async trackBlogView(blogId) {
    try {
      fetch(`${API_BASE_URL}/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'blog_view',
          blogId,
          userAgent: navigator.userAgent,
          ipAddress: 'browser'
        })
      }).catch(err => console.log('Blog view tracking skipped'));
    } catch (error) {
      // Silent error
    }
  }
}

// Initialize tracking when page loads
document.addEventListener('DOMContentLoaded', () => {
  AnalyticsAPI.trackPageView();
});

console.log('✅ API Integration loaded successfully');
