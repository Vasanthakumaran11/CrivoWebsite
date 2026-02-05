import React from 'react';

const BookMeet = () => {
    return (
        <div className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
                
                {/* Left Side Content */}
                <div className="flex-1 space-y-10 pt-10">
                    <div className="inline-block px-4 py-1.5 border-2 border-black text-black rounded-full text-xs font-bold uppercase tracking-wider">
                        Book a Meet
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-7xl md:text-8xl font-black text-black leading-[0.9] tracking-tighter">
                            GET STARTED
                        </h1>
                        <h2 className="text-7xl md:text-8xl font-black text-gray-600 leading-[0.9] tracking-tighter">
                            TODAY
                        </h2>
                    </div>
                    <p className="text-black text-xl max-w-md leading-relaxed font-medium">
                        Elevate your vision with our expert guidance. Let's discuss how we can transform your ideas into reality.
                    </p>
                    <div className="h-1 w-20 bg-black"></div>
                </div>

                {/* Right Side Form */}
                <div className="flex-1 w-full max-w-xl bg-white rounded-[2rem] p-8 md:p-12 border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                    <form className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black">Name *</label>
                            <input 
                                type="text" 
                                placeholder="Your Name"
                                className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 focus:ring-0 focus:border-black transition-all outline-none text-black font-medium"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black">Work Email *</label>
                            <input 
                                type="email" 
                                placeholder="name@company.com"
                                className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 focus:ring-0 focus:border-black transition-all outline-none text-black font-medium"
                            />
                        </div>

                        <div className="space-y-3 relative">
                            <label className="text-xs font-black uppercase tracking-widest text-black">Profession *</label>
                            <div className="relative">
                                <select className="w-full bg-white border-2 border-black rounded-xl px-4 py-4 focus:ring-0 focus:border-black transition-all outline-none appearance-none cursor-pointer text-black font-medium">
                                    <option value="" disabled selected>Select Profession</option>
                                    <option>Founder / CEO</option>
                                    <option>Education Professional</option>
                                    <option>Student</option>
                                    <option>Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black">Schedule your Meet *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 uppercase">Day</span>
                                    <input type="text" placeholder="DD" className="w-full bg-white border-2 border-black rounded-xl px-2 py-4 text-center focus:ring-0 focus:border-black outline-none text-black font-bold" />
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 uppercase">Month</span>
                                    <div className="relative h-full">
                                        <select className="w-full h-full bg-white border-2 border-black rounded-xl px-2 py-4 text-center focus:ring-0 focus:border-black outline-none appearance-none cursor-pointer text-sm font-bold text-black">
                                            <option>MM</option>
                                            <option>Jan</option>
                                            <option>Feb</option>
                                            <option>Mar</option>
                                            <option>Apr</option>
                                            <option>May</option>
                                            <option>Jun</option>
                                            <option>Jul</option>
                                            <option>Aug</option>
                                            <option>Sep</option>
                                            <option>Oct</option>
                                            <option>Nov</option>
                                            <option>Dec</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 uppercase">Year</span>
                                    <input type="text" placeholder="YYYY" className="w-full bg-white border-2 border-black rounded-xl px-2 py-4 text-center focus:ring-0 focus:border-black outline-none text-black font-bold" />
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 uppercase">Time</span>
                                    <input type="text" placeholder="00:00" className="w-full bg-white border-2 border-black rounded-xl px-2 py-4 text-center focus:ring-0 focus:border-black outline-none text-black font-bold" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black">Reason *</label>
                            <textarea 
                                rows="4"
                                placeholder="Tell us about your project..."
                                className="w-full bg-white border-2 border-black rounded-2xl px-4 py-4 focus:ring-0 focus:border-black transition-all outline-none resize-none text-black font-medium"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="w-full font-black py-5 rounded-full tracking-[0.2em] text-sm bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all duration-300 transform active:scale-95 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]">
                                BOOK A MEET
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default BookMeet;
