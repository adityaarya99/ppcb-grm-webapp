import { apiClient } from '@/services/api';
import { API_ROUTES } from '@/lib/apiRoutes';

export const authService = {
    /**
     * Login with username and password
     * @param {string} username
     * @param {string} password
     */
    async login({ username, password }) {
        return apiClient.post(API_ROUTES.AUTH.LOGIN, { username, password });
    },

    /**
     * Get current login session (returns user info if logged in)
     */
    async getSession() {
        return apiClient.get(API_ROUTES.AUTH.SESSION);
    },

    /**
     * Logout the current user and invalidate session on server
     */
    async logout() {
        return apiClient.post(API_ROUTES.AUTH.LOGOUT);
    },
};
