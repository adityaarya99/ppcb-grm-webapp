/**
 * GrievanceList Component
 * List display for grievances
 */

import GrievanceCard from './GrievanceCard';

export default function GrievanceList({ grievances = [], onGrievanceClick, emptyMessage = 'No grievances found' }) {
    if (grievances.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📭</div>
                <p className="text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {grievances.map((grievance) => (
                <GrievanceCard
                    key={grievance.id}
                    grievance={grievance}
                    onClick={onGrievanceClick}
                />
            ))}
        </div>
    );
}
