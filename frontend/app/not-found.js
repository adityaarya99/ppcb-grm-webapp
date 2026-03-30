/**
 * Not Found Component
 * Shows 404 UI when page is not found
 */

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="text-center max-w-md">
                <div className="text-8xl font-bold text-primary mb-4">404</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Page Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
