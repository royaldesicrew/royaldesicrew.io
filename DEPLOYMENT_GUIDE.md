# Royal Desi Crew - Deployment Guide

## 🎯 Architecture Overview

This project has been restructured for a permanent, scalable solution:

- **Frontend**: `marcosh2002.github.io-main` - Deployed on GitHub Pages
- **Backend API**: Separate Vercel repository - Handles MongoDB & Cloudinary
- **Admin Panel**: Part of backend repo - Manages photo uploads & content
- **Database**: MongoDB Atlas - Cloud-hosted database
- **Image Storage**: Cloudinary - CDN for all image delivery

## 📋 Prerequisites

Before deployment, ensure you have:

1. **MongoDB Atlas Account** - https://www.mongodb.com/cloud/atlas
2. **Cloudinary Account** - https://cloudinary.com
3. **Vercel Account** - https://vercel.com
4. **GitHub Account** - For repositories

## 🔧 Step 1: Set Up Cloudinary for Image Storage

### Why Cloudinary?
Vercel doesn't have persistent file storage, so we use Cloudinary to store all images.

### Setup Steps:

1. Go to https://cloudinary.com and sign up for free
2. Navigate to Dashboard > Settings > API Keys
3. Copy your:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

**Keep these secure! You'll need them in environment variables.**

## 🗄️ Step 2: Set Up MongoDB Atlas

### Setup Steps:

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a new cluster (use free tier if starting)
3. Create a database user:
   - Go to Database Access
   - Add New Database User
   - Copy username and password (you'll need these)
4. Get Connection String:
   - Go to Databases
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

**Format**: `mongodb+srv://username:password@cluster.mongodb.net/royal-desi-crew?retryWrites=true&w=majority`

## 🚀 Step 3: Create Backend Repository on Vercel

### Option A: Using Vercel CLI (Recommended)

```bash
# Clone the backend from rdc backend folder
git init royal-desi-crew-backend
cd royal-desi-crew-backend

# Copy files from: e:\marcosh2002.github.io-main\rdc backend\backend\

# Initialize git
git add .
git commit -m "Initial backend setup"

# Connect to Vercel
npm i -g vercel
vercel

# Choose to link to new project
# Select Royal Desi Crew Backend
```

### Option B: Manual Upload to GitHub & Vercel

1. Create repository: `royal-desi-crew-backend` on GitHub
2. Push backend files from `rdc backend/backend/`
3. Go to https://vercel.com/new
4. Import the GitHub repository
5. Select backend folder as root directory

## 🔐 Step 4: Configure Environment Variables

### In Vercel Dashboard:

Go to your project > Settings > Environment Variables

Add these variables:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/royal-desi-crew
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_SECRET=your_super_secret_key_change_this_2024
ADMIN_EMAIL=admin@royaldesicrew.com
ADMIN_PASSWORD=YourSecurePassword@123
RESEND_API_KEY=your_resend_api_key_if_using
FRONTEND_URL=https://royaldesicrew.com
NODE_ENV=production
```

## ✅ Step 5: Deploy Backend

```bash
# From vercel dashboard or CLI
vercel --prod

# Verify deployment
curl https://your-backend-url.vercel.app/api/health
```

**You should see**: `{"status":"OK","message":"Server is running"}`

## 🎨 Step 6: Update Frontend Configuration

### In `static/api-integration.js`:

Replace:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

With your deployed Vercel URL:
```javascript
const API_BASE_URL = 'https://your-backend-url.vercel.app/api';
```

### In `static/photos-loader.js`:

Update the apiBaseUrl:
```javascript
this.apiBaseUrl = 'https://your-backend-url.vercel.app/api';
```

### Admin Panel `.env` file:

In `rdc backend/backend/admin/.env.local`:
```env
REACT_APP_API_URL=https://your-backend-url.vercel.app
REACT_APP_ADMIN_URL=https://admin.your-vercel-url.vercel.app
```

## 📱 Step 7: Access Admin Panel

1. Navigate to: `https://your-backend-url.vercel.app/admin`
2. Login with credentials:
   - Email: `admin@royaldesicrew.com`
   - Password: `YourSecurePassword@123` (from env variables)
3. Go to "Photos" tab
4. Click "Add New Photo"
5. Upload photo - it will be stored on Cloudinary automatically

## 🖼️ Photo Upload Flow

```
Admin Panel (React)
      ↓
Backend API (Node.js)
      ↓
Cloudinary CDN (Image Storage)
      ↓
Frontend (Displays from Cloudinary URL)
```

## 📊 Verify Setup

### Test API Endpoints:

```bash
# Get all photos
curl https://your-backend-url.vercel.app/api/photos

# Response should include photos from MongoDB
{
  "success": true,
  "photos": [
    {
      "_id": "123...",
      "title": "Photo Title",
      "url": "https://res.cloudinary.com/.../image.jpg",
      "category": "Luxury Weddings",
      ...
    }
  ]
}
```

### Test Admin Login:

```bash
curl -X POST https://your-backend-url.vercel.app/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@royaldesicrew.com","password":"YourSecurePassword@123"}'

# Should return a JWT token
```

## 🔄 Update Images on Website

When you upload photos through the admin panel:

1. Photo is uploaded to Cloudinary
2. URL is stored in MongoDB
3. Website fetches latest photos from API
4. Images display from Cloudinary CDN (fast & global)

**No need to rebuild or redeploy the frontend!**

## 🛡️ Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Enable CORS only for your domain
- [ ] Use environment variables (never hardcode secrets)
- [ ] Enable MongoDB IP Whitelist
- [ ] Set up Cloudinary API rate limits
- [ ] Use HTTPS everywhere
- [ ] Regularly update npm dependencies

## 🐛 Troubleshooting

### Photos not showing?
- Check if backend API is responding: `/api/health`
- Verify Cloudinary credentials in env variables
- Check browser console for CORS errors

### Upload fails?
- Verify MongoDB connection string
- Check Cloudinary API key is correct
- Ensure file size is under 10MB
- Check user is authenticated

### Admin panel won't load?
- Clear browser cache
- Verify REACT_APP_API_URL is correct
- Check authentication token in browser localStorage

## 📞 Support

For issues, check:
1. Vercel deployment logs: `vercel logs`
2. MongoDB logs: MongoDB Atlas Dashboard
3. Cloudinary logs: Cloudinary Dashboard
4. Browser console: F12 > Console tab

## 🎉 You're Done!

Your Royal Desi Crew website now has:
- ✅ Dynamic photo management
- ✅ Cloud image storage
- ✅ Admin panel for uploads
- ✅ Production-ready deployment
- ✅ Global CDN for images

**Next Steps:**
- Train admin on photo upload process
- Set up custom domain on Vercel
- Configure email notifications
- Set up analytics tracking
