import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { handle } from '../../../utils/promise';
import { useAuth } from '../../../context/AuthContextInstance';
import { toast } from 'react-hot-toast';

export const useRegisterForm = () => {
    const { setAuthData } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ userName: '', email: '', password: '', confirmPassword: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 1. Validation Fail-Fast 
        if (formData.password !== formData.confirmPassword) {
            return toast.error("Les mots de passe ne correspondent pas");
        }

        setIsSubmitting(true);
        const loadId = toast.loading("Création du compte...");

        // 2. Appel Service 
        const payload = {
            username: formData.userName,
            email: formData.email,
            password: formData.password
        };

        const [response, error] = await handle(authService.register(payload));

        // 3. Gestion d'erreur
        if (error) {
            setIsSubmitting(false);
            toast.dismiss(loadId);
        }

        // 4. Extraction & Auto-connexion
        const responseData = response?.data?.data || response?.data;
        const { user, accessToken } = responseData || {};

        console.log("Debug Register:", { user, accessToken });

        if (responseData) {
            setAuthData(user, accessToken);
            toast.success(`Bienvenue, ${user.username} !`, { id: loadId });
            navigate('/review', { replace: true });
        } else {
            // Cas rare où l'inscription marche mais le token n'est pas renvoyé
            toast.success("Compte créé ! Veuillez vous connecter.", { id: loadId });
            navigate('/login', { replace: true });
        }
    };

    return {
        formData,
        isSubmitting,
        handleChange,
        handleSubmit
    };
};