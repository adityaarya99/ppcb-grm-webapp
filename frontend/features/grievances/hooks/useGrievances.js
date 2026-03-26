'use client';

/**
 * useGrievances Hook
 * Handles fetching and managing grievances data
 */

import { useState, useEffect, useCallback } from 'react';
import { grievanceService } from '../services/grievanceService';

export function useGrievances(filters = {}) {
    const [grievances, setGrievances] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGrievances = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await grievanceService.getGrievances(filters);
            setGrievances(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch grievances');
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchGrievances();
    }, [fetchGrievances]);

    const submitGrievance = useCallback(async (grievanceData) => {
        const newGrievance = await grievanceService.createGrievance(grievanceData);
        setGrievances((prev) => [newGrievance, ...prev]);
        return newGrievance;
    }, []);

    return {
        grievances,
        isLoading,
        error,
        refetch: fetchGrievances,
        submitGrievance,
    };
}
