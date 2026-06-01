import "../styles/community.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Shared/Navbar-component/Navbar"
import NewPost from "../components/posts-components/Post/CreatePost";
import Post from "../components/posts-components/Post/Post";
import CommentModal from "../components/posts-components/CommentModal/CommentModal";
import { getPosts } from "../services/postService";

export default function Community() {
  const [posts, setPosts]           = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const targetPostId = searchParams.get("post");

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

  useEffect(() => {
    if (!targetPostId || loading) return;

    const timer = setTimeout(() => {
      const targetPost = posts.find(
        (post) => post._id === targetPostId
      );

      const element = document.getElementById(
        `post-${targetPostId}`
      );

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        element.classList.add("highlight-post");

        setTimeout(() => {
          element.classList.remove("highlight-post");
        }, 3000);
      }

      if (targetPost) {
        setSelectedPost(targetPost);
        setSearchParams({}, { replace: true });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [posts, loading, targetPostId, setSearchParams]);

  return (
    <>
      <Navbar/>
      <div className="community-section">
        <div className="community-page">

          <NewPost onPostCreated={loadPosts} />

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
    </>
  );
}
