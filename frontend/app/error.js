'use client';

/**
 * Error Component
 * Shows error UI when an error occurs
 */

export default function Error({ error, reset }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-md">
                <div className="text-6xl mb-4">⚠️</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 mb-6">
                    {error?.message || 'An unexpected error occurred'}
                </p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
