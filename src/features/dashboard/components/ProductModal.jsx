import { useState, useEffect } from 'react';
import '../styles/AdminUserList.css';

const API_URL = import.meta.env.VITE_API_URL || "https://fburger-420b.onrender.com";

const ProductModal = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        categorie: product?.categorie || '',
        prix: product?.prix || '',
        description: product?.description || '',
    });

    const [selectedFile, setSelectedFile] = useState(null);

    // Initialisation robuste de la preview
    const [previewUrl, setPreviewUrl] = useState(() => {
        if (!product?.image_url) return '';

        // Si c'est déjà une URL complète (Cloudinary/Blob)
        if (product.image_url.startsWith('http') || product.image_url.startsWith('blob:')) {
            return product.image_url;
        }

        // On s'assure d'inclure le préfixe /images/
        const path = product.image_url.startsWith('/')
            ? product.image_url
            : `/images/${product.image_url}`;

        return `${API_URL}${path}`;
    });

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            // Création d'une URL temporaire pour la preview
            const localPreview = URL.createObjectURL(file);
            setPreviewUrl(localPreview);
        }
    };

    // Dans ProductModal.jsx
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('categorie', formData.categorie);
        data.append('prix', formData.prix);
        data.append('description', formData.description);

        if (selectedFile) {
            // IMPORTANT : On envoie le fichier sous la clé 'image' 
            // car ton router fait : uploadCloud.single('image')
            data.append('image', selectedFile);
        } else if (product?.image_url) {
            data.append('image_url', product.image_url);
        }

        const success = await onSave(data);
        if (success) onClose();
    };
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="admin-table-container"
                style={{ maxWidth: '500px', width: '90%', padding: '2rem' }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="admin-title" style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                    {product ? `MODIFIER : ${product.name}` : 'AJOUTER UN PRODUIT'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div>
                        <label className="font-nippo" style={{ fontSize: '0.7rem', display: 'block' }}>
                            NOM *
                        </label>
                        <input
                            className="role-badge"
                            style={{ width: '100%', padding: '0.6rem' }}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Nom du produit"
                            required
                        />
                    </div>

                    <div>
                        <label className="font-nippo" style={{ fontSize: '0.7rem', display: 'block' }}>
                            CATÉGORIE *
                        </label>
                        <input
                            className="role-badge"
                            style={{ width: '100%', padding: '0.6rem' }}
                            value={formData.categorie}
                            onChange={e => setFormData({ ...formData, categorie: e.target.value })}
                            placeholder="ex: Burger, Boissons..."
                            required
                        />
                    </div>

                    <div>
                        <label className="font-nippo" style={{ fontSize: '0.7rem', display: 'block' }}>
                            PRIX (€) *
                        </label>
                        <input
                            className="role-badge"
                            style={{ width: '100%', padding: '0.6rem' }}
                            type="number"
                            step="0.01"
                            value={formData.prix}
                            onChange={e => setFormData({ ...formData, prix: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label className="font-nippo" style={{ fontSize: '0.7rem' }}>
                            IMAGE DU PRODUIT
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="role-badge"
                            style={{ width: '100%', padding: '0.5rem' }}
                        />
                        {previewUrl && (
                            <div style={{ marginTop: '10px' }}>
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '4px',
                                        objectFit: 'cover',
                                        border: '2px solid var(--color-primary)'
                                    }}
                                    onError={(e) => {
                                        e.target.src = "https://placehold.co/100x100?text=Error";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="font-nippo" style={{ fontSize: '0.7rem', display: 'block' }}>
                            DESCRIPTION
                        </label>
                        <textarea
                            className="role-badge"
                            style={{
                                width: '100%',
                                padding: '0.6rem',
                                minHeight: '80px',
                                fontFamily: 'inherit',
                                resize: 'vertical'
                            }}
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description du produit..."
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                        <button
                            type="submit"
                            className="btn-delete-brutal"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: '#000',
                                flex: 1
                            }}
                        >
                            {product ? 'Mettre à jour' : 'Créer'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-delete-brutal"
                            style={{
                                backgroundColor: '#fff',
                                color: '#000',
                                flex: 1
                            }}
                        >
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;