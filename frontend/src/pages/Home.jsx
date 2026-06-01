import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlaces } from "../services/placeService";
import { getPosts } from "../services/postService";

import Navbar from "../components/Shared/Navbar-component/Navbar"
import Hero from "../components/home-components/Hero/Hero";
import Zones from "../components/home-components/Zones/Zones";
import CategExplor from "../components/home-components/CategExplor/CategExplor";
import PlaceCard from "../components/Shared/PlaceCard-component/PlaceCard";
import "../styles/home/home.css";


import likeIcon from "../assets/icons/like.png";
import commentIcon from "../assets/icons/comment.png";

import mountain from "../assets/images/mountain.png";
import mountain2 from "../assets/images/mountain2.png";
import watchtower from "../assets/images/watchtower.png";
import mtysur from "../assets/images/MTYSUR.jpeg";

const AVATAR_COLORS = ["#E8A87C", "#85C1E9", "#A9DFBF", "#F1948A"];
const AVATAR_INITIALS = ["JY", "KY", "KH", "JY"];

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0l1.5 4H12l-3.5 2.5 1.3 4.2L6 8.5l-3.8 2.2 1.3-4.2L0 4h4.5z" />
    </svg>
  );
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();

  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(days / 7);

  if (mins < 1) return "Ahora";
  if (mins < 60) return `${mins} min`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days} día${days > 1 ? "s" : ""}`;

  return `${weeks} semana${weeks > 1 ? "s" : ""}`;
}

function CommunityCard({
  postId,
  user,
  time,
  title,
  img,
  color,
  initials,
  description,
  likes,
  comments
}) {
  const navigate = useNavigate();
  return (
    <div className={`comm-card ${!img ? "comm-card-no-image" : ""}`}
          onClick={() => navigate(`/community?post=${postId}`)}>

      {img && (
        <div className="comm-img-wrap">
          <img src={img} alt={title} className="comm-img" />
        </div>
      )}
  <div className="comm-main">
      <div className="comm-body">
        <div className="comm-user">
          <div
            className="comm-avatar"
            style={{ background: color }}
          >
            {initials}
          </div>

          <div>
            <div className="comm-username">{user}</div>
            <div className="comm-time">{time}</div>
          </div>
        </div>
      </div>

      <div className="comm-content">
          <h4 className="comm-title">{title}</h4>

          <p className="comm-desc">
            {truncateText(description, 100)}
          </p>
      </div>

      <div className="comm-stats">
        <span className="comm-stat">
          <img src={likeIcon} alt="likes" />
          {likes}
        </span>

        <span className="comm-stat">
          <img src={commentIcon} alt="comments" />
          {comments}
        </span>
      </div>
</div>

    </div>
  );
}

function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) {return text;}
  return text.slice(0, maxLength) + '...';
}

export default function Home() {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const placesData = await getPlaces();
        const postsData = await getPosts();

        setPlaces(placesData);
        setPosts(postsData.posts);
        console.log(postsData);
        console.log(placesData);

      } catch (error) {
        console.error(error);
        if (error.message === 'No autorizado') {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };
    loadData();
  }, []);

  return (
    <>
      <Navbar/>
      <Hero />

      <div className="home-page">
        <Zones />
         <CategExplor /> 

        <section className="home-section">
          <h2 className="home-section-title">Nuestras recomendaciónes para tí...</h2>
          <div className="places-grid">
            {places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))}
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">Lugares populares</h2>
          <div className="places-grid">
            {places.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))}
          </div>
        </section>

        <section className="home-section home-community">
          <div className="home-community-header">
            <div>
              <h2 className="home-section-title" style={{ marginBottom: 6 }}>
                Explora la comunidad
              </h2>
              <p className="home-community-sub">
                Descubre más sobre lugares y conoce las aventuras de otros.
              </p>
            </div>
            <button 
              className="home-community-btn"
              onClick={() => navigate("/Community")}>
              Explorar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <div className="comm-grid">
            {posts.map((post, i) => (
              <CommunityCard
                key={post._id}
                postId={post._id}
                user={post.user?.username || "Usuario"}
                time={timeAgo(post.createdAt)}
                title={post.title}
                img={
                  post.images?.length
                    ? `http://localhost:5000${post.images[0]}`
                    : null
                }
                description={post.description}
                likes={post.likes?.length || 0}
                comments={post.totalComments || 0}
                color={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                initials={
                  post.user?.username
                    ?.slice(0, 2)
                    .toUpperCase() || "US"
                }
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
 