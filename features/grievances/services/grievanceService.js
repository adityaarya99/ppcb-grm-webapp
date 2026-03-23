/**
 * Grievance Service
 * API calls for grievance operations
 */

import { apiClient } from '@/services/api';

export const grievanceService = {
    /**
     * Get all grievances with optional filters
     */
    async getGrievances(filters = {}) {
        const params = new URLSearchParams(filters).toString();
        const url = params ? `/api/grievances?${params}` : '/api/grievances';
        return apiClient.get(url);
    },

    /**
     * Get a single grievance by ID
     */
    async getGrievanceById(id) {
        return apiClient.get(`/api/grievances/${id}`);
    },

    /**
     * Create a new grievance
     */
    async createGrievance(data) {
        return apiClient.post('/api/grievances', data);
    },

    /**
     * Update grievance status
     */
    async updateGrievanceStatus(id, status) {
        return apiClient.patch(`/api/grievances/${id}`, { status });
    },

    /**
     * Track grievance by reference number
     */
    async trackGrievance(referenceNumber) {
        return apiClient.get(`/api/grievances/track/${referenceNumber}`);
    },
};
