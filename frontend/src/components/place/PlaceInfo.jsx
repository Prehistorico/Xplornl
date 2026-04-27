import { useState } from "react";
import "../../styles/place/place.css"

export default function PlaceInfo() {
  return (
    <div className="place-container">


      <div className="place-left">

        <div className="place-header">
          <div className="place-title">
            <h1>Chipinque</h1>
            <p className="place-category">Parque ecológico</p>
          </div>

          <div className="place-rating">
            ★ 5
          </div>
        </div>

        <p className="place-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2 className="deats-title">Detalles del lugar</h2>

        <div className="deats-list">

          <div className="deats-item">
            <div className="icon">
              <image>d</image>
            </div>
            <div>
              <span className="deats-name">Espacio familiar</span>
              <p>Este espacio es recomendable para ir en familia.</p>
            </div>
          </div>

          <div className="deats-item">
            <div className="icon">
              <image>d</image>
            </div>
            <div>
              <span className="deats-name">Costos</span>
              <p>Se cobran $60 pesos de entrada.</p>
            </div>
          </div>

          <div className="deats-item">
            <div className="icon">
              <image>d</image>
            </div>
            <div>
              <span className="deats-name">Estacionamiento</span>
              <p>El lugar tiene estacionamiento con costo.</p>
            </div>
          </div>

        </div>

      </div>


      <div className="place-right">

        <div className="info-card">
          <span className="card-title">Zona</span>
          <p>Monterrey Sur</p>
        </div>

        <div className="info-card">
          <span className="card-title">Horario</span>
          <p className="open">Abierto</p>
        </div>

        <div className="info-card">
          <span className="card-title">Dirección</span>
          <p>
            Calle Cerro de la Silla, Nuevo León
          </p>
        </div>

      </div>

    </div>
  );
}