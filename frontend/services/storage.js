/**
 * Storage Service
 * Handles localStorage and sessionStorage operations with SSR safety
 */

const isClient = typeof window !== 'undefined';

export const storageService = {
    /**
     * Get item from localStorage
     */
    get(key, defaultValue = null) {
        if (!isClient) return defaultValue;
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    /**
     * Set item in localStorage
     */
    set(key, value) {
        if (!isClient) return;
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn('localStorage set error:', error);
        }
    },

    /**
     * Remove item from localStorage
     */
    remove(key) {
        if (!isClient) return;
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.warn('localStorage remove error:', error);
        }
    },

    /**
     * Clear all localStorage
     */
    clear() {
        if (!isClient) return;
        try {
            localStorage.clear();
        } catch (error) {
            console.warn('localStorage clear error:', error);
        }
    },

    /**
     * Session storage operations
     */
    session: {
        get(key, defaultValue = null) {
            if (!isClient) return defaultValue;
            try {
                const item = sessionStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch {
                return defaultValue;
            }
        },

        set(key, value) {
            if (!isClient) return;
            try {
                sessionStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.warn('sessionStorage set error:', error);
            }
        },

        remove(key) {
            if (!isClient) return;
            try {
                sessionStorage.removeItem(key);
            } catch (error) {
                console.warn('sessionStorage remove error:', error);
            }
        },

        clear() {
            if (!isClient) return;
            try {
                sessionStorage.clear();
            } catch (error) {
                console.warn('sessionStorage clear error:', error);
            }
        },
    },
};
