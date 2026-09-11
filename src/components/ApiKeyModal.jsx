import { useState } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { X, Key, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import "../css/ApiKeyModal.css";

function ApiKeyModal() {
  const { apiKey, updateApiKey, isApiKeyModalOpen, setIsApiKeyModalOpen } = useMovieContext();
  const [inputVal, setInputVal] = useState(apiKey || "");

  if (!isApiKeyModalOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateApiKey(inputVal.trim());
    setIsApiKeyModalOpen(false);
  };

  const handleUseDemo = () => {
    setInputVal("");
    updateApiKey("");
    setIsApiKeyModalOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsApiKeyModalOpen(false)}>
      <div className="api-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setIsApiKeyModalOpen(false)}
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="api-modal-header">
          <div className="api-icon-badge">
            <Key size={22} />
          </div>
          <h2>TMDB API Settings</h2>
          <p>
            Connect your own The Movie Database (TMDB) API Key for live global searches, or continue using our rich offline demo catalog.
          </p>
        </div>

        <form onSubmit={handleSave} className="api-modal-form">
          <label htmlFor="tmdb-key-input">TMDB API Key (v3 auth):</label>
          <div className="api-input-wrapper">
            <input
              id="tmdb-key-input"
              type="text"
              placeholder="e.g. 3b2d1847c09e..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="api-input"
            />
          </div>

          <div className="api-help-text">
            <span>Don't have a key?</span>{" "}
            <a
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get one free from TMDB <ExternalLink size={12} />
            </a>
          </div>

          <div className="api-modal-buttons">
            <button
              type="button"
              className="api-btn-demo"
              onClick={handleUseDemo}
            >
              <Sparkles size={16} />
              <span>Use Demo Catalog</span>
            </button>
            <button type="submit" className="api-btn-save">
              <ShieldCheck size={16} />
              <span>Save Key</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApiKeyModal;
