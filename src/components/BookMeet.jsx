import React from 'react';

const BookMeet = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start">
                
                {/* Left Side Content */}
                <div className="flex-1 space-y-8 pt-10">
                    <div className="inline-block px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                        Book a Meet
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-6xl font-black text-slate-900 leading-tight">
                            GET STARTED
                        </h1>
                        <h2 className="text-6xl font-black text-slate-300 leading-tight">
                            TODAY
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-md leading-relaxed">
                        This is the space to introduce the business and what it has to offer. Define the qualities and values that make it unique.
                    </p>
                </div>

                {/* Right Side Form */}
                <div className="flex-1 w-full max-w-xl bg-sky-50 rounded-3xl p-8 md:p-12 border border-sky-100 shadow-sm relative overflow-hidden">
                    <form className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">First name *</label>
                            <input 
                                type="text" 
                                className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Last name</label>
                            <input 
                                type="text" 
                                className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Work Email *</label>
                            <input 
                                type="email" 
                                className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 transition-all outline-none"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-slate-700">Profession *</label>
                            <div className="relative">
                                <select className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 transition-all outline-none appearance-none cursor-pointer">
                                    <option value="" disabled selected>Select Profession</option>
                                    <option>Founder / CEO</option>
                                    <option>Education Professional</option>
                                    <option>Student</option>
                                    <option>Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Schedule your Meet *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-slate-500">Day</span>
                                    <input type="text" placeholder="Day" className="w-full bg-white border-0 rounded-xl px-2 py-3 text-center focus:ring-2 focus:ring-sky-200 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-slate-500">Month</span>
                                    <div className="relative">
                                        <select className="w-full bg-white border-0 rounded-xl px-2 py-3 text-center focus:ring-2 focus:ring-sky-200 outline-none appearance-none cursor-pointer text-sm">
                                            <option>Month</option>
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
                                <div className="space-y-1">
                                    <span className="text-xs text-slate-500">Year</span>
                                    <input type="text" placeholder="Year" className="w-full bg-white border-0 rounded-xl px-2 py-3 text-center focus:ring-2 focus:ring-sky-200 outline-none" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-slate-500">Time</span>
                                    <input type="text" placeholder="HH:MM AM" className="w-full bg-white border-0 rounded-xl px-2 py-3 text-center focus:ring-2 focus:ring-sky-200 outline-none" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Reason *</label>
                            <textarea 
                                rows="4"
                                className="w-full bg-white border-0 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-200 transition-all outline-none resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-12 py-3 rounded-full shadow-lg transition-all hover:scale-105">
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
