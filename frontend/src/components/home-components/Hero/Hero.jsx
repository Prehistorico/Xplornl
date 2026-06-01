import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./hero.css";
import mountain from "../../../assets/images/mountain.png";
import exploreIcon from "../../../assets/icons/random.png";

import { getPlaces } from "../../../services/placeService";

export default function Hero() {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const data = await getPlaces();
        setPlaces(data);
      } catch (error) {
        console.error("Error cargando lugares:", error);
      }
    };

    loadPlaces();
  }, []);

  const handleExploreRandom = () => {
    if (!places.length) return;

    const randomIndex = Math.floor(Math.random() * places.length);
    const randomPlace = places[randomIndex];

    navigate(`/place/${randomPlace._id}`);
  };

  return (
    <section className="hero">
      <img src={mountain} alt="Lugar destacado" className="hero-img" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1>Descubre tu nuevo lugar favorito</h1>

        <button className="hero-btn" onClick={handleExploreRandom}>
          <img src={exploreIcon} alt="explorar" className="btn-icon" />
          Explorar
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}