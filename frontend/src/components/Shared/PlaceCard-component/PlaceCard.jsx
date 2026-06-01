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
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export default function PlaceCard({ place }) {
  const navigate = useNavigate();

  return (
    <div className="place-card">
      <div className="place-card-img-wrap">
        <img
          src={`http://localhost:5000${place.images?.[0]}`}
          alt={place.name}
          className="place-card-img"
        />
       {/*  <span className="place-card-badge">
          <StarIcon /> {place.rating?.average || 0}
        </span> */}
      </div>
      <div className="place-card-body">
        <div className="place-card-top">
          <span className="place-card-name">{place.name}</span>
          <span className="place-card-zone">{place.zone}</span>
        </div>
        <span className="place-card-type">{place.category?.name}</span>
        <p className="place-card-desc">{truncateText(place.description, 90)}</p>
        <button
          className="place-card-btn"
          onClick={() => navigate(`/place/${place._id}`)}
        >
          Saber más
        </button>
      </div>
    </div>
  );
}