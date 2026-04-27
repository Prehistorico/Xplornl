import Card from "../Card";
import "../../styles/place/recs.css";

export default function PlaceRecs() {
  const recs = [
    {
      id: 1,
      name: "Chipinque",
      zone: "Monterrey Sur",
      rating: 5,
      desc: "Área Natural",
      image: "/images/chipinque.jpg"
    },
    {
      id: 2,
      name: "Parque Fundidora",
      zone: "Monterrey Centro",
      rating: 4,
      desc: "Espacio cultural y recreativo",
      image: "/images/fundidora.jpg"
    },
    {
      id: 3,
      name: "La Huasteca",
      zone: "Santa Catarina",
      rating: 5,
      desc: "Montañas y rutas de escalada",
      image: "/images/huasteca.jpg"
    }
  ];

  return (
    <div className="recs-section">
      <h2>Quizá te pueda gustar...</h2>
      <div className="recs-list">
        {recs.map(r => (
          <Card key={r.id} place={r} />
        ))}
      </div>
    </div>
  );
}
