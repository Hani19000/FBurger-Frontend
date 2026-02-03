import { useState, useEffect } from 'react'
import { adminService } from '../../../services/admin.service'
import { toast } from 'react-hot-toast'

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const data = await adminService.getUsers();
            setUsers(data);
        } catch {
            // L'intercepteur gère déjà le toast d'erreur réseau
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminService.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
            toast.success("Utilisateur supprimé");
        } catch {
            // Toast géré par l'intercepteur
        }
    };

    const handleUpdate = async (id) => {
        try {
            await adminService.updateUserRole(id, 'ADMIN');

            setUsers(prev => prev.map(u =>
                u.id === id ? { ...u, displayRole: 'ADMIN' } : u
            ));
            toast.success("Utilisateur promu Admin");
        } catch {
            // Toast géré par l'intercepteur
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    return { users, loading, handleDelete, refresh: fetchUsers, handleUpdate };
};