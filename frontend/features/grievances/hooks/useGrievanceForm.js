'use client';

/**
 * useGrievanceForm Hook
 * Handles form state and validation for grievance submission
 */

import { useState, useCallback } from 'react';
import { validateGrievanceForm } from '../utils/validation';

const initialFormData = {
    name: '',
    email: '',
    phone: '',
    category: '',
    description: '',
    location: '',
};

export function useGrievanceForm(onSubmit) {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (errors[id]) {
            setErrors((prev) => ({ ...prev, [id]: '' }));
        }
    }, [errors]);

    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault();

            // Validate form
            const validationErrors = validateGrievanceForm(formData);
            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                return;
            }

            setIsSubmitting(true);
            try {
                await onSubmit?.(formData);
                setFormData(initialFormData);
                setErrors({});
            } catch (error) {
                console.error('Form submission error:', error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [formData, onSubmit]
    );

    const resetForm = useCallback(() => {
        setFormData(initialFormData);
        setErrors({});
    }, []);

    return {
        formData,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        resetForm,
    };
}
