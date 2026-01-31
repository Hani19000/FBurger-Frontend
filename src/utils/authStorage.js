export const authStorage = {
    save: (user, token) => {
        if (token) localStorage.setItem('accessToken', token);
        if (user) localStorage.setItem('user', JSON.stringify(user));
    },
    clear: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    },
    get: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        token: localStorage.getItem('accessToken')
    })
};