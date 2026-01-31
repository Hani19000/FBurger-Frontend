import api from '../../../services/api';

export const authService = {
    login: (email, password) => api.post('/auth/login', { email, password }),

    register: (payload) => api.post('/auth/register', payload),

    logout: () => api.post('/auth/logout'),

    me: () => api.get('/auth/me'),
};