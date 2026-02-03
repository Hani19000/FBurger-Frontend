import { useState } from 'react';
import { useAdminProducts } from '../hooks/useAdminProducts';
import ConfirmModal from './ConfirmModal';
import ProductModal from './ProductModal';
import '../styles/AdminUserList.css';
const API_URL = "https://fburger-420b.onrender.com";

export const AdminProductList = () => {
    const { products, loading, handleDelete, handleUpdate, handleCreate } = useAdminProducts();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // État pour suppression
    const [isEditOpen, setIsEditOpen] = useState(false);       // État pour formulaire
    const [productActive, setProductActive] = useState(null);

    // Version sécurisée avec l'Optional Chaining (?.)
    const getProductImage = (product) => {
        if (!product?.image_url) return "https://placehold.co/50x50?text=No+Image";
        if (product.image_url.startsWith('http')) return product.image_url;

        // Harmonisation : on force le passage par /images/
        const cleanPath = product.image_url.startsWith('/images/')
            ? product.image_url
            : `/images/${product.image_url.replace(/^\//, '')}`;

        return `${API_URL}${cleanPath}`;
    };

    // Fonctions d'ouverture
    const openEdit = (product) => {
        setProductActive(product);
        setIsEditOpen(true);
    };

    const openDelete = (product) => {
        setProductActive(product);
        setIsConfirmOpen(true);
    };

    const saveEdit = async (formData) => {
        let success;
        if (productActive) {
            // Mode Modification
            success = await handleUpdate(productActive.id, formData);
        } else {
            // Mode Création
            success = await handleCreate(formData);
        }

        if (success) {
            setIsEditOpen(false);
            setProductActive(null);
        }
    };

    if (loading) return <div className="admin-loader">Chargement du menu...</div>;

    return (
        <div className="admin-list-wrapper">
            <header className="admin-list-header">
                <h1 className="admin-title">Gestion Carte</h1>
                <div className="admin-separator"></div>
                <button
                    className="btn-delete-brutal"
                    style={{ backgroundColor: 'var(--color-primary)', color: '#000' }}
                    onClick={() => { setProductActive(null); setIsEditOpen(true); }}
                >
                    + Ajouter un Produit
                </button>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Nom</th>
                            <th>Catégorie</th>
                            <th>Prix</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 1. On filtre pour s'assurer que 'product' existe bien avant de mapper */}
                        {products && products.filter(p => p !== null && p !== undefined).map(product => (
                            <tr key={product.id}>
                                <td data-label="Image">
                                    <div className="admin-product-img-wrapper">
                                        <img
                                            src={getProductImage(product)}
                                            // 2. Utilisation de l'Optional Chaining ?. par précaution
                                            alt={product?.name || "Produit sans nom"}
                                            className="admin-product-img"
                                            onError={(e) => { e.target.src = "/images/default.webp"; }}
                                        />
                                    </div>
                                </td>
                                {/* 3. Sécurisation de l'affichage du nom */}
                                <td className="font-nippo" data-label="Nom">
                                    {product?.name || "Inconnu"}
                                </td>
                                <td data-label="Catégorie">
                                    <span className="role-badge">{product?.categorie || "N/A"}</span>
                                </td>
                                <td data-label="Prix">
                                    {(product?.prix || product?.price || 0)}€
                                </td>
                                <td data-label="Actions">
                                    <div className="admin-actions-cell">
                                        <button
                                            className="btn-delete-brutal"
                                            style={{ backgroundColor: '#fff', color: '#000' }}
                                            onClick={() => openEdit(product)}
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            className="btn-delete-brutal"
                                            onClick={() => openDelete(product)}
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de Confirmation de Suppression */}
            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={async () => {
                    await handleDelete(productActive.id);
                    setIsConfirmOpen(false);
                }}
                title="Supprimer Produit"
                message={`Voulez-vous retirer "${productActive?.name}" ?`}
            />

            {/* Modal de Formulaire (Add/Edit) */}
            <ProductModal
                key={productActive?.id || 'new-product'}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={saveEdit}
                product={productActive}
            />
        </div>
    );
};