import api from '../services/api';

export const menuService = {
    // Récupérer tous les produits
    getAllProducts: () => api.get('/products'),

    // Récupérer un produit par ID
    getProductById: (id) => api.get(`/products/${id}`),

    // Filtrer par catégorie
    getProductsByCategory: (category) => api.get(`/products?category=${category}`)
};