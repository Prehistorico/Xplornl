// CommentModal.jsx
import { useState } from "react";
import "../styles/commentModal.css";
import Post from "./Post"; // reutilizamos tu componente Post

export default function CommentModal({ post, onClose }) {
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        {/* Contenido con scroll: post + lista de comentarios */}
        <div className="comment-content-area">
          {/* Post completo */}
          <span onClick={onClose}>✕</span>
          <Post post={post} />

          {/* Header fijo */}
        <div className="modal-header">
          <h3>{post.comments.length} Comentarios</h3>
        </div>

        {/* Caja de input fija abajo */}
        <div className="comment-input-box">
          <img src="/profile.jpg" alt="" className="avatar"/>
          <div className="input-area">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              value={comment}
              onFocus={() => setExpanded(true)}
              onChange={(e) => setComment(e.target.value)}
            />
            {expanded && (
              <div className="comment-actions">
                <button className="media-btn">Agregar foto/video</button>
                <div className="right-actions">
                  <button onClick={() => {
                    setExpanded(false);
                    setComment("");
                  }}>Cancelar</button>
                  <button className="send-btn" disabled={!comment.trim()}>
                    Enviar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

          {/* Lista de comentarios */}
          <div className="comment-list">
            {post.comments.map(c => (
              <div key={c.id} className="comment-item">
                <img src="/profile.jpg" alt="" className="avatar"/>
                <div className="comment-content">
                  <p className="comment-user">
                    {c.user} <span>{c.time}</span>
                  </p>
                  <p>{c.text}</p>
                  {c.image && (
                    <img src={c.image} className="comment-image" alt="comment"/>
                  )}
                  <p className="likes">👍 {c.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}