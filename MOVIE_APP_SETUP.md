# Movie App Setup Guide

## 🎬 Overview
A simple YouTube-style movie app built with React, TypeScript, React Router, and TMDB API.

## ⚙️ Quick Setup

### 1. Get TMDB API Key
1. Visit https://www.themoviedb.org/signup
2. Create a free account
3. Go to Settings → API → Create API Key
4. Copy your API Key (v3 auth)

### 2. Add API Key
Open `src/services/tmdbApi.ts` and replace:
```typescript
const API_KEY = 'YOUR_API_KEY_HERE';
```
With your actual API key:
```typescript
const API_KEY = 'abc123...';
```

### 3. Run the App
```bash
npm run dev
```

## 🎯 Features

### Home Page (/)
- ✅ Infinite scroll
- ✅ Multi-endpoint parallel fetching (Trending, Now Playing, Top Rated)
- ✅ Skeleton loading states
- ✅ YouTube-style grid layout

### Search Page (/search)
- ✅ Debounced search (500ms)
- ✅ URL query synchronization
- ✅ Empty state handling
- ✅ Real-time results

### Movie Details (/movie/:id)
- ✅ YouTube trailer embed
- ✅ Parallel data fetching (details, cast, videos)
- ✅ Cast list with photos
- ✅ Optimized images

## 📁 Project Structure
```
src/
├── movieapp.tsx          # Main app with routing
├── services/
│   └── tmdbApi.ts        # TMDB API service
├── hooks/
│   ├── useDebounce.ts    # Debounce hook
│   └── useInfiniteScroll.ts  # Infinite scroll hook
├── movie/
│   ├── Navigation.tsx    # Top navigation
│   ├── MovieCard.tsx     # Movie card component
│   └── Skeleton.tsx      # Loading skeletons
├── pages/
│   ├── HomePage.tsx      # Home page
│   ├── SearchPage.tsx    # Search page
│   └── MovieDetailsPage.tsx  # Movie details
└── types/
    └── movie.types.ts    # TypeScript types
```

## 🚀 Technical Highlights

### Performance Optimizations
- **Debouncing**: Search input debounced to 500ms to reduce API calls
- **Infinite Scroll**: Uses Intersection Observer API for efficient scrolling
- **Parallel Fetching**: Uses `Promise.all()` to fetch multiple endpoints simultaneously
- **Image Optimization**: Uses w500 size instead of original for faster loading
- **Lazy Loading**: Images use `loading="lazy"` attribute

### Code Quality
- Full TypeScript support
- Custom hooks for reusable logic
- Clean separation of concerns
- YouTube-inspired simple UI

## 📝 Usage in App

To use the Movie App in your main App.tsx, simply import and render:
```tsx
import MovieApp from './movieapp';

function App() {
  return <MovieApp />;
}
```
