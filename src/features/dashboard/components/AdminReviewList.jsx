import { useState } from 'react';
import { useAdminReviews } from '../hooks/useAdminReviews.js';
import ConfirmModal from './ConfirmModal';
import StarRating from '../../../components/atoms/Star/StarRating.jsx';
import '../styles/AdminUserList.css';

export const AdminReviewList = () => {
    const { reviews, loading, handleDelete } = useAdminReviews();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    if (loading) return <div className="admin-loader">Synchronisation des avis...</div>;

    return (
        <div className="admin-list-wrapper">
            <header className="admin-list-header">
                <h1 className="admin-title">Avis Clients</h1>
                <div className="admin-separator"></div>
                <p>Modération et suivi de la satisfaction.</p>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Auteur</th>
                            <th>Note</th>
                            <th>Commentaire</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review._id}>
                                <td className="font-nippo" data-label="Auteur">
                                    {review.userId?.username || "Anonyme"}
                                </td>
                                <td data-label="Note">
                                    <div style={{ pointerEvents: 'none' }}>
                                        <StarRating rating={review.rating} size={16} />
                                    </div>
                                </td>
                                <td data-label="Commentaire">
                                    <div className="admin-comment-truncate" title={review.content}>
                                        {review.content.substring(0, 50)}...
                                    </div>
                                </td>
                                <td data-label="Actions">
                                    <button
                                        onClick={() => { setReviewToDelete(review); setIsModalOpen(true); }}
                                        className="btn-delete-brutal"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={async () => {
                    await handleDelete(reviewToDelete._id);
                    setIsModalOpen(false);
                }}
                title="Modération Avis"
                message="Supprimer cet avis de manière irréversible ?"
            />
        </div>
    );
};