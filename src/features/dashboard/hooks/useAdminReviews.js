import { useState, useEffect } from 'react'
import { adminService } from '../../../services/admin.service.js'
import { toast } from 'react-hot-toast'

export const useAdminReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            setLoading(true)
            const data = await adminService.getReviews()
            setReviews(data)
        } catch {
            toast.error("Impossible de charger les avis")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await adminService.deleteReview(id);
            setReviews(prev => prev.filter(r => r._id !== id))
            toast.success("Avis supprimé définitivement")
        } catch {
            toast.error("Erreur lors de la suppression")
        }
    }

    useEffect(() => { fetchReviews(); }, [])

    return { reviews, loading, handleDelete, refresh: fetchReviews }
};