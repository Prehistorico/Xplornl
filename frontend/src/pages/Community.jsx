import "../styles/community.css";
import { useState, useEffect } from "react";
import NewPost from "../components/posts-components/Post/CreatePost";
import Post from "../components/posts-components/Post/Post";
import CommentModal from "../components/posts-components/CommentModal/CommentModal";
import { getPosts } from "../services/postService";

export default function Community() {
  const [posts, setPosts]           = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data.posts || []);
    } catch (err) {
      setError('No se pudieron cargar las publicaciones.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const handlePostCreated = () => { loadPosts(); };

  return (
    <div className="community-section">
      <div className="community-page">

        <NewPost onPostCreated={handlePostCreated} />

        {loading && <p style={{ color: '#b0a090', textAlign: 'center' }}>Cargando publicaciones...</p>}
        {error   && <p style={{ color: '#ff6b6b', textAlign: 'center' }}>{error}</p>}

        {!loading && posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onOpenComments={() => setSelectedPost(post)}
            onLikeToggle={loadPosts}
          />
        ))}

      </div>

      {selectedPost && (
        <CommentModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onCommentAdded={loadPosts}
        />
      )}
    </div>
  );
}
