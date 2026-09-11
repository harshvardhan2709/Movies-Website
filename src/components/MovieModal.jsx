import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { X, Star, Calendar, Heart, Play, Users } from "lucide-react";
import { GENRES } from "../data/mockMovies";
import "../css/MovieModal.css";

function MovieModal() {
  const { selectedMovie, setSelectedMovie, isFavorite, addToFavorites, removeFromFavorites } =
    useMovieContext();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedMovie(null);
      }
    };

    if (selectedMovie) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedMovie, setSelectedMovie]);

  if (!selectedMovie) return null;

  const favorite = isFavorite(selectedMovie.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFromFavorites(selectedMovie.id);
    } else {
      addToFavorites(selectedMovie);
    }
  };

  const getGenreNames = () => {
    if (!selectedMovie.genre_ids) return [];
    return selectedMovie.genre_ids
      .map((id) => GENRES.find((g) => g.id === id)?.name)
      .filter(Boolean);
  };

  const backdropUrl = selectedMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`
    : null;

  const posterUrl = selectedMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  const trailerSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${selectedMovie.title} official trailer`
  )}`;

  return (
    <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setSelectedMovie(null)}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {backdropUrl && (
          <div
            className="modal-hero-bg"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          >
            <div className="modal-hero-gradient" />
          </div>
        )}

        <div className="modal-body">
          <div className="modal-poster-wrapper">
            <img
              src={posterUrl}
              alt={selectedMovie.title}
              className="modal-poster-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/500x750/1a202c/ffffff?text=Movie";
              }}
            />
          </div>

          <div className="modal-details">
            <h2 className="modal-title">{selectedMovie.title}</h2>

            <div className="modal-meta-row">
              {selectedMovie.vote_average ? (
                <span className="modal-meta-item rating-badge">
                  <Star size={16} className="star-icon" fill="#f59e0b" color="#f59e0b" />
                  <strong>{Number(selectedMovie.vote_average).toFixed(1)}</strong>
                  <span className="vote-sub">/ 10</span>
                </span>
              ) : null}

              {selectedMovie.release_date && (
                <span className="modal-meta-item">
                  <Calendar size={15} />
                  <span>{selectedMovie.release_date.split("-")[0]}</span>
                </span>
              )}

              {selectedMovie.vote_count ? (
                <span className="modal-meta-item">
                  <Users size={15} />
                  <span>{selectedMovie.vote_count.toLocaleString()} votes</span>
                </span>
              ) : null}
            </div>

            {getGenreNames().length > 0 && (
              <div className="modal-genres">
                {getGenreNames().map((name) => (
                  <span key={name} className="modal-genre-tag">
                    {name}
                  </span>
                ))}
              </div>
            )}

            <div className="modal-overview">
              <h3>Synopsis</h3>
              <p>
                {selectedMovie.overview ||
                  "No detailed synopsis is currently available for this title."}
              </p>
            </div>

            <div className="modal-actions">
              <button
                className={`modal-fav-btn ${favorite ? "is-fav" : ""}`}
                onClick={handleFavoriteClick}
              >
                <Heart size={18} fill={favorite ? "#e50914" : "none"} color={favorite ? "#e50914" : "currentColor"} />
                <span>{favorite ? "Favorited" : "Add to Favorites"}</span>
              </button>

              <a
                href={trailerSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-trailer-btn"
              >
                <Play size={18} fill="currentColor" />
                <span>Watch Trailer</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
