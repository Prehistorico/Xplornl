import { useEffect, useState } from "react";
import { getPlaces } from "../../../services/placeService";
import PlaceCard from "../../Shared/PlaceCard-component/PlaceCard";
import "../../../styles/home/home.css";
import "./recs.css";

export default function PlaceRecs({ placeId }) {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    if (!placeId) return;
    getPlaces()
      .then(places => {
        const filtered = places
          .filter(p => p._id !== placeId)
          .slice(0, 4);
        setRecs(filtered);
      })
      .catch(console.error);
  }, [placeId]);

  return (
    <div className="recs-section">
      <h2>Quizá te pueda gustar...</h2>
      <div className="places-grid">
        {recs.map(r => <PlaceCard key={r._id} place={r} />)}
      </div>
    </div>
  );
}