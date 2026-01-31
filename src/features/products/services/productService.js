import api from '../../../services/api';

const ProductService = {
    getAllProducts: () => api.get('/products'),

    getProductById: (id) => api.get(`/products/${id}`),

    createProduct: (productData) => api.post('/products', productData),

    updateProduct: (id, productData) => api.put(`/products/${id}`, productData),

    deleteProduct: (id) => api.delete(`/products/${id}`)
};

export default ProductService;