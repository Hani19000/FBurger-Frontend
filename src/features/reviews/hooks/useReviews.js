import { useState, useEffect, useCallback } from 'react'
import { reviewService } from '../services/reviewService.js'
import { toast } from 'react-hot-toast'
import { handle } from '../../../utils/promise.js'

export const useReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = useCallback(async (showLoader = true) => {
        if (showLoader) setLoading(true)
        const [data, err] = await handle(reviewService.getAll())

        if (showLoader) setLoading(false)
        return err ? [] : data
    }, []);

    const submitReview = async (reviewData) => {
        const [, err] = await handle(
            toast.promise(
                reviewService.create(reviewData, { skipGlobalToast: true }),
                {
                    loading: 'Envoi de votre avis...',
                    success: 'Merci ! Votre avis a été envoyé.',
                    error: (err) => err.response?.data?.message || "Impossible d'envoyer l'avis"
                }
            )
        )
        if (err) return
        // On force un fetch complet pour récupérer les données "populées" par le serveur
        const updatedData = await fetchReviews(false);
        setReviews(updatedData)
    }

    useEffect(() => {
        let active = true;
        const load = async () => {
            const data = await fetchReviews(true)
            if (active) setReviews(data)
        }
        load()
        return () => { active = false; }
    }, [fetchReviews])

    return { reviews, loading, submitReview, refresh: fetchReviews }
}