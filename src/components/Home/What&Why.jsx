import React from 'react';

const WhatAndWhy = () => {
    return (
        <section className="py-24 bg-white/80">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-5xl md:text-7xl font-bold mb-8">
                    <span className="text-black/80">What</span> <span className="text-black">We Do</span>
                </h2>
                <div className="max-w-3xl mx-auto mb-16">
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Building digital ecosystems with dynamic websites, intuitive apps, IoT automation solutions, and comprehensive marketing strategies that spark growth.
                    </p>
                </div>
                <div className="flex justify-center mb-16">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-bold tracking-wide transition-all hover:scale-105 active:scale-95 shadow-lg hover:shadow-orange-500/20">
                        Learn More
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 mt-16">
                <div className="grid grid-cols-12 gap-6">
                    {/* Web Development Card */}
                    <div className="col-span-12 md:col-span-5 bg-[#0D0D0D] rounded-[2.5rem] overflow-hidden flex flex-col h-[550px] group transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 border border-white/5">
                        <div className="p-10 space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Web Development</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Crafting responsive, dynamic websites that engage and convert.
                            </p>
                        </div>
                        <div className="mt-auto px-6 pb-6 relative">
                            <div className="rounded-2xl overflow-hidden relative h-[300px]">
                                <img 
                                    src="/web_dev_card_img_1769869662526.png" 
                                    alt="Web Development" 
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4 bg-[#1A1A1A]/80 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48l3.48-5.32c.32-.48.52-1.04.52-1.66 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .62.2 1.18.52 1.66l3.48 5.32z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile App Development Card */}
                    <div className="col-span-12 md:col-span-7 rounded-[2.5rem] overflow-hidden relative h-[550px] group transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 border border-white/5">
                        <img 
                            src="/mobile_app_dev_card_img_1769869678994.png" 
                            alt="Mobile App Development" 
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                        <div className="relative p-10 space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Mobile App Development</h3>
                            <p className="text-gray-200 text-lg leading-relaxed max-w-md">
                                Creating intuitive, high-performance mobile apps for seamless experiences.
                            </p>
                        </div>
                    </div>

                    {/* IoT & Automation Card */}
                    <div className="col-span-12 md:col-span-7 rounded-[2.5rem] overflow-hidden relative h-[550px] group transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 border border-white/5">
                        <img 
                            src="/iot_automation_card_img_1769869705518.png" 
                            alt="IoT & Automation" 
                            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent"></div>
                        <div className="relative p-10 space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">IoT & Automation</h3>
                            <p className="text-gray-200 text-lg leading-relaxed max-w-md">
                                Smart solutions that bridge the physical and digital worlds.
                            </p>
                        </div>
                    </div>

                    {/* Digital Marketing Card */}
                    <div className="col-span-12 md:col-span-5 bg-[#0D0D0D] rounded-[2.5rem] overflow-hidden flex flex-col h-[550px] group transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 border border-white/5">
                        <div className="p-10 space-y-4">
                            <h3 className="text-3xl md:text-4xl font-bold text-white">Digital Marketing</h3>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Strategies that spark growth and amplify your brand's reach.
                            </p>
                        </div>
                        <div className="mt-auto px-6 pb-6">
                            <div className="rounded-2xl overflow-hidden h-[300px]">
                                <img 
                                    src="/marketing_card_img_1769869727277.png" 
                                    alt="Digital Marketing" 
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Chat Button */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <button className="bg-[#FF4D1C] hover:bg-[#FF3D0C] text-white px-6 py-3 rounded-full flex items-center space-x-3 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                    </svg>
                    <span className="font-bold tracking-wide">Let's Chat!</span>
                </button>
            </div>
        </section>
    );
};

export default WhatAndWhy;