import Hero from "../components/home-components/Hero/Hero";
import Zones from "../components/home-components/Zones/Zones";
import CategExplor from "../components/home-components/CategExplor/CategExplor";
import "../styles/home/home.css";
import mountain from "../assets/images/mountain.png";
import mountain2 from "../assets/images/mountain2.png";
import watchtower from "../assets/images/watchtower.png";
import mtysur from "../assets/images/MTYSUR.jpeg";

const PLACES = [
  { name: "Chipinque", zone: "Monterrey Sur", type: "Parque Ecológico", rating: 5, img: watchtower },
  { name: "Chipinque", zone: "Monterrey Sur", type: "Parque Ecológico", rating: 5, img: mountain },
  { name: "Chipinque", zone: "Monterrey Sur", type: "Parque Ecológico", rating: 5, img: mountain2 },
  { name: "Chipinque", zone: "Monterrey Sur", type: "Parque Ecológico", rating: 5, img: mtysur },
];

const COMMUNITY = [
  { user: "Jeong Yunho", time: "2 semanas", title: "Lorem ipsum dolor sit amet", img: mountain },
  { user: "Kang Yeosang", time: "10 días", title: "Lorem ipsum dolor sit amet", img: watchtower },
  { user: "Kim Hongjoong", time: "5 semanas", title: "Lorem ipsum dolor sit amet", img: mountain2 },
  { user: "Jeong Yunho", time: "2 semanas", title: "Lorem ipsum dolor sit amet", img: mtysur },
];

const AVATAR_COLORS = ["#E8A87C", "#85C1E9", "#A9DFBF", "#F1948A"];
const AVATAR_INITIALS = ["JY", "KY", "KH", "JY"];

function StarIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 0l1.5 4H12l-3.5 2.5 1.3 4.2L6 8.5l-3.8 2.2 1.3-4.2L0 4h4.5z" />
    </svg>
  );
}

function PlaceCard({ name, zone, type, rating, img }) {
  return (
    <div className="place-card">
      <div className="place-card-img-wrap">
        <img src={img} alt={name} className="place-card-img" />
        <span className="place-card-badge">
          <StarIcon /> {rating}
        </span>
      </div>
      <div className="place-card-body">
        <div className="place-card-top">
          <span className="place-card-name">{name}</span>
          <span className="place-card-zone">{zone}</span>
        </div>
        <span className="place-card-type">{type}</span>
        <p className="place-card-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua...
        </p>
        <button className="place-card-btn">Saber más</button>
      </div>
    </div>
  );
}

function CommunityCard({ user, time, title, img, color, initials }) {
  return (
    <div className="comm-card">
      <div className="comm-img-wrap">
        <img src={img} alt={title} className="comm-img" />
      </div>
      <div className="comm-body">
        <div className="comm-user">
          <div className="comm-avatar" style={{ background: color }}>{initials}</div>
          <div>
            <div className="comm-username">{user}</div>
            <div className="comm-time">{time}</div>
          </div>
        </div>
        <h4 className="comm-title">{title}</h4>
        <p className="comm-desc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua...
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <div className="home-page">
        <Zones />
        <CategExplor />

        <section className="home-section">
          <h2 className="home-section-title">Nuestras recomendaciónes para tí...</h2>
          <div className="places-grid">
            {PLACES.map((p, i) => <PlaceCard key={i} {...p} />)}
          </div>
        </section>

        <section className="home-section">
          <h2 className="home-section-title">Lugares populares</h2>
          <div className="places-grid">
            {PLACES.map((p, i) => <PlaceCard key={i} {...p} />)}
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
            <button className="home-community-btn">
              Explorar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <div className="comm-grid">
            {COMMUNITY.map((c, i) => (
              <CommunityCard
                key={i}
                {...c}
                color={AVATAR_COLORS[i]}
                initials={AVATAR_INITIALS[i]}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
