import { useMovieContext } from "../contexts/MovieContext";
import { Heart, Star } from "lucide-react";
import "../css/MovieCard.css";

function MovieCard({ movie }) {
  const { isFavorite, addToFavorites, removeFromFavorites, setSelectedMovie } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function onFavoriteClick(e) {
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/500x750/161b26/ffffff?text=No+Poster";

  return (
    <div
      className="movie-card"
      onClick={() => setSelectedMovie(movie)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setSelectedMovie(movie);
        }
      }}
    >
      <div className="movie-poster">
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/500x750/161b26/ffffff?text=Movie";
          }}
        />

        {movie.vote_average ? (
          <div className="card-rating-badge">
            <Star size={13} fill="#f59e0b" color="#f59e0b" />
            <span>{Number(movie.vote_average).toFixed(1)}</span>
          </div>
        ) : null}

        <button
          className={`favorite-btn ${favorite ? "active" : ""}`}
          onClick={onFavoriteClick}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            size={18}
            fill={favorite ? "#ff4757" : "none"}
            color={favorite ? "#ff4757" : "#ffffff"}
          />
        </button>

        <div className="movie-overlay">
          <span className="quick-view-hint">Click for details</span>
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>
          {movie.title}
        </h3>
        <p className="movie-release">
          {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;