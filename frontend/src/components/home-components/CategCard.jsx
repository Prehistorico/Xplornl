import mountain from "../../assets/images/mountain.png";

export default function CategCard({ category, active }) {
  return (
    <div className={`categ-card ${active ? "categ-card--active" : ""}`}>
      <div className="categ-img-wrapper">
        <img
          src={category.image || mountain}
          alt={category.name}
          className="categ-img"
          onError={(e) => { e.target.src = mountain; }}
        />
      </div>
      <div className="categ-content">
        <h3 className="categ-title">{category.name}</h3>
        <p className="categ-desc">{category.desc}</p>
        {/* <button className="categ-btn">Saber más</button> */}
      </div>
    </div>
  );
}
