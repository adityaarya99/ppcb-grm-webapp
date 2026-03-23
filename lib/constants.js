/**
 * Constants
 * Application-wide constants
 */

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Grievance Categories
export const GRIEVANCE_CATEGORIES = [
    { value: 'air', label: 'Air Pollution', icon: '💨' },
    { value: 'water', label: 'Water Pollution', icon: '💧' },
    { value: 'noise', label: 'Noise Pollution', icon: '🔊' },
    { value: 'waste', label: 'Waste Management', icon: '🗑️' },
    { value: 'other', label: 'Other', icon: '📋' },
];

// Grievance Statuses
export const GRIEVANCE_STATUSES = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
};

export const STATUS_LABELS = {
    [GRIEVANCE_STATUSES.PENDING]: 'Pending',
    [GRIEVANCE_STATUSES.IN_PROGRESS]: 'In Progress',
    [GRIEVANCE_STATUSES.RESOLVED]: 'Resolved',
    [GRIEVANCE_STATUSES.REJECTED]: 'Rejected',
};

// Status Colors (Tailwind classes)
export const STATUS_COLORS = {
    [GRIEVANCE_STATUSES.PENDING]: 'bg-yellow-100 text-yellow-800',
    [GRIEVANCE_STATUSES.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
    [GRIEVANCE_STATUSES.RESOLVED]: 'bg-green-100 text-green-800',
    [GRIEVANCE_STATUSES.REJECTED]: 'bg-red-100 text-red-800',
};

// Validation
export const VALIDATION = {
    NAME_MIN_LENGTH: 2,
    NAME_MAX_LENGTH: 100,
    DESCRIPTION_MIN_LENGTH: 20,
    DESCRIPTION_MAX_LENGTH: 2000,
    PHONE_REGEX: /^[0-9]{10}$/,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

// Routes
export const ROUTES = {
    HOME: '/',
    GRIEVANCES: '/grievances',
    GRIEVANCE_NEW: '/grievances/new',
    TRACK: '/track',
    CONTACT: '/contact',
    FAQ: '/faq',
    ADMIN: '/admin',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    USER_PREFERENCES: 'ppcb-grm-user-prefs',
    RECENT_SEARCHES: 'ppcb-grm-recent-searches',
    DRAFT_GRIEVANCE: 'ppcb-grm-draft-grievance',
};

// Toast/Notification Types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};
