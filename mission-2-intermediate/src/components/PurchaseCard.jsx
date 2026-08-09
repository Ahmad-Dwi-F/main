import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CourseIncludes from "./CourseIncludes";
import "./PurchaseCard.css";

function PurchaseCard({
  id,
  title,
  price,
  originalPrice,
  offerText,
  includes,
  language,
}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const formattedPrice = new Intl.NumberFormat("id-ID").format(price);
  const formattedOriginal = originalPrice
    ? new Intl.NumberFormat("id-ID").format(originalPrice)
    : null;

  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(100 - (price / originalPrice) * 100)
      : null;

  const handleBuyClick = () => {
    if (isLoggedIn) {
      navigate(`/metode-bayar/${id}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="purchase-card">
      <h3 className="purchase-card-title">{title}</h3>

      <div className="purchase-card-price-row">
        <span className="purchase-card-price">Rp{formattedPrice}</span>
        {formattedOriginal && (
          <span className="purchase-card-original-price">
            Rp{formattedOriginal}
          </span>
        )}
        {discountPercent && (
          <span className="purchase-card-discount-badge">
            Diskon {discountPercent}%
          </span>
        )}
      </div>

      {offerText && <p className="purchase-card-offer">{offerText}</p>}

      <button
        type="button"
        className="purchase-btn-buy"
        onClick={handleBuyClick}>
        Beli Sekarang
      </button>
      <button type="button" className="purchase-btn-share">
        Bagikan Kelas
      </button>

      <CourseIncludes includes={includes} language={language} />
    </div>
  );
}

export default PurchaseCard;
