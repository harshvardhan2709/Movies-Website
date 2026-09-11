import "../css/SkeletonCard.css";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-poster shimmer" />
      <div className="skeleton-info">
        <div className="skeleton-line title shimmer" />
        <div className="skeleton-line meta shimmer" />
      </div>
    </div>
  );
}

export default SkeletonCard;
