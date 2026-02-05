import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const isLightPage = location.pathname === '/book-meet';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            isLightPage 
                ? 'bg-black/80 border-b border-white/10 py-4' 
                : (scrolled ? 'bg-black/20 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6')
        } text-white`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center group">
                            <span className="inline-flex items-center px-3 py-1.5 border border-white/20 rounded font-bold tracking-tighter text-lg bg-white/5 transition-all group-hover:border-white/40">
                                <span className="text-white mr-1 text-xl font-black italic tracking-tighter">✓</span>
                                <span className="text-white">CRIVO</span> 
                                <span className="text-gray-400 ml-1">.COM</span>
                            </span>
                        </Link>
                    </div>


                    
                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center space-x-10">
                        {['HOME','PRODUCT', 'BLOGS', 'REACH US'].map((item) => (
                            <li key={item}>
                                <Link 
                                    to="/" 
                                    className="text-white/70 font-medium text-xs tracking-[0.2em] hover:text-white transition-all duration-300 relative group"
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link to="/book-meet">
                            <button className="relative group px-8 py-3 overflow-hidden rounded-full font-semibold text-xs tracking-widest transition-all border bg-white/20 text-white border-white hover:text-white">
                                <span className="relative z-10 uppercase">BOOK A MEET</span>
                                <div className="absolute inset-0 bg-black/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300"></div>
                            </button>
                        </Link>
                    </div>
                    
                    
                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 focus:outline-none text-white"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                                <span className={`w-full h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[-1] transition-all duration-500 md:hidden bg-black/95 backdrop-blur-2xl ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                    {['HOME','PRODUCT', 'BLOGS', 'REACH US'].map((item) => (
                        <Link 
                            key={item}
                            to="/" 
                            className="text-2xl font-bold tracking-tighter transition-colors text-white hover:text-gray-400"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Link to="/book-meet" className="w-full max-w-xs pt-4" onClick={() => setIsMenuOpen(false)}>
                        <button className="w-full font-bold py-4 rounded-full tracking-widest text-sm bg-white text-black">
                            BOOK A MEET
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
