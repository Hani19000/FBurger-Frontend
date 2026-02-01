import { useState, useEffect, useCallback } from 'react';
import { reviewService } from '../services/reviewService.js';
import { toast } from 'react-hot-toast';
import { handle } from '../../../utils/promise.js';

export const useReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fonction de récupération stable
    const fetchReviews = useCallback(async () => {
        setLoading(true);

        const [data, err] = await handle(reviewService.getAll());
        return err ? [] : data;
    }, []);

    // Fonction d'envoi d'avis exposée au composant
    const submitReview = async (reviewData) => {
        // Le toast.promise gère le loading, success et error UI
        await toast.promise(
            reviewService.create(reviewData),
            {
                loading: 'Envoi de votre avis...',
                success: 'Merci ! Votre avis a été envoyé.',
                error: (err) => err.response?.data?.message || "Impossible d'envoyer l'avis"
            }
        );
        // la liste est rafraichi apres un sucés
        const updatedData = await fetchReviews();
        setReviews(updatedData);
    };

    useEffect(() => {
        let active = true; // Flag pour éviter le cascading render désordonné

        const load = async () => {
            setLoading(true);
            const data = await fetchReviews();
            if (active) {
                setReviews(data);
                setLoading(false);
            }
        };

        load();

        return () => { active = false; }
    }, [fetchReviews])

    return { reviews, loading, submitReview, refresh: fetchReviews };
}