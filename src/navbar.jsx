import { useState, useEffect, startTransition } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, X } from 'lucide-react';
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
        startTransition(() => {
            setIsMenuOpen(false);
        });
    }, [location.pathname]);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const navBg = isBookMeet
        ? 'bg-black/80 py-4'
        : isLightNav
            ? `bg-[#F8F7F2]/95 backdrop-blur-xl border-b border-black/10 ${scrolled ? 'py-4 shadow-sm' : 'py-6'}`
            : scrolled
                ? 'bg-black/30 backdrop-blur-xl py-4'
                : 'bg-transparent py-6';

    const textColor = isLightNav ? 'text-[#111110]' : 'text-white';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${hidden ? '-translate-y-full' : 'translate-y-0'} ${navBg} ${textColor}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center">

                    {/* Logo */}
                    <div className="flex-1">
                        <Link to="/" className="flex items-center group">
                            <span className="font-bold tracking-tight text-2xl leading-none">CRIVO</span>
                        </Link>
                    </div>

                    {/* Desktop Nav — centered because both sides are flex-1 */}
                    <ul className="hidden md:flex items-center space-x-10">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    to={item.to}
                                    className={`font-medium text-xs tracking-[0.2em] transition-all duration-300 relative group flex items-center gap-1.5 ${
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

                    {/* Right side: theme toggle + CTA — flex-1 + justify-end mirrors the logo side */}
                    <div className="flex-1 hidden md:flex items-center justify-end gap-3">
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

            {/* Backdrop overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300 md:hidden ${
                    isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <div className={`fixed top-0 right-0 bottom-0 z-[70] w-full sm:w-[320px] h-screen transition-transform duration-300 ease-out md:hidden shadow-2xl flex flex-col ${
                isDark ? 'bg-[#0f0f0f] border-l border-white/10 text-white' : 'bg-[#F8F7F2] border-l border-black/10 text-[#111110]'
            } ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Sidebar Header */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-black/5 dark:border-white/5">
                    <Link to="/" className="flex items-center group" onClick={() => setIsMenuOpen(false)}>
                        <span className="font-bold tracking-tight text-lg leading-none">CRIVO</span>
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className={`p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
                            isDark ? 'text-white/70' : 'text-black/70'
                        }`}
                        aria-label="Close menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className="flex flex-col justify-between flex-1 p-6">
                    <div className="flex flex-col space-y-6 pt-4">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                onClick={() => setIsMenuOpen(false)}
                                className={`text-xl font-bold tracking-tight transition-colors py-2 border-b border-black/5 dark:border-white/5 flex items-center gap-2 ${
                                    isDark ? 'text-white hover:text-gray-400' : 'text-[#111110] hover:text-black/50'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="pt-6">
                        <Link to="/book-meet" className="w-full" onClick={() => setIsMenuOpen(false)}>
                            <button className={`w-full font-bold py-4 rounded-full tracking-widest text-sm transition-transform active:scale-95 ${
                                isDark ? 'bg-white text-black' : 'bg-[#111110] text-white'
                            }`}>
                                BOOK A MEET
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
