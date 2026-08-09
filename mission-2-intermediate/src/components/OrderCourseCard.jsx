import CourseIncludes from "./CourseIncludes";
import "./OrderCourseCard.css";

function OrderCourseCard({
  image,
  title,
  price,
  originalPrice,
  includes,
  language,
}) {
  const formattedPrice = new Intl.NumberFormat("id-ID").format(price);
  const formattedOriginal = originalPrice
    ? new Intl.NumberFormat("id-ID").format(originalPrice)
    : null;
  const discountPercent =
    originalPrice && originalPrice > price
      ? Math.round(100 - (price / originalPrice) * 100)
      : null;

  return (
    <div className="order-course-card">
      <img src={image} alt={title} className="order-course-image" />
      <h3 className="order-course-title">{title}</h3>

      <div className="order-course-price-row">
        <span className="order-course-price">Rp{formattedPrice}</span>
        {formattedOriginal && (
          <span className="order-course-original-price">
            Rp{formattedOriginal}
          </span>
        )}
        {discountPercent && (
          <span className="order-course-discount-badge">
            Diskon {discountPercent}%
          </span>
        )}
      </div>

      <CourseIncludes includes={includes} language={language} />
    </div>
  );
}

export default OrderCourseCard;
