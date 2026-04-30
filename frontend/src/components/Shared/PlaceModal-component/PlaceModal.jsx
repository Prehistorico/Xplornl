import React from "react";
import "./placeModal.css";

const PlaceModal = ({ place, onClose }) => {
  if (!place) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-content">

          <div className="modal-left">
            <h1 className="place-title">{place.name}</h1>
            <p className="place-category">{place.category}</p>

            <img src={place.image} alt={place.name} className="modal-main-image"/>

            <div className="place-info">
              <p><strong>Horario:</strong> {place.hours}</p>
              <p><strong>Dirección:</strong> {place.address}</p>
              <p><strong>Teléfono:</strong> {place.phone}</p>
              <p><strong>Web:</strong> {place.website}</p>
            </div>
          </div>

          <div className="modal-right">
            <h3>Otros similares</h3>

            <div className="similar-places">
              {place.similar?.map((img, index) => (
                <img key={index} src={img} className="similar-img" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlaceModal;