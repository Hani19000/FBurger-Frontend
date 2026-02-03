import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service.js';

export const useAdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await adminService.getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Erreur chargement produits:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const newProduct = await adminService.createProduct(formData);
            // On rafraîchit la liste ou on ajoute le nouveau produit au state
            setProducts(prev => [...prev, newProduct.data || newProduct]);
            return true;
        } catch (error) {
            console.error("Erreur création:", error);
            return false;
        }
    };

    const handleUpdate = async (id, formData) => {
        try {
            const updatedProduct = await adminService.updateProduct(id, formData);
            // Extraction des données selon la structure de ton intercepteur
            const productData = updatedProduct.data || updatedProduct;
            setProducts(prev => prev.map(p => p.id === id ? productData : p));
            return true;
        } catch (error) {
            console.error("Erreur update:", error);
            return false;
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            return true;
        } catch {
            alert("Erreur lors de la suppression");
            return false;
        }
    };

    useEffect(() => { fetchProducts(); }, []);

    return {
        products,
        loading,
        handleDelete,
        handleUpdate,
        handleCreate,
        refresh: fetchProducts
    };
};