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
        <div className="admin-list-wrapper">
            <header className="admin-list-header">
                <h1 className="admin-title">Membres</h1>
                <div className="admin-separator"></div>
                <p>Gestion des accès et de la communauté.</p>
            </header>

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr><th>Utilisateur</th><th>Email</th><th>Rôle</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td className="font-nippo">{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`role-badge ${(user.displayRole || 'user').toLowerCase()}`}>
                                        {user.displayRole || 'USER'}
                                    </span>
                                </td>
                                <td>
                                    <div className="admin-actions-group">
                                        {user.displayRole !== 'ADMIN' && (
                                            <button onClick={() => handleUpdate(user.id)} className="btn-promote-brutal">
                                                Promouvoir
                                            </button>
                                        )}
                                        <button onClick={() => promptDelete(user)} className="btn-delete-brutal">
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