"use client";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchSession } from '@/features/auth';

/**
 * RequireAuth
 * Wraps protected pages/components. Redirects to /login if not authenticated.
 */
export default function RequireAuth({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        // On mount, check session if not already authenticated
        if (!isAuthenticated) {
            dispatch(fetchSession());
        }
    }, [dispatch, isAuthenticated]);

    useEffect(() => {
        // If not loading and not authenticated, redirect
        if (!loading && !isAuthenticated) {
            router.replace('/login');
        }
    }, [loading, isAuthenticated, router]);

    // Optionally show a loading spinner while checking session
    if (loading) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner-border text-primary" role="status" style={{ width: 60, height: 60 }}>
                    <span className="visually-hidden">Checking authentication...</span>
                </div>
            </div>
        );
    }

    // Only render children if authenticated
    return isAuthenticated ? children : null;
}
