import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Toast from "./components/Toast";
import MovieModal from "./components/MovieModal";
import ApiKeyModal from "./components/ApiKeyModal";

function App() {
  return (
    <MovieProvider>
      <div className="app-layout">
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>
            HMovies &copy; {new Date().getFullYear()} &bull; Built with React &amp; Vite. Powered by The Movie Database (TMDB).
          </p>
        </footer>
        <MovieModal />
        <ApiKeyModal />
        <Toast />
      </div>
    </MovieProvider>
  );
}

export default App;