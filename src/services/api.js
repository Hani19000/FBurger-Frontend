import axios from 'axios';
import { toast } from 'react-hot-toast';
import { executeLogout } from '../utils/authActions.js';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // INDISPENSABLE pour les cookies
});

// Intercepteur de Réponse (Gestion d'erreurs globale)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { status, config } = error.response || {};
        const url = config?.url || '';

        // 1. NEUTRALISATION : Cas qui ne sont PAS des erreurs pour l'UI

        // Si 401 sur /auth/me -> L'utilisateur est juste anonyme, on ne fait rien
        if (status === 401 && url.includes('/auth/me')) {
            return Promise.resolve({ data: null });
        }

        // Si 404 sur /review -> Il n'y a juste pas encore d'avis, on renvoie un tableau vide
        if (status === 404 && url.includes('/review')) {
            return Promise.resolve({ data: { data: [] } });
        }

        // 2. GESTION DES VRAIES ERREURS (Toasts)
        switch (status) {
            case 401:
                executeLogout();
                toast.error("Session expirée");
                // window.location.href = '/login'; // Optionnel mais faudra faire attention aux boucles de redirection
                break;

            case 403:
                toast.error("Accès refusé");
                break;

            case 500:
                toast.error("Erreur serveur");
                break;

            default:
                if (!error.response) {
                    toast.error("Serveur hors ligne");
                }
                break;
        }

        return Promise.reject(error);
    }
);

export default api;