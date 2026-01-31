import { useState } from 'react';
import { useReviews } from '../features/reviews/hooks/useReviews';
import { reviewService } from '../features/reviews/services/reviewService';
import { handle } from '../utils/promise';
import { toast } from 'react-hot-toast';
import '../styles/review.css';

const Review = () => {
    const { reviews, loading, refresh } = useReviews();
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newReview.comment.trim()) return toast.error("Le commentaire ne peut pas être vide");

        setSubmitting(true);
        const [err] = await handle(reviewService.create(newReview));

        if (!err) {
            toast.success("Merci pour votre avis !");
            setNewReview({ rating: 5, comment: '' });
            refresh(); // permet de rafraîchire la liste
        }
        setSubmitting(false);
    };

    return (
        <div className="reviews-container">
            <section className="review-form-section">
                <h2>Laissez un avis</h2>
                <form onSubmit={handleSubmit} className="review-form">
                    <div className="rating-input">
                        <label>Note :</label>
                        <select
                            value={newReview.rating}
                            onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        >
                            {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} ★</option>)}
                        </select>
                    </div>
                    <textarea
                        placeholder="Qu'avez-vous pensé de nos burgers ?"
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    />
                    <button type="submit" disabled={submitting}>
                        {submitting ? "Envoi..." : "Publier l'avis"}
                    </button>
                </form>
            </section>

            <hr />

            <section className="reviews-list">
                {loading ? <p>Chargement des avis...</p> : (
                    reviews.map(rev => (
                        <div key={rev.id} className="review-card">
                            <div className="review-header">
                                <strong>{rev.User?.username || "Client"}</strong>
                                <span className="stars">{"★".repeat(rev.rating)}</span>
                            </div>
                            <p>{rev.comment}</p>
                            <small>{new Date(rev.createdAt).toLocaleDateString()}</small>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
};

export default Review;