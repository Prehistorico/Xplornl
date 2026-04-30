import { useState } from "react";
import "./commentModal.css";
import Post from "../Post/Post"; 

export default function CommentModal({ post, onClose }) {
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <div className="comment-content-area">

          <span onClick={onClose}>✕</span>
          <Post post={post} />

        <div className="comment-header">
          <h3>{post.comments.length} Comentarios</h3>
        </div>

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
                  <p className="likes">L {c.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}