import { NavLink, Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import { Film, Heart, Compass, Key } from "lucide-react";
import "../css/Navbar.css";

function NavBar() {
  const { favorites, liveMode, setIsApiKeyModalOpen } = useMovieContext();

  return (
    <header className="navbar-header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="brand-logo">
            <div className="logo-icon-wrap">
              <Film size={22} className="logo-icon" />
            </div>
            <span className="brand-name">
              H<span className="brand-accent">Movies</span>
            </span>
          </Link>
        </div>

        <div className="navbar-links">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            end
          >
            <Compass size={18} />
            <span>Discover</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Heart size={18} />
            <span>Favorites</span>
            {favorites.length > 0 && (
              <span className="fav-count-badge">{favorites.length}</span>
            )}
          </NavLink>

          <button
            type="button"
            className={`api-mode-pill ${liveMode ? "live" : "demo"}`}
            onClick={() => setIsApiKeyModalOpen(true)}
            title="Configure TMDB API Key"
          >
            <span className="status-indicator" />
            <Key size={14} />
            <span className="mode-text">{liveMode ? "Live API" : "Demo Mode"}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;