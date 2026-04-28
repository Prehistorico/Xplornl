import { useState, useRef } from "react";
import CategCard from "../CategCard";
import "./categ.css";

export default function CategExplor() {
  const categories = [
    { name: "Cafeterías", image: "../../../assets/icons/comunidad.png", desc: "Descubre las mejores cafeterías locales de Monterrey." },
    { name: "Restaurantes", image: "../../../assets/icons/comunidad.png", desc: "Explora la gastronomía y sabores de Monterrey." },
    { name: "Parques", image: "../../../assets/icons/comunidad.png", desc: "Encuentra espacios verdes para relajarte y disfrutar." },
    { name: "Plazas", image: "../../../assets/icons/comunidad.png", desc: "Visita las plazas más concurridas de la ciudad." },
    { name: "Museos", image: "../../../assets/icons/comunidad.png", desc: "Conoce la historia y cultura de Monterrey." },
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
          className="categ-arrow categ-arrow--left"
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
          className="categ-arrow categ-arrow--right"
          onClick={() => scroll(1)}
          disabled={activeIndex === categories.length - 1}
        >
          ›
        </button>
      </div>
    </section>
  );
}
