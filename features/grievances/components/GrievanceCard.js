/**
 * GrievanceCard Component
 * Display card for a single grievance
 */

import { Card } from '@/components/ui';

const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
};

const categoryIcons = {
    air: '💨',
    water: '💧',
    noise: '🔊',
    waste: '🗑️',
    other: '📋',
};

export default function GrievanceCard({ grievance, onClick }) {
    const {
        id,
        title,
        description,
        category,
        status,
        createdAt,
        location,
    } = grievance;

    return (
        <Card
            variant="default"
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onClick?.(grievance)}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{categoryIcons[category] || '📋'}</span>
                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                            {title}
                        </h3>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <span
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status] || statusColors.pending
                            }`}
                    >
                        {status}
                    </span>
                    <span className="text-xs text-gray-400">#{id}</span>
                </div>
            </div>
        </Card>
    );
}
