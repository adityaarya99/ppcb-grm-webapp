/**
 * API Routes
 * Centralized list of backend endpoints to keep routes consistent and scalable.
 */

export const API_ROUTES = {
    GRIEVANCES: {
        SUBMIT: '/grievances/submit',
        BASE: '/grievances',
    },
    AUTH: {
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        SESSION: '/public/login-session',
    },
};

export default API_ROUTES;
