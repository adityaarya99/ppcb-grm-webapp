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
    // Build headers and body with FormData support
    const headers = { ...(options.headers || {}) };
    let body = options.body;

    // If body is a plain object (not FormData), stringify as JSON and set content-type
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    if (!isFormData && body && typeof body === 'object') {
        body = JSON.stringify(body);
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
    }

    const config = {
        ...options,
        headers,
        body,
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
        throw new ApiError(error.message || 'Network error', 0, null);
    }
}

/**
 * API Client with HTTP method helpers
 */
export const apiClient = {
    get: (url, options = {}) =>
        request(url, { ...options, method: 'GET' }),

    post: (url, data, options = {}) =>
        // Pass data as `body` and let `request` handle JSON vs FormData
        request(url, {
            ...options,
            method: 'POST',
            body: data,
        }),

    put: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: 'PUT',
            body: data,
        }),

    patch: (url, data, options = {}) =>
        request(url, {
            ...options,
            method: 'PATCH',
            body: data,
        }),

    delete: (url, options = {}) =>
        request(url, { ...options, method: 'DELETE' }),
};

export { ApiError };
