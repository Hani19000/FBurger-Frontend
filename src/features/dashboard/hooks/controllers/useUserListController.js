// src/hooks/controllers/useUserListController.js
import { useState } from 'react';
import { useUsers } from '../useUsers';

export const useUserListController = () => {
    const { users, loading, handleDelete, handleUpdate } = useUsers();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const promptDelete = (user) => {
        setUserToDelete(user);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            await handleDelete(userToDelete.id);
            setIsModalOpen(false);
        }
    };

    return { users, loading, handleUpdate, isModalOpen, setIsModalOpen, userToDelete, promptDelete, confirmDelete };
};

