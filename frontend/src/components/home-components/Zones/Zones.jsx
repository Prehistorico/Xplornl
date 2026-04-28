import { useState } from "react";
import "./zones.css";

export default function Zones() {
  const zones = [
    { id: "01", name: "Sur", img: "yunho.pn", title: "Monterrey Sur", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: "02", name: "Huajuco", img: "yunho.png", title: "Monterrey Huajuco", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    { id: "03", name: "Poniente", img: "yunho.png", title: "Monterrey Poniente", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  ];

  const [activeZoneId, setActiveZoneId] = useState("01");
  const activeZone = zones.find((z) => z.id === activeZoneId);

  return (
    <section className="zones">
      <h2 className="zones-title">Zonas de Monterrey</h2>

      <div className="zones-index">
        {zones.map((z) => (
          <button
            key={z.id}
            className={`zone-btn ${activeZoneId === z.id ? "active" : ""}`}
            onClick={() => setActiveZoneId(z.id)}
          >
            <span className="zone-number">{z.id}</span>
            <span className="zone-name">{z.name}</span>
          </button>
        ))}
      </div>

      <div className="zones-content">
        <div className="zones-image">
          <img src={activeZone.img} alt={`Zona ${activeZone.name}`} />
        </div>
        <div className="zones-info">
          <h3>{activeZone.title}</h3>
          <p>{activeZone.desc}</p>
          <div className="zones-map-wrapper">
            <img src="yunho.png" alt="Mapa de la zona" className="zones-map" />
          </div>
        </div>
      </div>
    </section>
  );
}
