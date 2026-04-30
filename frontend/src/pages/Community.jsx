import "../styles/community.css";
import { useState } from "react";
import NewPost from "../components/posts-components/CreatePostModal/CreatePostModal";
import Post from "../components/posts-components/Post/Post";
import CommentModal from "../components/posts-components/CommentModal/CommentModal";

export default function Community() {
  
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Kang Yeosang",
      time: "10 días",
      title: "Lorem ipsum dolor sit amet",
      description: "Lorem ipsum dolor sit amet...",
      place: "Chipinque",
      category: "Parque ecológico",
      likes: 3,
      comments: [
        {
          id: 1,
          user: "Jeong Yunho",
          time: "1 semana",
          text: "Lorem ipsum dolor sit amet",
          likes: 0,
          image: null
        }
      ],
      image: true
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="community-section">
      <div className="community-page">

        <NewPost onAddPost={addPost} />

        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            onOpenComments={() => setSelectedPost(post)}
          />
        ))}

      </div>

      {selectedPost && (
        <CommentModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}