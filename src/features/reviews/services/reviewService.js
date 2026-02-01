import api from '../../../services/api.js';

// services/reviewService.js
export const reviewService = {
    getAll: async () => {
        // 'res' contient déjà directement le tableau ou l'objet grâce à l'intercepteur
        const res = await api.get('/reviews');
        return res || [];
    },

    create: async (reviewData) => {
        return await api.post('/reviews', reviewData);
    }
}