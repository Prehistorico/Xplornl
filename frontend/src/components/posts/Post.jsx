import yunho from "../../assets/images/yunho.png";

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
          <img src="like.png" alt="Like" /> 
          <span>{post.likes} Likes</span>
        </span>

        <span onClick={onOpenComments} className="post-comme">
          <img src="comment.png" alt="Comment" />
          <span>{post.comments.length} Comentarios</span>
        </span>
      </div>

    </div>
  );
};

export default Post;

