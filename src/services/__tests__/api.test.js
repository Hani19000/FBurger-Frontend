import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { executeLogout } from '../../utils/authActions.js'

// Mocks
vi.mock('axios')
vi.mock('react-hot-toast')
vi.mock('../../utils/authActions.js')

describe('API Interceptors', () => {
    let mockCreate
    let successHandler
    let errorHandler

    beforeEach(() => {
        vi.clearAllMocks()

        // Setup du mock axios.create
        mockCreate = vi.fn(() => ({
            interceptors: {
                response: {
                    use: vi.fn((success, error) => {
                        successHandler = success
                        errorHandler = error
                    })
                }
            }
        }))

        axios.create = mockCreate

        // Recharger le module pour appliquer les mocks
        vi.resetModules()
    })

    describe('Response Success Interceptor', () => {
        it('devrait retourner response.data.data si présent', async () => {
            await import('../api.js')

            const mockResponse = {
                data: {
                    data: { user: 'John' }
                }
            }

            const result = successHandler(mockResponse)
            expect(result).toEqual({ user: 'John' })
        })

        it('devrait retourner response.data si data.data absent', async () => {
            await import('../api.js')

            const mockResponse = {
                data: { user: 'Jane' }
            }

            const result = successHandler(mockResponse)
            expect(result).toEqual({ user: 'Jane' })
        })
    })

    describe('Response Error Interceptor - Neutralisation', () => {
        it('devrait retourner null pour 401 sur /auth/me', async () => {
            await import('../api.js')

            const mockError = {
                response: {
                    status: 401,
                    config: { url: '/auth/me' },
                    data: {}
                }
            }

            const result = await errorHandler(mockError)
            expect(result).toBeNull()
        })

        it('devrait retourner [] pour 404 sur /review', async () => {
            await import('../api.js')

            const mockError = {
                response: {
                    status: 404,
                    config: { url: '/review' },
                    data: {}
                }
            }

            const result = await errorHandler(mockError)
            expect(result).toEqual([])
        })
    })

    describe('Response Error Interceptor - Status Codes', () => {
        it('devrait afficher un toast pour erreur 400', async () => {
            await import('../api.js')

            const mockError = {
                response: {
                    status: 400,
                    config: { url: '/api/test' },
                    data: { message: 'Données invalides' }
                }
            }

            try {
                await errorHandler(mockError)
            } catch {
                expect(toast.error).toHaveBeenCalledWith('Données invalides')
            }
        })

        it('devrait exécuter logout pour erreur 401', async () => {
            await import('../api.js')

            const mockError = {
                response: {
                    status: 401,
                    config: { url: '/api/protected' },
                    data: {}
                }
            }

            try {
                await errorHandler(mockError)
            } catch {
                expect(executeLogout).toHaveBeenCalled()
                expect(toast.error).toHaveBeenCalledWith('Session expirée')
            }
        })

        it('devrait afficher "Accès refusé" pour erreur 403', async () => {
            await import('../api.js')

            const mockError = {
                response: {
                    status: 403,
                    config: { url: '/api/admin' },
                    data: {}
                }
            }

            try {
                await errorHandler(mockError)
            } catch {
                expect(toast.error).toHaveBeenCalledWith('Accès refusé')
            }
        })

        it('devrait afficher "Serveur hors ligne" si pas de response', async () => {
            await import('../api.js')

            const mockError = {
                response: null
            }

            try {
                await errorHandler(mockError)
            } catch {
                expect(toast.error).toHaveBeenCalledWith('Serveur hors ligne')
            }
        })
    })
})