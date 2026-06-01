import { useState } from "react";
import "./StatusDropdown";

export default function StatusDropdown({ status, onApprove, onReject }) {
  const [open, setOpen] = useState(false);

  const isApproved = status === "approved";

  return (
    <div className="status-dropdown-wrapper">
      <span className="status-label">Estado de publicación</span>
      <div className="status-dropdown">
        <button
          className={`status-btn ${isApproved ? "status-approved" : "status-rejected"}`}
          onClick={() => setOpen(!open)}
        >
          {isApproved ? "Aprobado" : "Desaprobado"}
          <span className="status-chevron">▾</span>
        </button>

        {open && (
          <div className="status-options">
            <button
              className="status-option status-option-approve"
              onClick={() => { onApprove(); setOpen(false); }}
            >
              Aprobado
            </button>
            <button
              className="status-option status-option-reject"
              onClick={() => { onReject(); setOpen(false); }}
            >
              Desaprobado
            </button>
          </div>
        )}
      </div>
    </div>
  );
}