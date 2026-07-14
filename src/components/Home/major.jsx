import { Link,useNavigate } from 'react-router-dom';
import Footer from './footer';
import WhatWeDo from './WhatWeDo';
import Client from './Client';
import Partners from './partners';

function Major({ showContent = false }) {
    const navigate = useNavigate();
    return (
        <div className="relative">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">

                <div
                    className={`max-w-7xl mx-auto px-6 text-center transition-all duration-1000 transform ${
                        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Badge eyebrow */}
                    <div className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-5 py-2 mb-10 bg-white/[0.04] backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)] animate-pulse"></span>
                        <span className="text-white/60 text-[11px] font-semibold uppercase tracking-[0.4em]">Built With Purpose</span>
                    </div>

                    <h1 className="font-black leading-[0.95] tracking-[-0.03em] mb-8 max-w-4xl mx-auto">
                        <span className="block text-5xl md:text-7xl lg:text-[88px] text-white drop-shadow-[0_2px_40px_rgba(255,255,255,0.12)]">
                            Technology Built
                        </span>
                        <span className="block text-5xl md:text-7xl lg:text-[88px] text-white/70">
                            For What's Next.
                        </span>
                    </h1>

                    <p className="max-w-xl mx-auto text-base md:text-lg font-light text-white/50 leading-loose tracking-wide mb-14">
                        Precision-crafted products for smart infrastructure,
                        intelligent mobility and the brands that lead tomorrow.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/book-meet">
                            <button className="px-10 py-4 bg-white text-black text-sm font-bold rounded-full hover:scale-105 hover:shadow-[0_0_32px_rgba(255,255,255,0.25)] transition-all duration-300 tracking-widest">
                                BOOK A MEET
                            </button>
                        </Link>
                        <button
                            onClick={() => navigate('/product')}
                            className="px-10 py-4 border border-white/20 text-white/80 text-sm font-semibold rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 tracking-widest"
                        >
                            EXPLORE OUR PRODUCTS
                        </button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${showContent ? 'opacity-50' : 'opacity-0'}`}>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent"></div>
                </div>
            </section>

            {/* Content Sections */}
            <WhatWeDo />
            <Partners />
            <Client />

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Major;
