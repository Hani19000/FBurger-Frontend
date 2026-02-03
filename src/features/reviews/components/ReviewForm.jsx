import { useState } from 'react'
import StarRating from '../../../components/atoms/Star/StarRating.jsx'
import { useAuth } from '../../../context/AuthContextInstance.js'
import { Button } from '../../../components/atoms/Button/Button.jsx'
import { LinkButton } from '../../../components/atoms/Button/Button.jsx'
import '../../../styles/review.css'
import toast from 'react-hot-toast'

const ReviewForm = ({ onSubmit }) => {
    const { user } = useAuth()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (rating === 0) {
            toast.error("N'oubliez pas de laisser une note !");
            return
        }

        // 2. Validation de la longueur (pour correspondre au backend)
        if (comment.trim().length < 10) {
            toast.error("Votre avis doit faire au moins 10 caractères.");
            return
        }

        await onSubmit({ rating, content: comment.trim() });

        setRating(0)
        setComment('')
    }

    if (!user) return (
        <div className='auth-notice'> {/* On garde le wrapper pour le fond texture */}
            <p style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-nippo)' }}>
                Connectez-vous pour laisser un avis.
            </p>
            <LinkButton variant="black" text="SE CONNECTER" to="/login" />
        </div>
    )

    return (
        <div className="review-form-section">
            <div className="review-form-card">
                <h3 className="review-form-title">Donnez votre avis</h3>

                <form onSubmit={handleSubmit} className="review-form">
                    <div className="review-form-group">
                        <label className="review-form-label">Note globale</label>
                        <StarRating rating={rating} setRating={setRating} size={32} />
                    </div>

                    <textarea
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        placeholder="Écrivez votre avis ici..."
                        className="review-textarea"
                        required
                    />

                    <LinkButton
                        text="PUBLIER MON AVIS"
                        htmlType="submit"
                        disabled={rating === 0 || !comment.trim()}
                    />
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;