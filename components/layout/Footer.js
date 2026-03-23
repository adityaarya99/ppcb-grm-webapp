/**
 * Footer Component
 * Main footer with links and information
 */

import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-white text-xl font-bold mb-4">PPCB GRM Portal</h3>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Punjab Pollution Control Board - Grievance Redressal Mechanism.
                            Serving citizens with transparency and efficiency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/grievances" className="hover:text-white transition-colors">
                                    File Grievance
                                </Link>
                            </li>
                            <li>
                                <Link href="/track" className="hover:text-white transition-colors">
                                    Track Status
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>Punjab Pollution Control Board</li>
                            <li>Patiala, Punjab</li>
                            <li>Email: grm@ppcb.gov.in</li>
                            <li>Phone: 1800-XXX-XXXX</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        © {currentYear} Punjab Pollution Control Board. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
