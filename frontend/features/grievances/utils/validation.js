/**
 * Grievance Form Validation
 */

export function validateGrievanceForm(formData) {
    const errors = {};

    // Name validation
    if (!formData.name?.trim()) {
        errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email?.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }

    // Phone validation
    if (!formData.phone?.trim()) {
        errors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        errors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Category validation
    if (!formData.category) {
        errors.category = 'Please select a category';
    }

    // Description validation
    if (!formData.description?.trim()) {
        errors.description = 'Description is required';
    } else if (formData.description.trim().length < 20) {
        errors.description = 'Description must be at least 20 characters';
    }

    // Location validation
    if (!formData.location?.trim()) {
        errors.location = 'Location is required';
    }

    return errors;
}

/**
 * Validate tracking number format
 */
export function validateTrackingNumber(trackingNumber) {
    if (!trackingNumber?.trim()) {
        return 'Tracking number is required';
    }
    // Example format: GRV-2026-XXXXX
    if (!/^GRV-\d{4}-[A-Z0-9]{5}$/i.test(trackingNumber.trim())) {
        return 'Invalid tracking number format';
    }
    return null;
}
