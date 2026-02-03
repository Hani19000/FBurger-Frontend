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
    deleteProduct: async (productId) => {
        await api.delete(`/products/${productId}`);
    },

    createProduct: async (productData) => {
        const stats = await api.post('/products', productData);
        return stats
    },

    // Gestion des Avis
    deleteReview: async (reviewId) => {
        await api.delete(`/reviews/${reviewId}`);
    }
};