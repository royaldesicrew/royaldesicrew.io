# 🚀 Vercel Deployment Ready

I have updated the codebase to be fully compatible with Vercel deployment. Here is a summary of the changes and the steps you need to take.

## ✅ Changes Made

### 1. Frontend (Static Site)
- **Dynamic API URLs**: Updated `static/api-integration.js`, `static/script.js`, and `static/photos-loader.js` to automatically switch between `localhost` and your production backend URL.
- **Vercel Config**: Created `vercel.json` in the frontend root to handle clean URLs (e.g., `/gallery` instead of `/gallery.html`) and optimize caching.

### 2. Backend (API)
- **CORS Update**: Modified `src/server.js` to allow requests from your production domains (`royaldesicrew.com`, `marcosh2002.github.io`) and all `.vercel.app` preview deployments.
- **Vercel Ready**: The existing `vercel.json` in the backend is configured to use `@vercel/node` for serverless execution.

### 3. Admin Panel
- **SPA Support**: Added `vercel.json` to the `admin` folder to ensure React Router works correctly when pages are refreshed.

---

## 🛠️ Deployment Steps

### 1. Deploy the Backend
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Import the `backend` directory as a new project.
3. **Environment Variables**: Add the following:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary name.
   - `CLOUDINARY_API_KEY`: Your Cloudinary key.
   - `CLOUDINARY_API_SECRET`: Your Cloudinary secret.
   - `RESEND_API_KEY`: Your Resend API key for emails.
4. Note the deployed URL: `https://backend-two-umber-54.vercel.app`.

### 2. Deploy the Admin Panel
1. Import the `backend/admin` directory as a new project.
2. **Environment Variables**:
   - `REACT_APP_API_URL`: The URL of your deployed backend (from Step 1).
3. Set the **Build Command** to `npm run build` and **Output Directory** to `build`.

### 3. Deploy the Frontend
1. Import the `marcosh2002.github.io-main` directory.
2. If your backend URL is different from `https://royal-desi-crew-backend.vercel.app`, you'll need to update the URLs in `static/api-integration.js` and `static/photos-loader.js` or ask me to change them to a specific URL you prefer.

---

## 📝 Post-Deployment
- Ensure your MongoDB Atlas IP Whitelist allows access from `0.0.0.0/0` (since Vercel uses dynamic IPs).
- Test the contact forms and gallery to ensure they connect to the backend.
