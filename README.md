<div align="center">

# 🎬 HMovies — Modern Cinema & Streaming Hub

[![React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.9-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![TMDB](https://img.shields.io/badge/TheMovieDatabase-API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)](https://www.themoviedb.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

An elevated, cinema-grade movie exploration web application built with **React 19**, **Vite**, and **Vanilla CSS**. Browse trending blockbusters, search titles, filter by genre, inspect detailed synopses, and curate your personalized watchlist.

[Explore Features](#-features) • [Quick Start](#-quick-start) • [API Setup](#-the-movie-database-tmdb-setup) • [Architecture](#-project-structure)

</div>

---

## ✨ Features

- 🌟 **Cinema-Grade Dark Aesthetic**: Styled with a bespoke palette (obsidian background, charcoal cards, glowing accents, and glassmorphic blurred navigation).
- ⚡ **Zero-Setup Out-of-the-Box Mode**: Comes with a pre-configured high-fidelity movie catalog. Works instantly upon cloning without requiring an API key.
- 🔑 **Dual Live/Demo API Switcher**: Seamlessly switch between the offline catalog and live TMDB global database directly from the in-app modal or via `.env`.
- 📽️ **Hero Spotlight Banner**: Dynamic banner featuring high-resolution backdrop art, star rating badges, synopses, and quick actions.
- 🔍 **Real-Time Movie Search**: Instant search bar with clear button (`X`), query highlight, and graceful empty-state handling.
- 🏷️ **Genre Filtering & Sorting**: Filter by genres (*Action, Sci-Fi, Adventure, Drama, Comedy, Thriller, Animation, Horror*) and sort by *Popularity*, *Top Rated*, or *Newest*.
- 🪟 **Interactive Movie Details Modal (Quick View)**: Click any title to inspect high-res backdrop art, cast-friendly overview, release dates, star ratings, and launch YouTube trailer searches.
- ❤️ **Persistent Favorites Watchlist**: Save favorites with automatic `localStorage` synchronization, filter within favorites, and batch remove with a single click.
- 🔔 **Toast Notification System**: Real-time feedback alerts when adding or removing titles from your watchlist.
- 💀 **Skeleton Loading Screens**: Smooth shimmer loading placeholder cards for seamless user perception.
- 📱 **Mobile & Tablet Optimized**: Responsive grid layout and touch-friendly controls.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Component-based UI library & hooks |
| **Vite 7** | Next-generation frontend build tooling & HMR |
| **React Router 7** | Client-side routing with active navigation indicators |
| **Vanilla CSS** | Tailored design system, glassmorphism, responsive grids & animations |
| **Lucide React** | Clean, modern iconography |
| **TMDB API** | Rich international movie metadata & artwork CDN |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/harshvardhan2709/Movies-Website.git
cd Movies-Website/frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. (Optional) Configure TMDB API Key
Create a `.env` file from the provided `.env.example`:
```bash
cp .env.example .env
```
Open `.env` and insert your TMDB API Key:
```env
VITE_TMDB_API_KEY=your_actual_tmdb_api_key
```
> **Note**: If you don't provide an API key, HMovies will run in **Demo Mode** using the built-in offline movie catalog. You can also configure the API key directly inside the running app anytime!

### 4. Run the development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔑 The Movie Database (TMDB) Setup

To connect live global search and unlimited movie exploration:
1. Register for a free account at [The Movie Database (TMDB)](https://www.themoviedb.org/signup).
2. Go to **Settings** → [API](https://www.themoviedb.org/settings/api).
3. Request an **API Key (v3 auth)**.
4. Add it to `.env` as `VITE_TMDB_API_KEY=your_key`, or click the **Demo Mode / Live API** button in the app header and paste your key.

---

## 📂 Project Structure

```text
frontend/
├── public/
│   ├── favicon.svg          # Film reel SVG icon
│   └── image.png            # Legacy brand asset
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.jsx  # TMDB API Key settings modal
│   │   ├── HeroBanner.jsx   # Spotlight carousel hero header
│   │   ├── MovieCard.jsx    # Movie card with star rating & poster error fallback
│   │   ├── MovieModal.jsx   # Detailed synopsis & trailer launcher modal
│   │   ├── NavBar.jsx       # Glassmorphic header with NavLink & counter badge
│   │   ├── SkeletonCard.jsx # Shimmer loading placeholder
│   │   └── Toast.jsx        # Floating notifications component
│   ├── contexts/
│   │   └── MovieContext.jsx # Global favorites, toast & modal state (with lazy localStorage)
│   ├── css/
│   │   ├── ApiKeyModal.css  # API modal dialog styling
│   │   ├── App.css          # App layout and sticky footer
│   │   ├── Favorites.css    # Favorites collection and empty state styles
│   │   ├── HeroBanner.css   # Hero backdrop gradients and animations
│   │   ├── Home.css         # Grid, search bar, and genre pills styling
│   │   ├── MovieCard.css    # Card hover zoom and badge styling
│   │   ├── MovieModal.css   # Modal overlay and artwork layout
│   │   ├── Navbar.css       # Glassmorphic header styles
│   │   ├── SkeletonCard.css # Shimmer animation keyframes
│   │   ├── Toast.css        # Toast alert slide-in styling
│   │   └── index.css        # Core design system tokens & scrollbars
│   ├── data/
│   │   └── mockMovies.js    # Built-in demo movies and genre definitions
│   ├── pages/
│   │   ├── Favorites.jsx    # Watchlist page with search filter & clear all
│   │   └── Home.jsx         # Homepage with hero, filters, search & grid
│   ├── services/
│   │   └── api.js           # TMDB fetch logic with seamless mock fallback
│   ├── App.jsx              # Main router and global modal providers
│   └── main.jsx             # React DOM root entry
├── .env.example             # Example environment file
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry with Google Fonts & SEO meta tags
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite build configuration
```

---

## 🔧 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Bundles the production-ready application into `dist/`.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs ESLint to check for code quality and syntax issues.

---

## 💡 Improvements & Key Bug Fixes Made

1. **Fixed Truthy Empty Array Bug in Favorites**: In the original code, `if (favorites)` evaluated to `true` even when `favorites` was empty (`[]`), causing an empty grid to display instead of the helpful empty state. Fixed with `favorites.length > 0`.
2. **Fixed `localStorage` Overwrite Race Condition**: The original context had two separate `useEffect` hooks where the second hook would immediately overwrite existing saved favorites with `[]` on initial render. Solved via idiomatic React lazy state initialization `useState(() => JSON.parse(localStorage.getItem(...)))`.
3. **Zero-Configuration Fallback Catalog**: Solved the broken empty API key issue (`API_KEY = ""`) by providing a curated fallback dataset and graceful error handling.
4. **Standardized Project Conventions**: Renamed `Home.tsx` to `Home.jsx` to eliminate file extension inconsistencies in a pure JavaScript React codebase.
5. **Modern Iconography**: Integrated `lucide-react` for crisp SVG icons across hearts, stars, film reels, search, and settings.
6. **Detailed Quick View Modal**: Users can now click any movie to read full overviews, view high-res artwork, and search trailers on YouTube.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
