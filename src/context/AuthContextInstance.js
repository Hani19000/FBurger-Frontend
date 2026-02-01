import { createContext, useContext } from 'react';

// Création de l'instance
export const AuthContext = createContext(null);

// évite les erreurs Fast Refresh
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider");
    }
    return context;
}