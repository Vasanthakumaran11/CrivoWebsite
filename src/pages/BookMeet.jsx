import React from 'react';

const BookMeet = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-20 px-6 transition-colors duration-300">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">

                {/* Left Side Content */}
                <div className="flex-1 space-y-10 pt-10">
                    <div className="inline-block px-4 py-1.5 border-2 border-black dark:border-white/30 text-black dark:text-white rounded-full text-xs font-bold uppercase tracking-wider">
                        Book a Meet
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-7xl md:text-8xl font-black text-black dark:text-white leading-[0.9] tracking-tighter">
                            GET STARTED
                        </h1>
                        <h2 className="text-7xl md:text-8xl font-black text-gray-300 dark:text-gray-600 leading-[0.9] tracking-tighter">
                            TODAY
                        </h2>
                    </div>
                    <p className="text-black/70 dark:text-white/60 text-xl max-w-md leading-relaxed font-medium">
                        Elevate your vision with our expert guidance. Let's discuss how we can transform your ideas into reality.
                    </p>
                    <div className="h-1 w-20 bg-black dark:bg-white"></div>
                </div>

                {/* Right Side Form */}
                <div className="flex-1 w-full max-w-xl bg-white dark:bg-white/5 rounded-[2rem] p-8 md:p-12 border-2 border-black dark:border-white/10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)] relative overflow-hidden">
                    <form className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Name *</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full bg-white dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-4 py-4 focus:ring-0 focus:border-black dark:focus:border-white/40 transition-all outline-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Work Email *</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full bg-white dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-4 py-4 focus:ring-0 focus:border-black dark:focus:border-white/40 transition-all outline-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-3 relative">
                            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Profession *</label>
                            <div className="relative">
                                <select className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-4 py-4 focus:ring-0 transition-all outline-none appearance-none cursor-pointer text-black dark:text-white font-medium bg-transparent dark:bg-black">
                                    <option value="" defaultChecked className="text-black dark:text-white/20 bg-white dark:bg-[#050505]">Select Profession</option>
                                    <option className="text-black dark:text-white bg-white dark:bg-[#050505]">Founder / CEO</option>
                                    <option className="text-black dark:text-white bg-white dark:bg-[#050505]">Education Professional</option>
                                    <option className="text-black dark:text-white bg-white dark:bg-[#050505]">Student</option>
                                    <option className="text-black dark:text-white bg-white dark:bg-[#050505]">Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-white/50">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Schedule your Meet *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Day</span>
                                    <input type="text" placeholder="DD" className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold placeholder:text-black/30 dark:placeholder:text-white/20" />
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Month</span>
                                    <div className="relative h-full">
                                        <select className="w-full h-full dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-2 py-4 text-center focus:ring-0 outline-none appearance-none cursor-pointer text-sm font-bold text-black dark:text-white">
                                            <option className="text-black dark:text-white bg-white dark:bg-[#050505]">MM</option>
                                            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(m => <option key={m} className="text-black dark:text-white bg-white dark:bg-[#050505]">{m}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Year</span>
                                    <input type="text" placeholder="YYYY" className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold placeholder:text-black/30 dark:placeholder:text-white/20" />
                                </div>
                                <div className="grid grid-rows-[auto_1fr] gap-2">
                                    <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Time</span>
                                    <input type="text" placeholder="00:00" className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold placeholder:text-black/30 dark:placeholder:text-white/20" />
                                </div>
                                
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Reason *</label>
                            <textarea
                                rows="4"
                                placeholder="Tell us about your project..."
                                className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-2xl px-4 py-4 focus:ring-0 transition-all outline-none resize-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="w-full font-black py-5 rounded-full tracking-[0.2em] text-sm bg-black dark:bg-white text-white dark:text-black hover:opacity-90 border-2 border-black dark:border-white transition-all duration-300 transform active:scale-95">
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
