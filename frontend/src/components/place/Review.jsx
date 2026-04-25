export default function Review({ review }) {
  return (
    <div className="review-card">

      <div className="review-header">
        <h3>{review.title}</h3>
        <div className="stars">
          {"★".repeat(review.rating)}
        </div>
      </div>

      <p className="review-text">
        {review.text}
      </p>

      <div className="review-user">
        <div className="avatar"></div>

        <div>
          <p className="user-name">{review.user}</p>
          <span className="date">{review.date}</span>
        </div>
      </div>

    </div>
  );
}