import { useProductForm } from '../hooks/useProductForm'
import { PRODUCT_CATEGORIES } from '../../../constants/categories'
import '../styles/AdminUserList.css';

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    // Appel du hook de logique de formulaire
    const {
        formData, previewUrl, handleChange, handleFileChange, handleSubmit
    } = useProductForm(product, onSave, onClose);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="admin-table-container modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="admin-title modal-title">
                    {product ? `MODIFIER : ${product.name}` : 'AJOUTER UN PRODUIT'}
                </h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    {/* Les champs sont liés via handleChange */}
                    <div className="form-group">
                        <label className="font-nippo label-sm">NOM *</label>
                        <input
                            className="role-badge input-full"
                            value={formData.name}
                            onChange={e => handleChange('name', e.target.value)}
                            placeholder="Nom du produit"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="font-nippo label-sm">CATÉGORIE *</label>
                        <select
                            className="role-badge input-full"
                            value={formData.categorie}
                            onChange={e => handleChange('categorie', e.target.value)}
                            required
                        >
                            <option value="">-- Choisir une catégorie --</option>
                            {PRODUCT_CATEGORIES.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="font-nippo label-sm">PRIX (€) *</label>
                        <input
                            className="role-badge input-full"
                            type="number"
                            step="0.01"
                            value={formData.prix}
                            onChange={e => handleChange('prix', e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="font-nippo label-sm">IMAGE</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="role-badge input-full"
                        />
                        {previewUrl && (
                            <img src={previewUrl} alt="Preview" className="img-preview-sm" />
                        )}
                    </div>

                    <div className="form-group">
                        <label className="font-nippo label-sm">DESCRIPTION</label>
                        <textarea
                            className="role-badge input-full textarea-resize"
                            value={formData.description}
                            onChange={e => handleChange('description', e.target.value)}
                            placeholder="Description..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="submit" className="btn-delete-brutal btn-primary">
                            {product ? 'Mettre à jour' : 'Créer'}
                        </button>
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;