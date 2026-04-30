import { useState, useRef } from "react";
import CategCard from "../CategCard";
import "./categ.css";
import mountain from "../../../assets/images/mountain.png";
import mountain2 from "../../../assets/images/mountain2.png";
import watchtower from "../../../assets/images/watchtower.png";

export default function CategExplor() {
  const categories = [
    { name: "Cafeterías", image: mountain, desc: "Descubre las mejores cafeterías locales de Monterrey." },
    { name: "Restaurantes", image: mountain2, desc: "Explora la gastronomía y los sabores únicos de la ciudad." },
    { name: "Parques", image: watchtower, desc: "Encuentra espacios verdes para relajarte y disfrutar al aire libre." },
    { name: "Plazas", image: mountain, desc: "Visita las plazas más concurridas y emblemáticas." },
    { name: "Museos", image: mountain2, desc: "Conoce la historia y la cultura de Monterrey." },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const scroll = (dir) => {
    const next = activeIndex + dir;
    if (next < 0 || next >= categories.length) return;
    setActiveIndex(next);
    const card = trackRef.current?.children[next];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="categ-section">
      <h2 className="categ-heading">Explora los lugares que tenemos para ti...</h2>

      <div className="categ-carousel-wrapper">
        <button
          className="categ-arrow"
          onClick={() => scroll(-1)}
          disabled={activeIndex === 0}
        >
          ‹
        </button>

        <div className="categ-list" ref={trackRef}>
          {categories.map((c, i) => (
            <CategCard key={i} category={c} active={i === activeIndex} />
          ))}
        </div>

        <button
          className="categ-arrow"
          onClick={() => scroll(1)}
          disabled={activeIndex === categories.length - 1}
        >
          ›
        </button>
      </div>
    </section>
  );
}
