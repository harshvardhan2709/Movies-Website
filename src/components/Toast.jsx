import { useEffect } from "react";
import { useMovieContext } from "../contexts/MovieContext";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import "../css/Toast.css";

function Toast() {
  const { toast, hideToast } = useMovieContext();

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      hideToast();
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast, hideToast]);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle size={18} className="toast-icon success" />;
      case "error":
        return <AlertCircle size={18} className="toast-icon error" />;
      default:
        return <Info size={18} className="toast-icon info" />;
    }
  };

  return (
    <div className={`toast-container toast-${toast.type || "info"}`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={hideToast} aria-label="Close notification">
        <X size={15} />
      </button>
    </div>
  );
}

export default Toast;
