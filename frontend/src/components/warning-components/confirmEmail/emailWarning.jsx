import "./emailWarning.css";

export default function EmailWarning({
  onContinue
}) {
  return (
    <div className="email-modal-overlay">
      <div className="email-modal">

        <div className="email-header">
          <div className="email-icon">
            i
          </div>

          <h2>
            Debes verificar tu correo antes de iniciar sesión.
          </h2>
        </div>

        <p className="email-message">
          Revisa la bandeja de entrada o de spam del correo electrónico con el que te registraste.
        </p>

        <div className="email-buttons">
          <button
            className="btn-primary"
            onClick={onContinue}
          >
            Okey
          </button>
        </div>

      </div>
    </div>
  );
}