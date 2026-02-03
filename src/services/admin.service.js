import api from './api';

/**
 * Service dédié aux opérations d'administration
 * Suit le Service Layer Pattern pour séparer la logique de l'UI
 */
export const adminService = {
    // Statistiques
    getStats: async () => {
        return await api.get('/dashboard/stats');
    },

    // Gestion des Utilisateurs
    getUsers: async () => {
        const response = await api.get('/users');
        return response.map(user => ({
            ...user,
            displayRole: Number(user.roleId) === 3 ? 'ADMIN' : 'USER'
        }));
    },

    deleteUser: async (userId) => {
        return await api.delete(`/users/${userId}`);
    },

    updateUserRole: async (userId, roleName) => {
        return await api.patch(`/users/${userId}/role`, { roleName });
    },

    // Gestion des Produits
    getProducts: async () => {
        const response = await api.get('/products');
        return response.data || response || [];
    },

    createProduct: async (formData) => {
        return await api.post('/products', formData);
    },

    updateProduct: async (id, formData) => {
        return await api.put(`/products/${id}`, formData);
    },

    deleteProduct: async (id) => {
        return await api.delete(`/products/${id}`);
    },

    // Gestion des Avis
    getReviews: async () => {
        const reviews = await api.get('/reviews');
        return Array.isArray(reviews) ? reviews : [];
    },

    deleteReview: async (reviewId) => {
        return await api.delete(`/reviews/${reviewId}`);
    }
};