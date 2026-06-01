import "../confirmEmail/emailWarning.css";

export default function AuthWarning({ onContinue }) {
  return (
    <div className="email-modal-overlay">
      <div className="email-modal">

        <div className="email-header">
          <div className="email-icon">i</div>

          <h2>Error al iniciar sesión</h2>
        </div>

        <p className="email-message">
          Verifica que tu correo o contraseña sean correctos.
        </p>

        <div className="email-buttons">
          <button className="btn-primary" onClick={onContinue}>
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
}