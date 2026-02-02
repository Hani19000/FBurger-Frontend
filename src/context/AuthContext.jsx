import { useState, useEffect, useMemo, useCallback } from 'react'
import { authService } from '../features/auth/services/authService'
import { AuthContext } from './AuthContextInstance'
import { handle } from '../utils/promise'
import { registerLogout } from '../utils/authActions'
import * as Sentry from "@sentry/react"

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const updateAuth = useCallback((userData) => {
        setUser(userData)
        if (userData) {
            Sentry.setUser({ id: userData.id, email: userData.email, username: userData.username })
        } else {
            Sentry.setUser(null)
        }
    }, [])

    // 1. Initialisation
    useEffect(() => {
        const cleanup = registerLogout(() => setUser(null))
        return cleanup
    }, [])

    // 2. Récupération de la session au démarrage
    useEffect(() => {
        let isMounted = true

        const initAuth = async () => {
            try {
                const data = await authService.me()
                if (isMounted) {
                    const userToSet = data?.user || data
                    updateAuth(userToSet)
                }
            } catch {
                if (isMounted) {
                    updateAuth(null)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }
        initAuth()

        return () => {
            isMounted = false
        }
    }, [updateAuth])

    // 3. Actions d'authentification (Ré-ajoutées ici)
    const login = useCallback(async (email, password) => {
        const [data, error] = await handle(authService.login(email, password))
        if (error) throw error

        // Grâce à l'intercepteur, data est déjà propre
        updateAuth(data.user || data)
        return data
    }, [updateAuth])

    const logout = useCallback(async () => {
        const [, error] = await handle(authService.logout())
        if (error) console.error('Logout error:', error)
        updateAuth(null)
    }, [updateAuth])

    // 4. Mémorisation de la valeur du contexte
    const value = useMemo(() => {
        const hasUserData = user && (user.id || user.username || user.email)

        return {
            user: hasUserData ? user : null,
            loading,
            isAuthenticated: !!hasUserData,
            login,
            logout,
            setAuthData: updateAuth
        }

    }, [user, loading, login, logout, updateAuth])

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}