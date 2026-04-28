import "./hero.css";
import bcg from "../../../assets/images/register.jpeg";

export default function Hero() {
  return (
    <section className="hero">
      <img src={bcg} alt="Lugar destacado" className="hero-img" />
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Descubre tu nuevo lugar favorito</h1>
          <button className="hero-btn">Explora ahora</button>
        </div>
      </div>
    </section>
  );
}
