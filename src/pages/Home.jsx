import { useState, useEffect, useMemo } from "react";
import MovieCard from "../components/MovieCard";
import HeroBanner from "../components/HeroBanner";
import SkeletonCard from "../components/SkeletonCard";
import { searchMovies, getPopularMovies, getAvailableGenres } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import { Search, X, SlidersHorizontal, Film, AlertCircle } from "lucide-react";
import "../css/Home.css";

function Home() {
  const { apiKey } = useMovieContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const genres = getAvailableGenres();

  const loadPopularMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopularMovies();
  }, [apiKey]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) {
      setIsSearching(false);
      loadPopularMovies();
      return;
    }

    setLoading(true);
    setIsSearching(true);
    setSelectedGenre("all");
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    loadPopularMovies();
  };

  // Filter and sort movies client-side for smooth UX
  const displayedMovies = useMemo(() => {
    let result = [...movies];

    // Filter by genre
    if (selectedGenre !== "all") {
      result = result.filter(
        (movie) => movie.genre_ids && movie.genre_ids.includes(Number(selectedGenre))
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0));
    } else {
      // Default: popularity or original order
      result.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return result;
  }, [movies, selectedGenre, sortBy]);

  return (
    <div className="home-container">
      {/* Featured Hero Spotlight (shown when not searching) */}
      {!isSearching && movies.length > 0 && <HeroBanner movies={movies} />}

      {/* Search & Filter Control Bar */}
      <section className="search-filter-section">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for movies, actors, directors..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button type="submit" className="search-submit-btn">
            Search
          </button>
        </form>

        <div className="filter-controls-row">
          {/* Genre Category Pills */}
          <div className="genre-pill-list">
            {genres.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`genre-pill ${selectedGenre === g.id ? "active" : ""}`}
                onClick={() => setSelectedGenre(g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="sort-wrapper">
            <SlidersHorizontal size={15} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown"
              aria-label="Sort movies by"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </section>

      {/* Active Filter / Search Indicator */}
      {isSearching && (
        <div className="search-results-header">
          <h2>
            Search results for: <span className="highlight-query">"{searchQuery}"</span>
          </h2>
          <button onClick={handleClearSearch} className="back-to-all-btn">
            View All Movies
          </button>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error-banner">
          <AlertCircle size={20} />
          <span>{error}</span>
          <button onClick={loadPopularMovies} className="retry-btn">
            Retry
          </button>
        </div>
      )}

      {/* Movies Grid / Skeleton Loaders */}
      <section className="catalog-section">
        {loading ? (
          <div className="movies-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : displayedMovies.length > 0 ? (
          <div className="movies-grid">
            {displayedMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        ) : (
          <div className="empty-results-box">
            <Film size={48} className="empty-icon" />
            <h3>No movies found</h3>
            <p>
              {isSearching
                ? `We couldn't find any movies matching "${searchQuery}". Try another keyword or reset filters.`
                : "No movies match the selected category filter."}
            </p>
            <button
              onClick={() => {
                setSelectedGenre("all");
                handleClearSearch();
              }}
              className="reset-filters-btn"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
