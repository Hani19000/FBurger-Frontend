import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import '../styles/AdminUserList.css'
import ConfirmModal from './ConfirmModal'

export const AdminUserList = () => {
    const { users, loading, handleDelete } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    if (loading) return <div className="admin-loader">Synchronisation...</div>;

    return (
        <div className="admin-list-wrapper">
            {/* Header cohérent avec Overview */}
            <header className="admin-list-header">
                <h1 className="admin-title">Membres</h1>
                <div className="admin-separator"></div>
                <p>Gestion des accès et de la communauté.</p>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Utilisateur</th>
                            <th>Email</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="font-nippo" data-label="Utilisateur">{user.username}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Rôle">
                                    <span className={`role-badge ${(user.displayRole || 'user').toLowerCase()}`}>
                                        {user.displayRole || 'USER'}
                                    </span>
                                </td>
                                <td data-label="Actions">
                                    <button
                                        onClick={() => { setUserToDelete(user); setIsModalOpen(true); }}
                                        className="btn-delete-brutal"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={async () => {
                    await handleDelete(userToDelete.id);
                    setIsModalOpen(false);
                }}
                title="Alerte Suppression"
                message={`Supprimer définitivement ${userToDelete?.username} ?`}
            />
        </div>
    );
};