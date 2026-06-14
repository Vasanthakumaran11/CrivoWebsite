import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './footer';
import WhatWeDo from './WhatWeDo';
import Customers from './customers';
import Partners from './partners';

function Major() {
    const [showContent, setShowContent] = useState(false);

    const handleTimeUpdate = (event) => {
        if (event.target.currentTime > 3.5) {
            setShowContent(true);
        }
    };

    const handleVideoLoop = (event) => {
        const video = event.target;
        if (video.duration > 5) {
            video.currentTime = 4.5;
        } else {
            video.currentTime = 0;
        }
        video.play();
    };

    return (
        <div className="relative">
            {/* Hero Section with Video Background */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="fixed inset-0 -z-10 bg-black">
                    <video
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoLoop}
                        onTimeUpdate={handleTimeUpdate}
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/Digital%20globe.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black"></div>
                </div>

                <div
                    className={`max-w-7xl mx-auto px-6 text-center transition-all duration-1000 transform ${
                        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                >
                    {/* Keyword pills */}
                    <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
                        {['Digitalize', 'Engage', 'Automate'].map((kw, i) => (
                            <span key={i} className="px-4 py-1.5 border border-white/50 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-white/90 bg-white/10">
                                {kw}
                            </span>
                        ))}
                    </div>

                    <p className="text-white/80 text-sm font-bold uppercase tracking-[0.35em] mb-6">
                        Rise your Brand
                    </p>

                    <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter mb-10 drop-shadow-2xl max-w-5xl mx-auto">
                        Seamlessly blending technology with{' '}
                        <span className="text-white/70">Unparalleled Business Vision</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl font-body text-white/80 leading-relaxed mb-12">
                        Crafting intelligent solutions that combine innovation, technology, and vision for unmatched business transformation success.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/book-meet">
                            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">
                                BOOK A MEET
                            </button>
                        </Link>
                        <button
                            onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                            className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                        >
                            EXPLORE SOLUTIONS
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
            <Customers />

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Major;
