import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="mb-8 md:mb-0">
                        <h2 className="text-white text-lg font-semibold mb-4">
                            Insight Diagnostic Center
                        </h2>
                        <p className="text-sm">
                            Providing accurate and timely diagnostic services to
                            help you make informed decisions about your health.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/book-test"
                                    className="hover:text-white transition-colors"
                                >
                                    Book a Test
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/get-report"
                                    className="hover:text-white transition-colors"
                                >
                                    Get Your Report
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="hover:text-white transition-colors"
                                >
                                    Our Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white transition-colors"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Contact Us
                        </h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <FaPhone className="w-4 h-4 mr-2" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="w-4 h-4 mr-2" />
                                <a
                                    href="mailto:info@insightdiagnostic.com"
                                    className="hover:text-white transition-colors"
                                >
                                    info@insightdiagnostic.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                                <span>
                                    123 Health St, Medical City, MC 12345
                                </span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                className="hover:text-white transition-colors"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                className="hover:text-white transition-colors"
                                aria-label="Instagram"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                className="hover:text-white transition-colors"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-sm text-center">
                    <p>
                        &copy; {new Date().getFullYear()} insight Diagnostic
                        Center. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
