import api from '../../../services/api.js';

// services/reviewService.js
export const reviewService = {
    getAll: async () => {
        const res = await api.get('/reviews');
        return res || [];
    },

    create: async (reviewData) => {
        return await api.post('/reviews', reviewData);
    }
}