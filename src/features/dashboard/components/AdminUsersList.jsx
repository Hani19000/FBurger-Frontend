import { useUserListController } from '../hooks/controllers/useUserListController';
import ConfirmModal from './ConfirmModal';
import '../styles/AdminUserList.css';

export const AdminUserList = () => {
    const {
        users, loading, handleUpdate,
        isModalOpen, setIsModalOpen, userToDelete, promptDelete, confirmDelete
    } = useUserListController();

    if (loading) return <div className="admin-loader">Synchronisation...</div>;

    return (
        <div className="admin-users-wrapper">
            <header className="admin-users-header">
                <h1 className="admin-users-title">Membres</h1>
                <div className="admin-users-separator"></div>
                <p>Gestion des accès et de la communauté.</p>
            </header>

            <div className="admin-users-table-container">
                <table className="admin-users-table">
                    <thead>
                        <tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="font-nippo" data-label="Utilisateur">{user.username}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Rôle">
                                    <span className={`admin-users-role-badge ${(user.displayRole || 'user').toLowerCase()}`}>
                                        {user.displayRole || 'USER'}
                                    </span>
                                </td>
                                <td data-label="Actions">
                                    <div className="admin-users-actions-group">
                                        {user.displayRole !== 'ADMIN' && (
                                            <button onClick={() => handleUpdate(user.id)} className="admin-users-btn-promote">
                                                Promouvoir
                                            </button>
                                        )}
                                        <button onClick={() => promptDelete(user)} className="admin-users-btn-delete">
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
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                title="Alerte Suppression"
                message={`Supprimer définitivement ${userToDelete?.username} ?`}
            />
        </div>
    );
};