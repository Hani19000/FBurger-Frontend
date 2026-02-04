import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || "https://fburger-420b.onrender.com";

export const useProductForm = (product, onSave, onClose) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        categorie: product?.categorie || '',
        prix: product?.prix || '',
        description: product?.description || '',
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Initialisation intelligente de la preview
    const [previewUrl, setPreviewUrl] = useState(() => {
        if (!product?.image_url) return '';
        if (product.image_url.startsWith('http') || product.image_url.startsWith('blob:')) {
            return product.image_url;
        }
        const path = product.image_url.startsWith('/') ? product.image_url : `/images/${product.image_url}`;
        return `${API_URL}${path}`;
    });

    // Nettoyage automatique des Blobs (Memory Leak prevention)
    useEffect(() => {
        return () => {
            if (previewUrl?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Construction du FormData
        Object.keys(formData).forEach(key => data.append(key, formData[key]));

        if (selectedFile) {
            data.append('image', selectedFile);
        } else if (product?.image_url) {
            data.append('image_url', product.image_url);
        }

        const success = await onSave(data);
        if (success) onClose();
    };

    return {
        formData,
        previewUrl,
        handleChange,
        handleFileChange,
        handleSubmit
    };
};