'use client';

/**
 * useLocalStorage Hook
 * Persist state to localStorage with SSR safety
 */

import { useState, useEffect, useCallback } from 'react';

export function useLocalStorage(key, initialValue) {
    // State to store our value
    const [storedValue, setStoredValue] = useState(initialValue);
    const [isHydrated, setIsHydrated] = useState(false);

    // Hydrate from localStorage after mount
    useEffect(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
        }
        setIsHydrated(true);
    }, [key]);

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue = useCallback(
        (value) => {
            try {
                // Allow value to be a function so we have the same API as useState
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.warn(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.warn(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue, isHydrated];
}
