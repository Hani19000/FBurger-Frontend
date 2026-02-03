import axios from 'axios'
import { toast } from 'react-hot-toast'
import { executeLogout } from '../utils/authActions.js'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

/**
 * Gestion centralisée des erreurs de réponse
 */
const handleResponseError = (error) => {
    const { status, config, data } = error.response || {};
    const url = config?.url || '';

    // Neutralisation des erreurs attendues pour éviter des alertes inutiles
    if (status === 401 && url.includes('/auth/me')) return Promise.resolve(null);
    if (status === 404 && url.includes('/review')) return Promise.resolve([]);

    const serverMessage = data?.message || data?.error;

    // Sortie immédiate si le silence est requis par la configuration de la requête
    if (config?.skipGlobalToast) {
        return Promise.reject(error);
    }

    // Traitement des notifications selon le code d'état HTTP
    switch (status) {
        case 400:
            toast.error(serverMessage || "Données invalides");
            break;
        case 401:
            executeLogout();
            toast.error("Session expirée");
            break;
        case 403:
            toast.error("Accès refusé");
            break;
        case 409:
            toast.error(serverMessage || "Cette ressource existe déjà");
            break;
        case 500:
            toast.error("Erreur serveur interne");
            break;
        default:
            if (!error.response) {
                toast.error("Serveur hors ligne");
            } else {
                toast.error(serverMessage || "Une erreur est survenue");
            }
            break;
    }

    return Promise.reject(error);
}

api.interceptors.response.use(
    (response) => response.data?.data || response.data,
    handleResponseError
);

export default api;