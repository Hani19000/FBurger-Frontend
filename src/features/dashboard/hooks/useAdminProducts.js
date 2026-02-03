import { useState, useEffect } from 'react';
import { adminService } from '../../../services/admin.service.js';
import { toast } from 'react-hot-toast';

export const useAdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await adminService.getProducts();
            setProducts(data);
        } catch {
            // Erreur gérée globalement
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (formData) => {
        try {
            const newProduct = await adminService.createProduct(formData);
            // Mise à jour optimiste de l'interface
            setProducts(prev => [...prev, newProduct]);
            toast.success("Produit créé avec succès");
            return true;
        } catch {
            return false;
        }
    };

    const handleUpdate = async (id, formData) => {
        try {
            const updatedProduct = await adminService.updateProduct(id, formData);
            // Remplacement du produit modifié dans la liste
            setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
            toast.success("Produit mis à jour");
            return true;
        } catch {
            return false;
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminService.deleteProduct(id);
            setProducts(prev => prev.filter(p => p.id !== id));
            toast.success("Produit supprimé");
            return true;
        } catch {
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