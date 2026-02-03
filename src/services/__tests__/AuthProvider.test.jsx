
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../context/AuthContext.jsx';
import { AuthContext } from '../../context/AuthContextInstance.js';
import { authService } from '../../features/auth/services/authService.js';

// Mock du service
vi.mock('../../features/auth/services/authService');

describe('AuthProvider Logic Test', () => {
    it('doit mapper correctement le rôle ADMIN depuis la réponse API', async () => {
        const mockResponse = {
            user: { id: '123', username: 'admin_test', role: 'ADMIN' }
        };

        authService.me.mockResolvedValue(mockResponse);

        // On utilise une fonction de rendu personnalisée pour capturer les valeurs
        let capturedAuth = null;

        const TestConsumer = () => {
            const auth = React.useContext(AuthContext);
            // On utilise useEffect pour mettre à jour la variable externe proprement
            React.useEffect(() => {
                if (!auth.loading) {
                    capturedAuth = auth;
                }
            }, [auth]);
            return null;
        };

        render(
            <AuthProvider>
                <TestConsumer />
            </AuthProvider>
        );

        // On attend que l'initialisation soit finie
        await waitFor(() => expect(capturedAuth).not.toBeNull(), { timeout: 3000 });

        // Vérifications
        expect(capturedAuth.isAuthenticated).toBe(true);
        expect(capturedAuth.user.role).toBe('ADMIN');
    });
});