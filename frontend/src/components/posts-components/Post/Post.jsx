import { useState } from "react";
import { toggleLike, approvePost, rejectPost } from "../../../services/postService";
import StatusDropdown from "../../Shared/Status-component/StatusDropdown";
import UserAvatar from "../../Shared/EditProfileModal/UserAvatar";

const IMG_BASE = 'http://localhost:5000';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);
  if (mins  < 1)  return 'Ahora';
  if (mins  < 60) return `${mins} min`;
  if (hours < 24) return `${hours}h`;
  if (days  < 7)  return `${days} día${days > 1 ? 's' : ''}`;
  return `${weeks} semana${weeks > 1 ? 's' : ''}`;
}

const Post = ({ post, onOpenComments, onLikeToggle }) => {
  const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = storedUser.id || storedUser._id || '';
  const isAdmin = storedUser.role === 'admin';

  const [postStatus, setPostStatus] = useState(post.status || 'approved');
   const handleApprove = async () => {
      try {
        await approvePost(post._id);
        setPostStatus('approved');
      } catch (error) { console.error(error); }
    };

    const handleReject = async () => {
      try {
        await rejectPost(post._id);
        setPostStatus('rejected');
      } catch (error) { console.error(error); }
    };

  const [currentImage, setCurrentImage] = useState(0);

  const [liked,      setLiked]      = useState(post.likes?.some(id => id === userId || id?._id === userId));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    if (likeLoading) return;
    try {
      setLikeLoading(true);
      const data = await toggleLike(post._id);
      setLiked(data.liked);
      setLikesCount(data.totalLikes);
      if (onLikeToggle) onLikeToggle();
    } catch {} finally {
      setLikeLoading(false);
    }
  };

  const username = post.user?.username || 'Usuario';
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <div id={`post-${post._id}`} className="post-container">

      <div className="post-user">
        <UserAvatar user={post.user} size={40} />
        <div className="user-data">
          <p><strong>@{username}</strong></p>
          <p>{timeAgo(post.createdAt)}</p>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          {isAdmin && (
            <StatusDropdown
              status={postStatus}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}
        </div>
      </div>

      <div className="post-info">
        <h2>{post.title}</h2>

        <div className="post-tags">
          {post.place    && <span>{post.place?.name    || post.place}</span>}
          {post.category && <span>{post.category?.name || post.category}</span>}
        </div>

        {post.images?.length > 0 && (
          <div className="post-carousel">

            {post.images.length > 1 && (
              <button
                className="carousel-btn left"
                onClick={() =>
                  setCurrentImage(
                    currentImage === 0
                      ? post.images.length - 1
                      : currentImage - 1
                  )
                }
              >‹
              </button>
            )}

            <img
              key={currentImage}
              src={`${IMG_BASE}${post.images[currentImage]}`}
              alt={`post-${currentImage}`}
            />

            {post.images.length > 1 && (
              <button
                className="carousel-btn right"
                onClick={() =>
                  setCurrentImage(
                    currentImage === post.images.length - 1
                      ? 0
                      : currentImage + 1
                  )
                }
              >
                ›
              </button>
            )}

          </div>
        )}

        {post.images?.length > 1 && (
          <div className="carousel-dots">
            {post.images.map((_, index) => (
              <span
                key={index}
                className={
                  currentImage === index
                    ? "dot active"
                    : "dot"
                }
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
      )}

        <p>{post.description}</p>
      </div>

      <div className="post-stats">
        <span className="post-like" onClick={handleLike} style={{ cursor:'pointer', color: liked ? 'var(--principal-color)' : 'inherit' }}>
          <img src="/like.png" alt="Like" />
          <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
        </span>

        <span onClick={onOpenComments} className="post-comme" style={{ cursor:'pointer' }}>
          <img src="/comment.png" alt="Comment" />
          <span>{post.totalComments || 0} Comentarios</span>
        </span>
      </div>

    </div>
  );
};

export default Post;