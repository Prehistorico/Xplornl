import CategCard from "./CategCard";
import "../../styles/home/categ.css";

export default function CategExplor() {
  const categories = [
    { name: "Cafeterías", image: "/images/cafe.jpg", desc: "Descubre las mejores cafeterías locales." },
    { name: "Restaurantes", image: "/images/restaurante.jpg", desc: "Explora la gastronomía de Monterrey." },
    { name: "Parques", image: "/images/parque.jpg", desc: "Encuentra espacios verdes para relajarte." },
    { name: "Plazas", image: "/images/plaza.jpg", desc: "Visita las plazas más concurridas." },
    { name: "Museos", image: "/images/museo.jpg", desc: "Conoce la historia y cultura de la ciudad." },
  ];

  return (
    <section className="categ-section">
      <h2>Explora los lugares que tenemos para ti...</h2>
      <div className="categ-list">
        {categories.map((c, i) => (
          <CategCard key={i} category={c} />
        ))}
      </div>
    </section>
  );
}
