import { useEffect, useState } from "react";
import {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment
} from "../../../services/commentService";

import "./commentModal.css";
import Post from "../Post/Post";
import { approveComment, rejectComment } from "../../../services/commentService";
import StatusDropdown from "../../Shared/Status-component/StatusDropdown";
import UserAvatar from "../../Shared/EditProfileModal/UserAvatar";

export default function CommentModal({ post, onClose }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  const [openMenu, setOpenMenu] = useState(null);

  const currentUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const currentUserId =
    currentUser.id || currentUser._id;

  const isAdmin =
    currentUser.role === "admin";

  const loadComments = async () => {
    try {
      const data = await getCommentsByPost(post._id);
      setComments(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (post?._id) {
      loadComments();
    }
  }, [post]);

  const handleCreateComment = async () => {
    if (!comment.trim()) return;
    console.log("post object:", post);      
    console.log("post._id:", post?._id); 

    try {
      await createComment({
        post: post._id,
        description: comment
      });

      setComment("");
      setExpanded(false);

      await loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editText.trim()) return;

    try {
      await updateComment(commentId, editText);

      setEditingComment(null);
      setEditText("");

      await loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmed = window.confirm(
      "¿Eliminar comentario?"
    );

    if (!confirmed) return;

    try {
      await deleteComment(commentId);

      await loadComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="comment-modal">

        <div className="comment-content-area">

          <span
            className="close-btn"
            onClick={onClose}
          >✕
          </span>

          <Post post={post} />

          <div className="comment-header">
            <h3>
              {comments.length} Comentarios
            </h3>
          </div>

          <div className="comment-input-box">

          <UserAvatar user={currentUser} size={35} />


            <div className="input-area">

              <input
                type="text"
                placeholder="Escribe un comentario..."
                value={comment}
                onFocus={() => setExpanded(true)}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              {expanded && (
                <div className="comment-actions">

                  <button
                    onClick={() => {
                      setExpanded(false);
                      setComment("");
                    }}
                  >
                    Cancelar
                  </button>

                  <button
                    className="send-btn"
                    disabled={!comment.trim()}
                    onClick={handleCreateComment}
                  >
                    Enviar
                  </button>

                </div>
              )}

            </div>
          </div>

          <div className="comment-list">

            {comments.map((c) => {

              const canManage = isAdmin || c.user?._id === currentUserId;

              return (
                <div key={c._id} className="comment-item">

                  <UserAvatar user={c.user} size={35} />

                  <div className="comment-content">

                    <div className="comment-header-row">

                      <p className="comment-user">
                        @{c.user?.username}
                      </p>
                      {isAdmin && (
                        <StatusDropdown
                          status={c.status}
                          onApprove={async () => {
                            await approveComment(c._id);
                            await loadComments();
                          }}
                          onReject={async () => {
                            await rejectComment(c._id);
                            await loadComments();
                          }}
                        />
                      )}
                      {canManage && (
                        <div className="comment-menu">

                          <button
                            className="comment-menu-btn"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === c._id
                                  ? null
                                  : c._id
                              )
                            }
                          >
                            ⋮
                          </button>

                          {openMenu === c._id && (
                            <div className="comment-dropdown">

                              <button
                                onClick={() => {
                                  setEditingComment(c);
                                  setEditText(c.description);
                                  setOpenMenu(null);
                                }}
                              >Editar
                              </button>

                              <button onClick={() => handleDeleteComment(c._id)}>¿Eliminar?</button>

                            </div>
                          )}

                        </div>
                      )}

                    </div>

                    {editingComment?._id === c._id ? (
                      <div className="edit-comment">

                        <textarea value={editText} onChange={(e) => setEditText(e.target.value)}/>

                        <div className="edit-actions">

                          <button onClick={() => setEditingComment(null) }>
                            Cancelar
                          </button>

                          <button onClick={() => handleUpdateComment(c._id)}>
                            Guardar
                          </button>

                        </div>

                      </div>
                    ) : (
                      <p>{c.description}</p>
                    )}

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </div>
  );
}