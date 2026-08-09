import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./CourseCard.css";

function CourseCard({
  id,
  image,
  title,
  desc,
  instructor,
  rating,
  reviewCount,
  price,
  originalPrice,
  isFavorite,
  onAddFavorite,
}) {
  const { isLoggedIn } = useAuth();
  const formattedPrice = new Intl.NumberFormat("id-ID").format(price);
  const formattedOriginal = originalPrice
    ? new Intl.NumberFormat("id-ID").format(originalPrice)
    : null;

  const showDiscount = isLoggedIn && originalPrice && originalPrice > price;

  const handleFavoriteClick = (e) => {
    // biar klik tombol nggak ikut nge-trigger navigasi Link ke halaman detail
    e.preventDefault();
    e.stopPropagation();
    if (!isFavorite) {
      onAddFavorite?.({ id, image, title, price });
    }
  };

  return (
    <Link to={`/produk/${id}`} className="course-card">
      <div className="course-card-image-wrapper">
        <img src={image} alt={title} className="course-card-image" />
        <button
          type="button"
          className={`course-card-favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteClick}
          disabled={isFavorite}
          aria-label={
            isFavorite
              ? "Sudah ada di Kelas Favorit"
              : "Tambah ke Kelas Favorit"
          }>
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="course-card-content">
        <h3 className="course-card-title">{title}</h3>
        <p className="course-card-desc">{desc}</p>

        <div className="course-card-instructor">
          <img
            src={instructor.avatar}
            alt={instructor.name}
            className="course-card-avatar"
          />
          <div>
            <p className="course-card-instructor-name">{instructor.name}</p>
            <p className="course-card-instructor-role">{instructor.role}</p>
          </div>
        </div>

        <div className="course-card-rating">
          <span className="course-card-star">★</span>
          <span className="course-card-rating-value">{rating}</span>
          <span className="course-card-review-count">({reviewCount})</span>
        </div>

        {showDiscount ? (
          <div className="course-card-price-row">
            <span className="course-card-original-price">
              Rp{formattedOriginal}
            </span>
            <span className="course-card-price">Rp{formattedPrice}</span>
          </div>
        ) : (
          <p className="course-card-price">Rp{formattedPrice}</p>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
