import axios from 'axios';
import { toast } from 'react-hot-toast';
import { executeLogout } from '../utils/authActions.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response.data?.data || response.data;
    },
    (error) => {
        const { status, config, data } = error.response || {}; // On récupère 'data' ici
        const url = config?.url || '';

        // --- 1. NEUTRALISATION ---
        if (status === 401 && url.includes('/auth/me')) return Promise.resolve(null);
        if (status === 404 && url.includes('/review')) return Promise.resolve([]);

        // --- 2. EXTRACTION DU MESSAGE SERVEUR ---
        // On cherche le message précis renvoyé par le backend
        const serverMessage = data?.message || data?.error;

        // --- 3. GESTION DES ERREURS GLOBALES ---
        switch (status) {
            case 400: // Ajout du cas 400 (Bad Request / Validation)
                toast.error(serverMessage || "Données invalides");
                break;
            case 401:
                executeLogout();
                toast.error("Session expirée");
                break;
            case 403:
                toast.error("Accès refusé");
                break;
            case 409: // Ajout du cas 409 (Conflict - Email déjà utilisé)
                toast.error(serverMessage || "Cette ressource existe déjà");
                break;
            case 500:
                toast.error("Erreur serveur");
                break;
            default:
                if (!error.response) {
                    toast.error("Serveur hors ligne");
                } else {
                    // Pour toutes les autres erreurs avec une réponse
                    toast.error(serverMessage || "Une erreur est survenue");
                }
                break;
        }

        return Promise.reject(error);
    }
);

export default api;