import Review from "./Review";
import "../../styles/place/reviews.css"

export default function PlaceReviews() {

  const reviews = [
    {
      id: 1,
      title: "Excelente",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      user: "Usuario 1",
      date: "3 abril 2026"
    },
    {
      id: 2,
      title: "Mid",
      rating: 3,
      text: "Lorem ipsum dolor sit amet...",
      user: "Usuario 2",
      date: "3 abril 2026"
    },
    {
      id: 3,
      title: "Excelente",
      rating: 5,
      text: "Lorem ipsum dolor sit amet...",
      user: "Usuario 3",
      date: "3 abril 2026"
    }
  ];

  return (
    <div className="reviews-section">

      <div className="reviews-summary">
        <h2>Reseñas</h2>

        <div className="rating-number">
          <span className="score">8.6</span>
          <span className="total">/10</span>
        </div>

        <p className="rating-label">Excelente</p>

        <button className="see-more">Ver más</button>
      </div>

      <div className="reviews-container">

        <button className="arrow left">izq</button>

        <div className="reviews-list">
          {reviews.map(r => (
            <Review key={r.id} review={r} />
          ))}
        </div>

        <button className="arrow right">der</button>

      </div>


      <div className="reviews-cta">
        <p>Compártenos tu experiencia del lugar</p>
        <button className="add-review">Añadir reseña</button>
      </div>

    </div>
  );
}