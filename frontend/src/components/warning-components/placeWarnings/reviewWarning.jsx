import "../confirmEmail/emailWarning.css";

export default function ReviewWarning({ onClose }) {
  return (
    <div className="email-modal-overlay">
      <div className="email-modal">

        <div className="email-header">
          <div className="email-icon">i</div>
          <h2>Ya tienes una reseña para este lugar.</h2>
        </div>

        <p className="email-message">
          Solo puedes dejar una reseña por lugar. Puedes editarla desde tu reseña existente.
        </p>

        <div className="email-buttons">
          <button className="btn-primary" onClick={onClose}>
            Okey
          </button>
        </div>

      </div>
    </div>
  );
}