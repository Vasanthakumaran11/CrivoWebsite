import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Product', to: '/product' },
  { label: 'About Us', to: '/about' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Reach Us', to: '/reach-us' },
];

const solutions = [
  'Crivo CSMS',
  'Smart EV Trip Planner'
];

const socials = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/crivo_tech_?igsh=bnB6ZTVua3RuZ2dk',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/crivo-tech/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect width="4" height="12" x="2" y="9"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/Crivo_Tech',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#0d0d0d] text-white px-6 md:px-12 py-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/3 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between mb-20 border-t border-white/10 pt-16">

          <div className="lg:w-2/3">
            <div className="mb-10">
              <div className="inline-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-black text-white text-base shrink-0">
                  C
                </div>
                <span className="font-bold text-white tracking-tight text-xl leading-none">CRIVO</span>
              </div>
            </div>

            <h2 className="text-5xl md:text-7xl font-semibold mb-12 leading-[1.1] tracking-tight max-w-2xl">
              Get Ready to <br /> Grow Your Business
            </h2>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="mailto:info@crivo.in" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all group">
                <span className="text-lg">info@crivo.in</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
              <a href="tel:+919600760063" className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all group">
                <span className="text-lg">+91 96007 60063</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:w-1/3 mt-16 lg:mt-0 flex gap-12 md:gap-24 lg:justify-end border-l border-white/10 lg:pl-20">
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                {navLinks.map((l) => (
                  <li key={l.label}><Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link></li>
                ))}
                <li><Link to="/book-meet" className="hover:text-white transition-colors">Book a Meet</Link></li>
                <li><Link to="/apply" className="hover:text-white transition-colors">Apply to Join</Link></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50">Products</h3>
              <ul className="space-y-4 text-gray-400">
                {solutions.map((s) => (
                  <li key={s}><Link to="/product" className="hover:text-white transition-colors">{s}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">©  2026 By Crivo. All Rights Reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
            <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility Statement</Link>
          </div>
          <p className="text-gray-500 text-sm"> Made by Crivo</p>
        </div>
      </div>
    </footer>
  );
}
