import api from './api';

export const adminService = {
    // Statistiques globales
    getStats: async () => {
        const stats = await api.get('/dashboard/stats')
        return stats
    },

    getUsers: async () => {
        try {
            const response = await api.get('/users');
            const rawData = response;

            return rawData.map(user => {
                const isAdmin = Number(user.roleId) === 3;
                const roleName = isAdmin ? 'ADMIN' : 'USER';

                return {
                    ...user,
                    displayRole: roleName
                };
            });
        } catch (error) {
            console.error("Erreur service admin:", error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        await api.delete(`/users/${userId}`);
    },

    updateUserRole: async (userId, roleName) => {
        const stats = await api.patch(`/users/${userId}/role`, { roleName });
        return stats
    },

    // Gestion des Produits
    getProducts: async () => {
        // L'intercepteur renvoie déjà les données, pas besoin de .data.data
        const response = await api.get('/products');
        // les produits sont dans la clé 'data' de l'objet renvoyé
        return response.data || response || [];
    },

    createProduct: async (formData) => {
        try {
            // FormData est automatiquement détecté par axios
            // qui définit le bon Content-Type
            const product = await api.post('/products', formData);
            return product;
        } catch (error) {
            console.error("Erreur création produit:", error);
            throw error;
        }
    },

    updateProduct: async (id, formData) => {
        try {
            // FormData pour l'upload d'image
            const product = await api.put(`/products/${id}`, formData);
            return product;
        } catch (error) {
            console.error("Erreur mise à jour produit:", error);
            throw error;
        }
    },

    deleteProduct: async (id) => {
        await api.delete(`/products/${id}`);
    },

    // Gestion des Avis
    getReviews: async () => {
        try {
            const reviews = await api.get('/reviews');
            return Array.isArray(reviews) ? reviews : [];
        } catch (error) {
            return error
        }
    },

    deleteReview: async (reviewId) => {
        // L'interceptor retourne déjà les données
        const response = await api.delete(`/reviews/${reviewId}`);
        return response;
    }
};