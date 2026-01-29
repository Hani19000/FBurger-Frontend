const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiClient = {
    async get(endpoint) {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`);
            if (!response.ok) throw new Error('Erreur réseau');
            const json = await response.json();
            return json.data || json;
        } catch (error) {
            console.error(`API Get Error (${endpoint}):`, error);
            throw error;
        }
    }
};