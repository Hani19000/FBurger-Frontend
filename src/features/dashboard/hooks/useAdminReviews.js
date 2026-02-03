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
            // Erreur gérée globalement
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            await adminService.deleteReview(id);
            setReviews(prev => prev.filter(r => r._id !== id))
            toast.success("Avis supprimé")
        } catch {
            // Erreur gérée globalement
        }
    }

    useEffect(() => { fetchReviews(); }, [])

    return { reviews, loading, handleDelete, refresh: fetchReviews }
};