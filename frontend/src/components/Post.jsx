import like from "../assets/icons/like.png";
import comment from "../assets/icons/comment.png";
import yunho from "../assets/images/yunho.png";

const Post = ({ post, onOpenComments }) => {
  return (
    <div className="post-container">

      <div className="post-user">
        <img src={yunho} alt="user" />

        <div className="user-data">
          <p><strong>{post.name}</strong></p>
          <p>{post.time}</p>
        </div>
      </div>

      <div className="post-info">
        <h2>{post.title}</h2>

        <div className="post-tags">
          <span>{post.place}</span>
          <span>{post.category}</span>
        </div>

        {post.image && (
          <div className="post-image">
            <img src={yunho} alt="post" />
          </div>
        )}

        <p>{post.description}</p>
      </div>

      <div className="post-stats">
        <span className="post-like">
          <img src={like} alt="Like" /> {post.likes} Likes
        </span>

        <span onClick={onOpenComments} className="clickable">
          <img src={comment} alt="Comment" /> {post.comments.length} Comentarios
        </span>
      </div>

    </div>
  );
};

export default Post;

