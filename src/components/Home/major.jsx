import { useState } from 'react';
import Footer from './footer';
import Partners from './partners';
import Customers from './customers';
import WhatAndWhy from './What&Why';

function Major() {
    const [showContent, setShowContent] = useState(false);

    const handleTimeUpdate = (event) => {
        // Show content precisely when video hits 3.5s (syncs with globe settling)
        if (event.target.currentTime > 3.5) {
            setShowContent(true);
        }
    };

    const handleVideoLoop = (event) => {
        const video = event.target;
        // Loop from 4.5s to end to maximize the smooth rotation phase
        // This avoids replaying the intro (0-4s) but uses the full remaining duration
        if (video.duration > 5) {
            video.currentTime = 4.5;
        } else {
            video.currentTime = 0;
        }
        video.play();
    };

    return (
        <>
            {/* Background Video */}
            <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
                <video
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoLoop}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover opacity-90"
                >
                    <source src="/Digital%20globe.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Subtle overlay for text readability */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Main Content */}
            <div 
                className={`min-h-screen flex items-center justify-center transition-opacity duration-1000 ${
                    showContent ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div className="px-4 max-w-7xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-300 text-center leading-tight drop-shadow-lg">
                        Seamlessly blending technology with Unparalleled Business vision
                    </h1>
                    <div className="py-20">
                        <h4 className='text-white text-center text-2xl font-bold'>
                            Crafting intelligent solutions that combine innovation, technology, and vision for unmatched business transformation success.
                        </h4>
                    </div>  
                    <div className="flex justify-center">
                         <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            BOOK A MEET
                        </button>
                    </div>
                </div>
            </div>

            {/* Partners Section - Only show when content is visible */}
            <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <Partners />
                <Customers />
                <WhatAndWhy />
            </div>

            

            {/* Footer - Only show when content is visible */}
            <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                <Footer />
            </div>
        </>
    );
}

export default Major;
