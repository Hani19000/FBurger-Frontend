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
            toast.error("Impossible de charger les utilisateurs");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminService.deleteUser(id);
            setUsers(users.filter(u => u.id !== id));
            toast.success("Utilisateur supprimé");
        } catch {
            toast.error("Erreur lors de la suppression");
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    return { users, loading, handleDelete, refresh: fetchUsers };
};