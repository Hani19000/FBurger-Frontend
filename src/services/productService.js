const API_URL = import.meta.env.VITE_API_URL;

const ProductService = {
    getAllProducts: async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const json = await res.json();
            // Ton backend utilise probablement une structure { data: [...] } via ton utilitaire sendSuccess
            return json.data || json;
        } catch (err) {
            console.error("Erreur API:", err);
            return [];
        }
    },

    getProductById: async (id) => {
        try {
            const res = await fetch(`${API_URL}/products/${id}`);
            if (!res.ok) return null;
            const json = await res.json();
            return json.data || json;
        } catch (err) {
            return err;
        }
    }
};

export default ProductService;