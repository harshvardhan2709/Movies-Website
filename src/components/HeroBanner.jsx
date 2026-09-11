import { useState, useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { Info, Heart, Star, Sparkles } from "lucide-react";
import "../css/HeroBanner.css";

function HeroBanner({ movies = [] }) {
  const { setSelectedMovie, isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Pick top movies with backdrop paths
  const featuredMovies = movies.filter((m) => m.backdrop_path).slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % featuredMovies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (featuredMovies.length === 0) return null;

  const movie = featuredMovies[featuredIndex] || featuredMovies[0];
  const favorite = isFavorite(movie.id);

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const handleFavorite = () => {
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="hero-banner" style={{ backgroundImage: `url(${backdropUrl})` }}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Featured Spotlight</span>
        </div>

        <h1 className="hero-title">{movie.title}</h1>

        <div className="hero-meta">
          {movie.vote_average ? (
            <span className="hero-rating">
              <Star size={16} fill="#f59e0b" color="#f59e0b" />
              <strong>{Number(movie.vote_average).toFixed(1)}</strong>
            </span>
          ) : null}
          {movie.release_date && (
            <span className="hero-year">{movie.release_date.split("-")[0]}</span>
          )}
        </div>

        <p className="hero-overview">{movie.overview}</p>

        <div className="hero-actions">
          <button
            className="hero-btn-primary"
            onClick={() => setSelectedMovie(movie)}
          >
            <Info size={18} />
            <span>More Info</span>
          </button>

          <button
            className={`hero-btn-secondary ${favorite ? "active" : ""}`}
            onClick={handleFavorite}
          >
            <Heart size={18} fill={favorite ? "#e50914" : "none"} color={favorite ? "#e50914" : "currentColor"} />
            <span>{favorite ? "In Favorites" : "Add to Favorites"}</span>
          </button>
        </div>

        {featuredMovies.length > 1 && (
          <div className="hero-indicators">
            {featuredMovies.map((item, idx) => (
              <button
                key={item.id}
                className={`hero-dot ${idx === featuredIndex ? "active" : ""}`}
                onClick={() => setFeaturedIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroBanner;
