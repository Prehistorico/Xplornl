import "./emailWarning.css";

export default function ConfirmEmail({
  onContinue,
  onResendEmail
}) {
  return (
    <div className="email-modal-overlay">
      <div className="email-modal">

        <div className="email-header">
          <div className="email-icon">
            i
          </div>

          <h2>
            Cuenta registrada, porfavor verifique su correo para poder activar la cuenta.
          </h2>
        </div>

        <p className="email-message">
          Revise la bandeja de entrada o spam del correo electrónico con el que se registró.
        </p>

        <div className="email-buttons">
          <button
            className="btn-primary"
            onClick={onContinue}
          >
            Continuar
          </button>
        </div>

      </div>
    </div>
  );
}