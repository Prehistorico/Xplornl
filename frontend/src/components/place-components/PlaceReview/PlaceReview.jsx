import { useEffect, useState, useRef } from "react";
import { getReviewsByPlace, createReview, updateReview, deleteReview } from "../../../services/reviewService";
import Review from "./Review";
import ReviewWarning from "../../warning-components/placeWarnings/reviewWarning";
import "./reviews.css";

export default function PlaceReviews({ placeId }) {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", rating: 5 });
  const [editingReview, setEditingReview] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = currentUser._id || currentUser.id;
  const isAdmin = currentUser.role === "admin";

  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const scrollReview = (dir) => {
    const next = activeIndex + dir;
    if (next < 0 || next >= reviews.length) return;
    setActiveIndex(next);
    const card = trackRef.current?.children[next];
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  const loadReviews = async () => {
    if (!placeId) return;
    try {
      const data = await getReviewsByPlace(placeId);
      setReviews(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { loadReviews(); }, [placeId]);

  const alreadyReviewed = reviews.some(r => r.user?._id === currentUserId);

  const handleAddClick = () => {
    if (alreadyReviewed) {
      setShowWarning(true);
    } else {
      setShowForm(!showForm);
    }
  };

  const handleSubmit = async () => {
    if (!form.title.trim()) return;
    try {
      if (editingReview) {
        await updateReview(editingReview._id, form);
        setEditingReview(null);
      } else {
        await createReview({ place: placeId, ...form });
      }
      setForm({ title: "", description: "", rating: 5 });
      setShowForm(false);
      await loadReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setForm({ title: review.title, description: review.description, rating: review.rating });
    setShowForm(true);
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("¿Eliminar reseña?")) return;
    try {
      await deleteReview(reviewId);
      await loadReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const average = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-section">

      {showWarning && <ReviewWarning onClose={() => setShowWarning(false)} />}

      <div className="reviews-top">
        <div className="reviews-summary">
          <h2>Reseñas</h2>
          <div className="rating-number">
            <span className="score">{average}</span>
            <span className="total">/5</span>
          </div>
          <p className="rating-label">{reviews.length} reseñas</p>
          <button className="see-more">Ver más</button>
        </div>
        
        <div className="reviews-container">
          <button
            className="arrow left"
            onClick={() => scrollReview(-1)}
            disabled={activeIndex === 0}
          >‹</button>

          <div className="reviews-list" ref={trackRef}>
            {reviews.map((r, i) => (
              <Review
                key={r._id}
                review={r}
                active={i === activeIndex}
                currentUserId={currentUserId}
                isAdmin={isAdmin}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={loadReviews}
              />
            ))}
          </div>

          <button
            className="arrow right"
            onClick={() => scrollReview(1)}
            disabled={activeIndex === reviews.length - 1}
          >›</button>
        </div>
      </div>

      <div className="reviews-cta">
        <p>Compártenos tu experiencia del lugar</p>
        <button className="add-review" onClick={handleAddClick}>
          Añadir reseña
        </button>

        {showForm && (
          <div className="review-form">
            <input
              placeholder="Título"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Descripción (opcional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
            <select
              value={form.rating}
              onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{"★".repeat(n)} ({n})</option>
              ))}
            </select>
            <div>
              <button onClick={() => { setShowForm(false); setEditingReview(null); }}>
                Cancelar
              </button>
              <button onClick={handleSubmit}>
                {editingReview ? "Guardar cambios" : "Enviar"}
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}