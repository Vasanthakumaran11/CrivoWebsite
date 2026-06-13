import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './context/ThemeContext';

const navLinks = [
    { label: 'PRODUCT', to: '/product' },
    { label: 'ABOUT US', to: '/about' },
    { label: 'BLOGS', to: '/blogs' },
    { label: 'REACH US', to: '/reach-us' },
];

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const location = useLocation();
    const { isDark, toggle } = useTheme();

    const isHome = location.pathname === '/';
    const isBookMeet = location.pathname === '/book-meet';
    // Light navbar: light mode on any page other than home (video bg) or book-meet
    const isLightNav = !isDark && !isHome && !isBookMeet;

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 20);
            setHidden(currentY > lastY && currentY > 80);
            lastY = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navBg = isBookMeet
        ? 'bg-black/80 border-b border-white/10 py-4'
        : isLightNav
            ? `bg-[#F8F7F2]/95 backdrop-blur-xl border-b border-black/10 ${scrolled ? 'py-4 shadow-sm' : 'py-6'}`
            : scrolled
                ? 'bg-black/20 backdrop-blur-xl border-b border-white/5 py-4'
                : 'bg-transparent py-6';

    const textColor = isLightNav ? 'text-[#111110]' : 'text-white';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${hidden ? '-translate-y-full' : 'translate-y-0'} ${navBg} ${textColor}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-base shrink-0 transition-all duration-300 ${
                                isLightNav
                                    ? 'border border-black/30 bg-black/8 text-[#111110] group-hover:bg-[#111110] group-hover:text-white'
                                    : 'border border-white/30 bg-white/10 text-white group-hover:bg-white group-hover:text-black'
                            }`}>
                                C
                            </div>
                            <span className="font-bold tracking-tight text-lg leading-none">CRIVO</span>
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <ul className="hidden md:flex items-center space-x-10">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className={`font-medium text-xs tracking-[0.2em] transition-all duration-300 relative group ${
                                        location.pathname === item.to
                                            ? isLightNav ? 'text-[#111110]' : 'text-white'
                                            : isLightNav ? 'text-black/50 hover:text-[#111110]' : 'text-white/70 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                    <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-300 ${
                                        isLightNav ? 'bg-[#111110]' : 'bg-white'
                                    } ${location.pathname === item.to ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Right side: theme toggle + CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggle}
                            aria-label="Toggle theme"
                            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isLightNav
                                    ? 'border border-black/15 bg-black/5 text-black/60 hover:bg-black/10 hover:text-[#111110]'
                                    : 'border border-white/15 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>

                        {/* CTA */}
                        <Link to="/book-meet">
                            <button className={`relative group px-8 py-3 overflow-hidden rounded-full font-semibold text-xs tracking-widest transition-all border ${
                                isLightNav
                                    ? 'bg-[#111110]/8 text-[#111110] border-[#111110]/30 hover:text-[#111110]'
                                    : 'bg-white/20 text-white border-white hover:text-white'
                            }`}>
                                <span className="relative z-10 uppercase">BOOK A MEET</span>
                                <div className={`absolute inset-0 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ${
                                    isLightNav ? 'bg-black/10' : 'bg-black/20'
                                }`}></div>
                            </button>
                        </Link>
                    </div>

                    {/* Mobile: toggle + hamburger */}
                    <div className="md:hidden flex items-center gap-2">
                        <button
                            onClick={toggle}
                            aria-label="Toggle theme"
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                isLightNav ? 'text-black/60' : 'text-white/60'
                            }`}
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-[2px] transition-all duration-300 ${isLightNav ? 'bg-[#111110]' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                                <span className={`w-full h-[2px] transition-all duration-300 ${isLightNav ? 'bg-[#111110]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-[2px] transition-all duration-300 ${isLightNav ? 'bg-[#111110]' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-[-1] transition-all duration-500 md:hidden ${
                isDark ? 'bg-black/95 backdrop-blur-2xl' : 'bg-[#F8F7F2]/98 backdrop-blur-2xl'
            } ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`text-2xl font-bold tracking-tighter transition-colors ${
                                isDark ? 'text-white hover:text-gray-400' : 'text-[#111110] hover:text-black/50'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link to="/book-meet" className="w-full max-w-xs pt-4">
                        <button className={`w-full font-bold py-4 rounded-full tracking-widest text-sm ${
                            isDark ? 'bg-white text-black' : 'bg-[#111110] text-white'
                        }`}>
                            BOOK A MEET
                        </button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
