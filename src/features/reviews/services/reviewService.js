import api from '../../../services/api';

export const reviewService = {
    // Public : voir les avis
    getAll: () => api.get('/reviews'),

    // Privé : poster un avis (Le token est ajouté automatiquement par l'intercepteur AXIOS!)
    create: (reviewData) => api.post('/reviews', reviewData),
};