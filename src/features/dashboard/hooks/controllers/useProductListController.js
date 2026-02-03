import { useState } from 'react';
import { useAdminProducts } from '../useAdminProducts';
const API_URL = import.meta.env.VITE_API_URL || "https://fburger-420b.onrender.com";

export const useProductListController = () => {
    // 1. Récupération des données et actions API
    const { products, loading, handleDelete, handleUpdate, handleCreate } = useAdminProducts();

    // 2. États locaux de l'interface (UI State)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [activeProduct, setActiveProduct] = useState(null);

    // 3. Logique métier d'affichage
    const getProductImage = (product) => {
        if (!product?.image_url) return "https://placehold.co/50x50?text=No+Image";
        if (product.image_url.startsWith('http')) return product.image_url;

        const cleanPath = product.image_url.startsWith('/images/')
            ? product.image_url
            : `/images/${product.image_url.replace(/^\//, '')}`;

        return `${API_URL}${cleanPath}`;
    };

    // 4. Gestionnaires d'événements (Event Handlers)
    const openCreate = () => {
        setActiveProduct(null);
        setIsEditOpen(true);
    };

    const openEdit = (product) => {
        setActiveProduct(product);
        setIsEditOpen(true);
    };

    const openDelete = (product) => {
        setActiveProduct(product);
        setIsConfirmOpen(true);
    };

    const onConfirmDelete = async () => {
        if (activeProduct) {
            await handleDelete(activeProduct.id);
            setIsConfirmOpen(false);
        }
    };

    const onSaveForm = async (formData) => {
        let success;
        if (activeProduct) {
            success = await handleUpdate(activeProduct.id, formData);
        } else {
            success = await handleCreate(formData);
        }

        if (success) {
            setIsEditOpen(false);
            setActiveProduct(null);
        }
        return success;
    };

    return {
        // Data
        products,
        loading,
        activeProduct,
        // UI States
        isConfirmOpen,
        isEditOpen,
        setIsConfirmOpen,
        setIsEditOpen,
        // Methods
        getProductImage,
        openCreate,
        openEdit,
        openDelete,
        onConfirmDelete,
        onSaveForm
    };
};