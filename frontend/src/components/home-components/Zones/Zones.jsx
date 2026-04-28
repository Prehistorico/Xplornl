import { useState } from "react";
import "./zones.css";
import mountain from "../../../assets/images/mountain.png";
import mountain2 from "../../../assets/images/mountain2.png";
import mtysur from "../../../assets/images/MTYSUR.jpeg";
import watchtower from "../../../assets/images/watchtower.png";

const zones = [
  {
    id: "01",
    name: "Sur",
    title: "Monterrey Sur",
    img: mtysur,
    mapImg: mountain2,
    desc: "La zona Sur de Monterrey es reconocida por su imponente paisaje montañoso y sus áreas naturales protegidas. Aquí encontrarás parques ecológicos, miradores y rutas de senderismo que te conectarán con la naturaleza.",
    sub: "Explora cascadas, cañones y la majestuosa Sierra Madre Oriental.",
  },
  {
    id: "02",
    name: "Huajuco",
    title: "Monterrey Huajuco",
    img: mountain,
    mapImg: mountain2,
    desc: "El cañón del Huajuco es uno de los corredores naturales más bellos del área metropolitana. Con ríos, cascadas y rutas de aventura, es el destino perfecto para los amantes del ecoturismo y la vida al aire libre.",
    sub: "Descubre senderos, pozas naturales y áreas de acampado.",
  },
  {
    id: "03",
    name: "Poniente",
    title: "Monterrey Poniente",
    img: watchtower,
    mapImg: mountain2,
    desc: "La zona Poniente combina modernidad y naturaleza. Desde el Parque Fundidora hasta los cerros del poniente, esta zona ofrece una mezcla perfecta de cultura, gastronomía y espacios verdes para toda la familia.",
    sub: "Arte, gastronomía y entretenimiento en un mismo lugar.",
  },
];

export default function Zones() {
  const [activeId, setActiveId] = useState("01");
  const active = zones.find((z) => z.id === activeId);

  return (
    <section className="zones">
      <h2 className="zones-title">Zonas de Monterrey</h2>

      <div className="zones-tabs">
        {zones.map((z) => (
          <button
            key={z.id}
            className={`zone-tab ${activeId === z.id ? "zone-tab--active" : ""}`}
            onClick={() => setActiveId(z.id)}
          >
            <span className="zone-num">{z.id}</span>
            <span className="zone-label">{z.name}</span>
          </button>
        ))}
      </div>

      <div className="zones-body">
        <div className="zones-stack">
          <div className="stack-card stack-card--back2" />
          <div className="stack-card stack-card--back1" />
          <div className="stack-card stack-card--front">
            <img src={active.img} alt={active.title} className="stack-img" />
          </div>
        </div>

        <div className="zones-panel">
          <h3 className="zones-panel-title">{active.title}</h3>
          <p className="zones-panel-desc">{active.desc}</p>
          <p className="zones-panel-sub">{active.sub}</p>
          <div className="zones-map-box">
            <img src={active.mapImg} alt="Mapa de la zona" className="zones-map-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
