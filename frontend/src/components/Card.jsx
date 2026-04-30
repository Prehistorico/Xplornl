export default function Card({ place }) {
  return (
    <div className="rec-card">
      <div className="rec-image">
        {/* Aquí puedes poner una <img src={place.image} alt={place.name}/> */}
      </div>

      <div className="rec-content">
        <img src="yunho.png"/>
        <h3 className="rec-title">{place.name}</h3>
        <p className="rec-zone">{place.zone}</p>
        <div className="rec-rating">★ {place.rating}</div>
        <p className="rec-desc">{place.desc}</p>
        <button className="rec-btn">Saber más</button>
      </div>
    </div>
  );
}
