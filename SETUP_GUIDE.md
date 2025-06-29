# Complete eCommerce Application Setup Guide

## Prerequisites

Before starting, make sure you have the following installed on your system:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

## Step 1: Project Setup

### 1.1 Create Project Directory
```bash
mkdir ecommerce-app
cd ecommerce-app
```

### 1.2 Initialize the Project
```bash
npm init -y
```

### 1.3 Install Dependencies
```bash
# Core dependencies
npm install react react-dom react-router-dom
npm install @reduxjs/toolkit react-redux
npm install react-hook-form react-hot-toast
npm install lucide-react
npm install @supabase/supabase-js

# Development dependencies
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint @eslint/js globals
npm install -D eslint-plugin-react-hooks eslint-plugin-react-refresh
```

### 1.4 Initialize Tailwind CSS
```bash
npx tailwindcss init -p
```

## Step 2: Project Structure

Create the following folder structure:
```
ecommerce-app/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── product/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   └── auth/
│   ├── store/
│   │   └── slices/
│   ├── types/
│   └── utils/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env
```

## Step 3: Configuration Files

### 3.1 Update package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### 3.2 Create .env file
```env
# For development - these are placeholder values
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Alternative: Use mock data (no backend required)
VITE_USE_MOCK_DATA=true
```

## Step 4: Running the Application

### 4.1 Start Development Server
```bash
npm run dev
```

### 4.2 Open in Browser
Navigate to: http://localhost:5173

## Step 5: Features Available

The application includes:

✅ **Product Catalog**
- Browse products with filtering and search
- Product detail pages with image galleries
- Category-based navigation

✅ **Shopping Cart**
- Add/remove items
- Quantity management
- Persistent cart state

✅ **User Authentication**
- Sign up and sign in forms
- User session management
- Protected routes

✅ **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Modern UI with Tailwind CSS

## Step 6: Database Options

### Option A: Use Mock Data (Recommended for Quick Start)
The application comes with built-in mock data that works immediately without any backend setup.

### Option B: Connect to Supabase (Free Database)
1. Go to https://supabase.com
2. Create a free account
3. Create a new project
4. Get your project URL and anon key
5. Update the .env file with your credentials

### Option C: Build Custom Backend
If you want to build a custom Express.js backend:

1. Create a separate backend folder
2. Set up Express.js with MongoDB
3. Implement REST APIs
4. Update the API client to point to your backend

## Step 7: Troubleshooting

### Common Issues:

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not loading:**
```bash
# Restart the dev server
npm run dev
```

## Step 8: Development Workflow

### 8.1 Making Changes
- Edit files in the `src/` directory
- Changes will hot-reload automatically
- Check the browser console for any errors

### 8.2 Adding New Features
- Components go in `src/components/`
- Pages go in `src/pages/`
- State management in `src/store/slices/`
- Utilities in `src/utils/`

### 8.3 Building for Production
```bash
npm run build
```

## Step 9: Next Steps

Once you have the basic application running:

1. **Customize the Design**: Modify Tailwind classes and components
2. **Add Real Data**: Connect to Supabase or build a backend
3. **Implement Payments**: Integrate Stripe or other payment providers
4. **Add More Features**: Reviews, wishlist, admin panel, etc.
5. **Deploy**: Use Vercel, Netlify, or other hosting services

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Ensure Node.js version is 16+
4. Check that all files are in the correct directories

The application is designed to work out of the box with mock data, so you can start developing immediately!