/**
 * API Client
 * Base HTTP client for API calls
 */

import { API_BASE_URL } from '@/lib/constants';

class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

/**
 * Base fetch wrapper with error handling
 */
async function request(url, options = {}) {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${url}`, config);

        // Handle non-JSON responses
        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');
        const data = isJson ? await response.json() : await response.text();

        if (!response.ok) {
            throw new ApiError(
                data?.message || data?.error || 'An error occurred',
                response.status,
                data
            );
        }

        return data;
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        // Network or other errors
        throw new ApiError(
            error.message || 'Network error',
            0,
            null
        );
    }
}

/**
 * API Client with HTTP method helpers
 */
export const apiClient = {
    get: (url, options = {}) =>
        request(url, { ...options, method: 'GET' }),

    post: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        }),

    put: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data),
        }),

    patch: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    delete: (url, options = {}) =>
        request(url, { ...options, method: 'DELETE' }),
};

export { ApiError };
