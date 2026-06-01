import { useNavigate } from "react-router-dom";

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0l1.5 4H12l-3.5 2.5 1.3 4.2L6 8.5l-3.8 2.2 1.3-4.2L0 4h4.5z" />
    </svg>
  );
}

function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) {return text;}
  return text.slice(0, maxLength) + '...';
}

export default function Card({ name, zone, type, rating, img, description, id }) {
  const navigate = useNavigate();
  return (
      <div className="place-card">
        <div className="place-card-img-wrap">
          <img src={img} alt={name} className="place-card-img" />
          {/* <span className="place-card-badge">
            <StarIcon /> {rating}
          </span> */}
        </div>
        <div className="place-card-body">
          <div className="place-card-top">
            <span className="place-card-name">{name}</span>
            <span className="place-card-zone">{zone}</span>
          </div>
          <span className="place-card-type">{type}</span>
          <p className="place-card-desc">
            {truncateText(description, 90)}
          </p>
          <button
            className="place-card-btn"
            onClick={() => navigate(`/place/${id}`)} 
          >Saber más
          </button>
        </div>
      </div>
    );
}
