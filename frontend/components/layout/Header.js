'use client';

/**
 * Header Component
 * Main navigation header
 */

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">PPCB GRM</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-primary transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/grievances"
                            className="text-gray-600 hover:text-primary transition-colors"
                        >
                            Grievances
                        </Link>
                        <Link
                            href="/track"
                            className="text-gray-600 hover:text-primary transition-colors"
                        >
                            Track Status
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-primary transition-colors"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="md:hidden py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-3">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link
                                href="/grievances"
                                className="text-gray-600 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Grievances
                            </Link>
                            <Link
                                href="/track"
                                className="text-gray-600 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Track Status
                            </Link>
                            <Link
                                href="/contact"
                                className="text-gray-600 hover:text-primary transition-colors py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
