import api from '../../../services/api.js';

export const reviewService = {
    getAll: async () => {
        const res = await api.get('/reviews');
        return res.data?.data || [];
    },

    // Poster un avis
    create: async (reviewData) => {
        const { data } = await api.post('/reviews', reviewData);
        return data?.data || data;
    }
}