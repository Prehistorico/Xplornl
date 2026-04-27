export default function CategCard({ category }) {
  return (
    <div className="categ-card">
      <div className="categ-content">
        <h3 className="categ-title">{category.name}</h3>
        <p className="categ-desc">{category.desc}</p>
        <button className="categ-btn">Saber más</button>
      </div>
    </div>
  );
}
