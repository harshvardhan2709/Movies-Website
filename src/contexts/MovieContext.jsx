/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getApiKey, setStoredApiKey, isLiveMode } from "../services/api";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  // 1. Lazy state initialization to prevent overwriting saved favorites on mount
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavs = localStorage.getItem("favorites");
      return storedFavs ? JSON.parse(storedFavs) : [];
    } catch (err) {
      console.error("Failed to load favorites from localStorage:", err);
      return [];
    }
  });

  // 2. Toast notification state
  const [toast, setToast] = useState(null);

  // 3. Modal details view
  const [selectedMovie, setSelectedMovie] = useState(null);

  // 4. API Key management
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [liveMode, setLiveMode] = useState(isLiveMode());

  // Keep localStorage synced whenever favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites to localStorage:", err);
    }
  }, [favorites]);

  const showToast = useCallback((message, type = "info") => {
    setToast({ message, type, id: Date.now() });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const addToFavorites = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) return;
    setFavorites((prev) => [...prev, movie]);
    showToast(`Added "${movie.title}" to your favorites!`, "success");
  };

  const removeFromFavorites = (movieId) => {
    const movie = favorites.find((m) => m.id === movieId);
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    if (movie) {
      showToast(`Removed "${movie.title}" from favorites`, "info");
    }
  };

  const clearAllFavorites = () => {
    if (favorites.length === 0) return;
    setFavorites([]);
    showToast("Cleared all favorites", "info");
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const updateApiKey = (newKey) => {
    setStoredApiKey(newKey);
    setApiKeyState(newKey);
    setLiveMode(Boolean(newKey));
    showToast(
      newKey ? "TMDB API Key updated successfully!" : "Switched to Demo Mode (Built-in movies)",
      "success"
    );
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    clearAllFavorites,
    isFavorite,
    toast,
    showToast,
    hideToast,
    selectedMovie,
    setSelectedMovie,
    apiKey,
    updateApiKey,
    liveMode,
    isApiKeyModalOpen,
    setIsApiKeyModalOpen,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};