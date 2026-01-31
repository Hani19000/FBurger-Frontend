// src/api/apiClient.js
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
        const status = error.response?.status;
        const message = error.response?.data?.message || "Une erreur est survenue";
        const isMeRoute = error.config.url.includes('/auth/me');
        switch (status) {

            case 401:
                if (isMeRoute) {
                    break;
                }

                executeLogout();
                toast.error("Session expirée");
                window.location.href = '/login';
                break;


            case 403:
                toast.error("Vous n'avez pas les permissions nécessaires");
                break;

            case 404:
                toast.error("Ressource introuvable");
                break;

            case 500:
                toast.error("Erreur serveur, nos équipes sont sur le coup");
                break;

            default:
                // Erreurs réseau ou erreurs inconnues
                if (!error.response) {
                    toast.error("Impossible de contacter le serveur. Vérifiez votre connexion.");
                } else {
                    toast.error(message);
                }
                break;
        }

        return Promise.reject(error);
    }
);

export default api;