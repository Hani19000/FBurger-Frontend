import axios from 'axios';
import { toast } from 'react-hot-toast';
import { executeLogout } from '../utils/authActions.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

const handleResponseError = (error) => {
    const { status, config, data } = error.response || {} //récupération des données ici
    const url = config?.url || ''

    // --- 1. NEUTRALISATION ---
    if (status === 401 && url.includes('/auth/me')) return Promise.resolve(null);
    if (status === 404 && url.includes('/review')) return Promise.resolve([]);

    // --- 2. EXTRACTION DU MESSAGE SERVEUR ---
    const serverMessage = data?.message || data?.error;

    // SI LA REQUÊTE DEMANDE LE SILENCE, ON NE FAIT RIEN (sauf rejeter)
    if (config?.skipGlobalToast) {
        return Promise.reject(error);
    }

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
        case 409:
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

api.interceptors.response.use(
    (response) => response.data?.data || response.data,
    handleResponseError
)

export default api;