import { useState, useEffect, useMemo, useCallback } from 'react';
import { authService } from '../features/auth/services/authService';
import { AuthContext } from './AuthContextInstance';
import { handle } from '../utils/promise';
import { registerLogout } from '../utils/authActions';
import * as Sentry from "@sentry/react";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const updateAuth = useCallback((userData) => {
        setUser(userData);
        Sentry.setUser(userData ? {
            id: userData.id,
            email: userData.email,
            username: userData.username
        } : null);
    }, []);

    useEffect(() => {
        registerLogout(() => setUser(null));
    }, []);

    // Vérification de session au démarrage (Cookie check)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await authService.me();
                const userData = res.data?.data || res.data;
                updateAuth(userData);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [updateAuth]);


    const login = useCallback(async (email, password) => {
        const [res, error] = await handle(authService.login(email, password));
        if (error) throw error;
        const data = res.data?.data || res.data;
        updateAuth(data.user);
        return data;
    }, [updateAuth]);


    const logout = useCallback(async () => {
        await handle(authService.logout());
        updateAuth(null, false);
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
};