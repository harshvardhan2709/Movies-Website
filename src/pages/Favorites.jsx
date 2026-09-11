import { useState } from "react";
import { Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Heart, Trash2, Search, Compass } from "lucide-react";
import "../css/Favorites.css";

function Favorites() {
  const { favorites, clearAllFavorites } = useMovieContext();
  const [filterQuery, setFilterQuery] = useState("");

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty-container">
        <div className="empty-heart-badge">
          <Heart size={44} className="empty-heart-icon" />
        </div>
        <h2>No Favorite Movies Yet</h2>
        <p>
          Explore thousands of blockbusters and hidden gems. Click the heart icon on any movie poster to curate your personal collection.
        </p>
        <Link to="/" className="explore-movies-btn">
          <Compass size={18} />
          <span>Explore Movies</span>
        </Link>
      </div>
    );
  }

  const filteredFavorites = favorites.filter((movie) =>
    movie.title.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all movies from your favorites?")) {
      clearAllFavorites();
    }
  };

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <div className="favorites-title-wrap">
          <h2>Your Curated Collection</h2>
          <span className="fav-count-pill">{favorites.length} {favorites.length === 1 ? "Movie" : "Movies"}</span>
        </div>

        <div className="fav-actions-bar">
          {favorites.length > 2 && (
            <div className="fav-filter-box">
              <Search size={16} className="fav-search-icon" />
              <input
                type="text"
                placeholder="Filter your favorites..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="fav-filter-input"
              />
            </div>
          )}

          <button
            type="button"
            className="clear-favorites-btn"
            onClick={handleClearAll}
            title="Remove all favorite movies"
          >
            <Trash2 size={16} />
            <span>Clear All</span>
          </button>
        </div>
      </div>

      {filteredFavorites.length > 0 ? (
        <div className="movies-grid">
          {filteredFavorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="no-filter-match">
          <p>No favorites match "{filterQuery}"</p>
          <button onClick={() => setFilterQuery("")} className="clear-filter-btn">
            Show all {favorites.length} favorites
          </button>
        </div>
      )}
    </div>
  );
}

export default Favorites;