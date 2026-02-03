import { useState } from 'react';
import { useAdminReviews } from '../useAdminReviews';

export const useReviewListController = () => {
    const { reviews, loading, handleDelete } = useAdminReviews();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewToDelete, setReviewToDelete] = useState(null);

    const promptDelete = (review) => {
        setReviewToDelete(review);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (reviewToDelete) {
            await handleDelete(reviewToDelete._id);
            setIsModalOpen(false);
        }
    };

    return { reviews, loading, isModalOpen, setIsModalOpen, reviewToDelete, promptDelete, confirmDelete };
};