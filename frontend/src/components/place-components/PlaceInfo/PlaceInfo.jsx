import { useEffect, useState } from "react";
import { getPlaceById } from "../../../services/placeService";
import "./place.css";

export default function PlaceInfo({ placeId }) {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!placeId) return;
    getPlaceById(placeId).then(setPlace).catch(console.error);
  }, [placeId]);

  if (!place) return <p>Cargando...</p>;

  return (
    <div className="place-container">
      <div className="place-left">
        <div className="place-header">
          <div className="place-title">
            <h1>{place.name}</h1>
            <p className="place-category">{place.category?.name}</p>
          </div>
          {/* <div className="place-rating">★ {place.rating?.average ?? 0}</div> */}
        </div>

        <p className="place-desc">{place.description}</p>

        <h2 className="deats-title">Detalles del lugar</h2>
        <div className="deats-list">

          {place.details?.spaceType && (
            <div className="deats-item">
              <div className="icon">🏕️</div>
              <div>
                <span className="deats-name">Tipo de espacio</span>
                <p>{place.details.spaceType}</p>
              </div>
            </div>
          )}

          {place.details?.cost && (
            <div className="deats-item">
              <div className="icon">💰</div>
              <div>
                <span className="deats-name">Costos</span>
                <p>{place.details.cost}</p>
              </div>
            </div>
          )}

          {place.details?.parking && (
            <div className="deats-item">
              <div className="icon">🅿️</div>
              <div>
                <span className="deats-name">Estacionamiento</span>
                <p>{place.details.parking}</p>
              </div>
            </div>
          )}

          {place.details?.shops && (
            <div className="deats-item">
              <div className="icon">🛍️</div>
              <div>
                <span className="deats-name">Tiendas</span>
                <p>{place.details.shops}</p>
              </div>
            </div>
          )}

          {place.details?.restrooms && (
            <div className="deats-item">
              <div className="icon">🚻</div>
              <div>
                <span className="deats-name">Baños</span>
                <p>{place.details.restrooms}</p>
              </div>
            </div>
          )}

          {place.details?.activities?.length > 0 && (
            <div className="deats-item">
              <div className="icon">🎯</div>
              <div>
                <span className="deats-name">Actividades</span>
                <p>{place.details.activities.join(", ")}</p>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="place-right">

        <div className="info-card">
          <span className="card-title">Zona</span>
          <p>{place.zone || "No disponible"}</p>
        </div>

        <div className="info-card">
          <span className="card-title">Horario</span>
          {place.schedule?.days?.length > 0 ? (
            <p>{place.schedule.days.join(", ")} · {place.schedule.open} - {place.schedule.close}</p>
          ) : (
            <p>No disponible</p>
          )}
        </div>

        <div className="info-card">
          <span className="card-title">Dirección</span>
          <p>{place.location?.address || "No disponible"}</p>
        </div>

        {place.contact?.phone && (
          <div className="info-card">
            <span className="card-title">Teléfono</span>
            <p>{place.contact.phone}</p>
          </div>
        )}

        {place.contact?.website && (
          <div className="info-card">
            <span className="card-title">Sitio web</span>
            <a href={place.contact.website} target="_blank" rel="noreferrer">
              {place.contact.website}
            </a>
          </div>
        )}

        {place.transport?.publicTransport && (
           <div className="info-card">
           <span className="card-title">Transporte público</span>
            <p>{place.transport.publicTransport}</p>
          </div>
        )}

        {place.transport?.car && (
          <div className="info-card">
          <span className="card-title">En auto</span>
          <p>{place.transport.car}</p>
          </div>
         )}

      </div>
    </div>
  );
}