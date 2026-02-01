import { useState, useEffect, useMemo, useCallback } from 'react';
import { authService } from '../features/auth/services/authService';
import { AuthContext } from './AuthContextInstance';
import { handle } from '../utils/promise';
import { registerLogout } from '../utils/authActions';
import * as Sentry from "@sentry/react";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //Sentry est mis à jour de manière synchrone et sécurisée
    const updateAuth = useCallback((userData) => {
        setUser(userData);
        // Sentry.setUser ne retourne pas de promesse, mais on l'isole
        if (userData) {
            Sentry.setUser({ id: userData.id, email: userData.email, username: userData.username });
        } else {
            Sentry.setUser(null);
        }
    }, []);

    useEffect(() => {
        registerLogout(() => setUser(null));
    }, []);

    // Vérification de session au démarrage (Cookie check)
    useEffect(() => {
        registerLogout(() => setUser(null));

        const initAuth = async () => {
            try {
                const res = await authService.me();

                let userData = null;
                if (res?.data) {
                    userData = res.data.data ? res.data.data : res.data;
                }
                // fonction de callback pour garantir l'ordre
                updateAuth(userData);
            } catch {
                updateAuth(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, [updateAuth]);


    const login = useCallback(async (email, password) => {
        const [res, error] = await handle(authService.login(email, password));
        if (error) throw error;

        const data = res.data?.data || res.data;
        updateAuth(data.user);
        return data;
    }, [updateAuth]);


    const logout = useCallback(async () => {
        //  attendre la fin du service avant de reset l'UI
        await handle(authService.logout());
        updateAuth(null);
    }, [updateAuth]);


    const value = useMemo(() => ({
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        setAuthData: updateAuth
    }), [user, loading, login, logout, updateAuth]);

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}