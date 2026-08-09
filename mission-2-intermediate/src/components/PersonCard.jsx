import StarRating from "./StarRating";
import "./PersonCard.css";

function PersonCard({ avatar, name, subtitle, text, rating }) {
  return (
    <div className="person-card">
      <div className="person-card-header">
        <img src={avatar} alt={name} className="person-card-avatar" />
        <div>
          <p className="person-card-name">{name}</p>
          <p className="person-card-subtitle">{subtitle}</p>
        </div>
      </div>
      <p className="person-card-text">{text}</p>
      {rating !== undefined && <StarRating rating={rating} size="sm" />}
    </div>
  );
}

export default PersonCard;
