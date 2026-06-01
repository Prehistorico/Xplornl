import { useState } from "react";
import { approveReview, rejectReview } from "../../../services/reviewService";
import StatusDropdown from "../../Shared/Status-component/StatusDropdown";


export default function Review({ review, active, currentUserId, isAdmin, onEdit, onDelete }) {
  const [openMenu, setOpenMenu] = useState(false);
  const canManage = isAdmin || review.user?._id === currentUserId;
  const [status, setStatus] = useState(review.status || 'approved');

  return (
    <div className={`review-card ${active ? "review-card--active" : ""}`}>
      {isAdmin && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <StatusDropdown
            status={status}
            onApprove={async () => {
              await approveReview(review._id);
              setStatus('approved');
              if (onStatusChange) onStatusChange();
            }}
            onReject={async () => {
              await rejectReview(review._id);
              setStatus('rejected');
              if (onStatusChange) onStatusChange();
            }}
          />
        </div>
      )}
      
      <div className="review-header">
        <h3>{review.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="stars">{"★".repeat(review.rating)}</div>

          {canManage && (
            <div className="review-menu">
              <button
                className="review-menu-btn"
                onClick={() => setOpenMenu(!openMenu)}
              >⋮</button>

              {openMenu && (
                <div className="review-dropdown">
                  <button onClick={() => { onEdit(review); setOpenMenu(false); }}>
                    Editar
                  </button>
                  <button onClick={() => { onDelete(review._id); setOpenMenu(false); }}>
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <p className="review-text">{review.description}</p>

      <div className="review-user">
        <div className="avatar"></div>
        <div>
          <p className="user-name">@{review.user?.username}</p>
          <span className="date">
            {new Date(review.createdAt).toLocaleDateString("es-MX", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </span>
        </div>
      </div>

    </div>
  );
}