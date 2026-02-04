export default function Footer() {
  return (
    <footer className="relative z-10 bg-black/30 text-white px-6 md:px-12 py-16 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full -mr-64 -mt-64"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between mb-20 border-t border-white/10 pt-16">
          
          {/* Left: Headline & Brand */}
          <div className="lg:w-2/3">
            <div className="mb-10">
              <span className="inline-flex items-center px-4 py-2 border border-white/20 rounded font-bold tracking-tighter text-xl">
                <span className="text-white mr-1 text-2xl font-black italic tracking-tighter">✓</span>
                CRIVO <span className="text-gray-300">.COM</span>
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-semibold mb-12 leading-[1.1] tracking-tight max-w-2xl">
              Get Ready to <br /> Grow Your Business
            </h2>

            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:info@crivo.in" 
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <span className="text-lg">info@crivo.in</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
              
              <a 
                href="tel:+919384290323" 
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all group"
              >
                <span className="text-lg">+91 93842 90323</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Links */}
          <div className="lg:w-1/3 mt-16 lg:mt-0 flex gap-12 md:gap-24 lg:justify-end border-l border-white/10 lg:pl-20">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Services</h3>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Website Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">App Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Website Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            © 2025 Crivo Tech. All Rights Reserved.
          </p>
          
          <div className="flex gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms & Condition</a>
          </div>

          <p className="text-gray-400 text-sm">
            Made with <span className="text-yellow-500"></span> by Crivo Team
          </p>
        </div>
      </div>

    </footer>
  );
}
