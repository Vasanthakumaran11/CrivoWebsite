import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-black  border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-white text-2xl font-bold tracking-widest">
                            CRIVO TECH
                        </Link>
                    </div>

                   
                    <ul className="hidden md:flex items-center space-x-12">
                        <li>
                            <Link 
                                to="/" 
                                className="text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                            >
                                PRODUCT
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                            >
                                ABOUT US
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                            >
                                BLOGS
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to="/" 
                                className="text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                            >
                                REACH US
                            </Link>
                        </li>
                    </ul>

                    {/* CTA Button - Desktop */}
                    <div className="hidden md:block">
                        <Link to="/book-meet">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl">
                                BOOK A MEET
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="text-white hover:text-gray-300 focus:outline-none text-2xl"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="px-6 py-4 space-y-4 bg-gray-900">
                    <Link 
                        to="/" 
                        className="block text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 py-2 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        PRODUCT
                    </Link>
                    <Link 
                        to="/" 
                        className="block text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 py-2 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ABOUT US
                    </Link>
                    <Link 
                        to="/" 
                        className="block text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 py-2 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        BLOGS
                    </Link>
                    <Link 
                        to="/" 
                        className="block text-white font-medium text-sm tracking-wide hover:text-gray-300 transition-all duration-200 py-2 hover:underline hover:decoration-red-500 hover:underline-offset-8"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        REACH US
                    </Link>
                    <Link to="/book-meet" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg text-sm tracking-wide transition-all duration-200 shadow-lg">
                            BOOK A MEET
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;