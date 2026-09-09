import "./StarRating.css";

function StarRating({ rating, reviewCount, size = "md", className = "" }) {
  const filledStars = Math.round(rating);

  return (
    <div className={`star-rating star-rating-${size} ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star-rating-icon ${i < filledStars ? "filled" : ""}`}>
          ★
        </span>
      ))}
      <span className="star-rating-value">{rating}</span>
      {reviewCount !== undefined && (
        <span className="star-rating-count">({reviewCount})</span>
      )}
    </div>
  );
}

export default StarRating;
