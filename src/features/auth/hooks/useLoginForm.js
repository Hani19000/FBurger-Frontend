import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { toast } from 'react-hot-toast';


export const useLoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const from = location.state?.from?.pathname || '/home';

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const loadingToast = toast.loading("Connexion en cours...");
        setIsSubmitting(true);
        try {
            await login(credentials.email, credentials.password);
            toast.success("Bon retour parmi nous !", { id: loadingToast });
            navigate(from, { replace: true });
            setTimeout(() => {
                navigate('/home', { replace: true });
            }, 100);
        } catch {
            toast.dismiss(loadingToast);
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        credentials,
        isSubmitting,
        handleChange,
        handleSubmit
    };
};