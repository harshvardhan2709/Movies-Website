import { MOCK_MOVIES, GENRES } from "../data/mockMovies";

const BASE_URL = "https://api.themoviedb.org/3";

export const getApiKey = () => {
  return localStorage.getItem("tmdb_api_key") || import.meta.env.VITE_TMDB_API_KEY || "";
};

export const setStoredApiKey = (key) => {
  if (!key || key.trim() === "") {
    localStorage.removeItem("tmdb_api_key");
  } else {
    localStorage.setItem("tmdb_api_key", key.trim());
  }
};

export const isLiveMode = () => {
  return Boolean(getApiKey());
};

export const getPopularMovies = async (page = 1) => {
  const apiKey = getApiKey();

  if (!apiKey) {
    // Return mock data with simulated delay for realistic UX
    await new Promise((res) => setTimeout(res, 250));
    return MOCK_MOVIES;
  }

  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${apiKey}&page=${page}`);
    if (!response.ok) {
      console.warn("TMDB request failed, falling back to demo movies:", response.statusText);
      return MOCK_MOVIES;
    }
    const data = await response.json();
    return data.results && data.results.length > 0 ? data.results : MOCK_MOVIES;
  } catch (err) {
    console.warn("Error fetching popular movies from TMDB:", err);
    return MOCK_MOVIES;
  }
};

export const searchMovies = async (query) => {
  if (!query || !query.trim()) return [];
  const cleanQuery = query.trim().toLowerCase();
  const apiKey = getApiKey();

  if (!apiKey) {
    await new Promise((res) => setTimeout(res, 200));
    return MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(cleanQuery) ||
        (m.overview && m.overview.toLowerCase().includes(cleanQuery))
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(cleanQuery)}`
    );
    if (!response.ok) {
      console.warn("TMDB search failed, falling back to mock search:", response.statusText);
      return MOCK_MOVIES.filter((m) =>
        m.title.toLowerCase().includes(cleanQuery)
      );
    }
    const data = await response.json();
    return data.results || [];
  } catch (err) {
    console.warn("Error searching movies:", err);
    return MOCK_MOVIES.filter((m) =>
      m.title.toLowerCase().includes(cleanQuery)
    );
  }
};

export const getAvailableGenres = () => {
  return GENRES;
};