import { useReviewListController } from '../hooks/controllers/useReviewListController.js'
import ConfirmModal from './ConfirmModal'
import StarRating from '../../../components/atoms/Star/StarRating.jsx'
import '../styles/AdminReviewList.css'

export const AdminReviewList = () => {
    const {
        reviews,
        loading,
        isModalOpen,
        setIsModalOpen,
        promptDelete,
        confirmDelete
    } = useReviewListController();

    if (loading) return <div className="admin-loader">Synchronisation des avis...</div>;

    return (
        <div className="admin-review-wrapper">
            <header className="admin-review-header">
                <h1 className="admin-review-title">Avis Clients</h1>
                <div className="admin-review-separator"></div>
                <p>Modération et suivi de la satisfaction.</p>
            </header>

            <div className="admin-review-table-container">
                <table className="admin-review-table">
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
                                    {review.userId?.username || review.user?.username || (typeof review.userId === 'string' ? "Utilisateur" : "Anonyme")}
                                </td>
                                <td data-label="Note">
                                    <div style={{ pointerEvents: 'none' }}>
                                        <StarRating rating={review.rating} size={16} />
                                    </div>
                                </td>
                                <td data-label="Commentaire">
                                    <div className="admin-review-comment" title={review.content}>
                                        {review.content.substring(0, 50)}...
                                    </div>
                                </td>
                                <td data-label="Actions">
                                    <button
                                        onClick={() => promptDelete(review)}
                                        className="admin-review-btn-delete"
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
                onConfirm={confirmDelete}
                title="Modération Avis"
                message="Supprimer cet avis de manière irréversible ?"
            />
        </div>
    );
};