import { useProductListController } from '../hooks/controllers/useProductListController';
import ConfirmModal from './ConfirmModal';
import ProductModal from './ProductModal';
import '../styles/AdminUserList.css';

export const AdminProductList = () => {
    // Injection de dépendance via le Controller
    const {
        products, loading, activeProduct,
        isConfirmOpen, isEditOpen, setIsConfirmOpen, setIsEditOpen,
        getProductImage, openCreate, openEdit, openDelete, onConfirmDelete, onSaveForm
    } = useProductListController();

    if (loading) return <div className="admin-loader">Chargement du menu...</div>;

    return (
        <div className="admin-list-wrapper">
            <header className="admin-list-header">
                <h1 className="admin-title">Gestion Carte</h1>
                <div className="admin-separator"></div>
                <button className="btn-delete-brutal btn-primary" onClick={openCreate}>
                    + Ajouter un Produit
                </button>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th><th>Nom</th><th>Catégorie</th><th>Prix</th><th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(product => (
                            <tr key={product.id}>
                                <td data-label="Image">
                                    <div className="admin-product-img-wrapper">
                                        <img
                                            src={getProductImage(product)}
                                            alt={product?.name}
                                            className="admin-product-img"
                                            onError={(e) => { e.target.src = "/images/default.webp"; }}
                                        />
                                    </div>
                                </td>
                                <td className="font-nippo" data-label="Nom">{product?.name}</td>
                                <td data-label="Catégorie"><span className="role-badge">{product?.categorie}</span></td>
                                <td data-label="Prix">{(product?.prix || 0)}€</td>
                                <td data-label="Actions">
                                    <div className="admin-actions-cell">
                                        <button className="btn-delete-brutal btn-edit" onClick={() => openEdit(product)}>
                                            Modifier
                                        </button>
                                        <button className="btn-delete-brutal" onClick={() => openDelete(product)}>
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={onConfirmDelete}
                title="Supprimer Produit"
                message={`Voulez-vous retirer "${activeProduct?.name}" ?`}
            />

            <ProductModal
                key={activeProduct?.id || 'new'}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onSave={onSaveForm}
                product={activeProduct}
            />
        </div>
    );
};