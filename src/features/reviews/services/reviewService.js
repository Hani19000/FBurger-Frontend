import api from '../../../services/api.js';

export const reviewService = {
    getAll: async () => {
        const res = await api.get('/reviews');
        return res || [];
    },

    create: async (reviewData, config = {}) => {
        return await api.post('/reviews', reviewData, config);
    }
}