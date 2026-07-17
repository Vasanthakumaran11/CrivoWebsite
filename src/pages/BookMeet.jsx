import { useState } from 'react';
import { canSubmit, recordSubmit, secondsUntilNextSubmit } from '../utils/formSecurity';
import { useBookMeetPage } from '../hooks/useBookMeetPage';

const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FORM_KEY = 'bookmeet';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const PROFESSIONS = ['Founder / CEO','Education Professional','Student','Other'];
const EMPTY = { name: '', email: '', profession: '', day: '', month: '', year: '', time: '', reason: '' };
const CURRENT_YEAR = new Date().getFullYear();

const inputClass = 'w-full bg-white dark:bg-black border-2 border-black dark:border-white/20 rounded-xl px-4 py-4 focus:ring-0 focus:border-black dark:focus:border-white/40 transition-all outline-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20';
const errInputClass = 'w-full bg-white dark:bg-black border-2 border-red-500 rounded-xl px-4 py-4 focus:ring-0 outline-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20 transition-all';

function validate(form) {
  const errs = {};
  const day = parseInt(form.day, 10);
  const year = parseInt(form.year, 10);

  if (!form.day || isNaN(day) || day < 1 || day > 31)
    errs.day = 'Enter a valid day (1–31)';
  if (!form.month)
    errs.month = 'Select a month';
  if (!form.year || isNaN(year) || year < CURRENT_YEAR || year > CURRENT_YEAR + 2)
    errs.year = `Year must be ${CURRENT_YEAR}–${CURRENT_YEAR + 2}`;
  if (!form.time)
    errs.time = 'Select a time';

  return errs;
}

export default function BookMeet() {
  const { data } = useBookMeetPage();
  const left = data?.leftSideContent;

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [cooldown, setCooldown] = useState(0);

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const wait = secondsUntilNextSubmit(FORM_KEY);
    if (!canSubmit(FORM_KEY)) { setCooldown(wait); setStatus('cooldown'); return; }

    setStatus('loading');
    const scheduledDate = `${form.day} ${form.month} ${form.year} at ${form.time}`;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          botcheck: '',
          subject: `[Crivo] Book a Meet — ${form.name}`,
          name: form.name,
          email: form.email,
          message: `Profession: ${form.profession}\nScheduled: ${scheduledDate}\n\nReason:\n${form.reason}`,
        }),
      });
      const data = await res.json();
      if (data.success) { setStatus('success'); setForm(EMPTY); recordSubmit(FORM_KEY); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-20 px-6 transition-colors duration-300 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-4xl font-black tracking-tighter text-black dark:text-white">Meet Booked!</h2>
          <p className="text-black/50 dark:text-white/50 leading-relaxed">
            We've received your request and will confirm your slot within 1 business day.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="px-8 py-3 border-2 border-black dark:border-white/30 rounded-full font-bold text-sm tracking-widest hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
          >
            BOOK ANOTHER
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-20 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">

        {/* Left */}
        <div className="flex-1 space-y-10 pt-10">
          <div className="inline-block px-4 py-1.5 border-2 border-black dark:border-white/30 text-black dark:text-white rounded-full text-xs font-bold uppercase tracking-wider">
            {left?.eyebrow || 'Book a Meet'}
          </div>
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-black text-black dark:text-white leading-[0.9] tracking-tighter">{left?.titleLine1 || 'GET STARTED'}</h1>
            <h2 className="text-7xl md:text-8xl font-black text-gray-300 dark:text-gray-600 leading-[0.9] tracking-tighter">{left?.titleLine2 || 'TODAY'}</h2>
          </div>
          <p className="text-black/70 dark:text-white/60 text-xl max-w-md leading-relaxed font-medium">
            {left?.description || "Elevate your vision with our expert guidance. Let's discuss how we can transform your ideas into reality."}
          </p>
          <div className="h-1 w-20 bg-black dark:bg-white"></div>
        </div>

        {/* Right — Form */}
        <div className="flex-1 w-full max-w-xl bg-white dark:bg-white/5 rounded-[2rem] p-8 md:p-12 border-2 border-black dark:border-white/10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)] relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8">

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Name *</label>
              <input type="text" placeholder="Your Name" value={form.name} onChange={set('name')} required className={inputClass} />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Work Email *</label>
              <input type="email" placeholder="name@company.com" value={form.email} onChange={set('email')} required className={inputClass} />
            </div>

            <div className="space-y-3 relative">
              <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Profession *</label>
              <div className="relative">
                <select value={form.profession} onChange={set('profession')} required className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="" disabled className="bg-white dark:bg-[#050505]">Select Profession</option>
                  {PROFESSIONS.map(p => <option key={p} value={p} className="text-black dark:text-white bg-white dark:bg-[#050505]">{p}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black dark:text-white/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Schedule your Meet *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {/* Day */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Day</span>
                  <input
                    type="number" min="1" max="31" placeholder="DD"
                    value={form.day} onChange={set('day')}
                    className={`w-full dark:bg-black border-2 ${errors.day ? 'border-red-500' : 'border-black dark:border-white/20'} rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold placeholder:text-black/30 dark:placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  {errors.day && <p className="text-red-500 text-[9px] font-semibold">{errors.day}</p>}
                </div>

                {/* Month */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Month</span>
                  <select
                    value={form.month} onChange={set('month')}
                    className={`w-full dark:bg-black border-2 ${errors.month ? 'border-red-500' : 'border-black dark:border-white/20'} rounded-xl px-2 py-4 text-center focus:ring-0 outline-none appearance-none cursor-pointer text-sm font-bold text-black dark:text-white`}
                  >
                    <option value="" disabled className="bg-white dark:bg-[#050505]">MM</option>
                    {MONTHS.map(m => <option key={m} value={m} className="text-black dark:text-white bg-white dark:bg-[#050505]">{m}</option>)}
                  </select>
                  {errors.month && <p className="text-red-500 text-[9px] font-semibold">{errors.month}</p>}
                </div>

                {/* Year */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Year</span>
                  <input
                    type="number" min={CURRENT_YEAR} max={CURRENT_YEAR + 2} placeholder="YYYY"
                    value={form.year} onChange={set('year')}
                    className={`w-full dark:bg-black border-2 ${errors.year ? 'border-red-500' : 'border-black dark:border-white/20'} rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold placeholder:text-black/30 dark:placeholder:text-white/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  />
                  {errors.year && <p className="text-red-500 text-[9px] font-semibold">{errors.year}</p>}
                </div>

                {/* Time */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-black/50 dark:text-white/30 uppercase">Time</span>
                  <input
                    type="time" value={form.time} onChange={set('time')}
                    className={`w-full dark:bg-black border-2 ${errors.time ? 'border-red-500' : 'border-black dark:border-white/20'} rounded-xl px-2 py-4 text-center focus:ring-0 outline-none text-black dark:text-white font-bold`}
                  />
                  {errors.time && <p className="text-red-500 text-[9px] font-semibold">{errors.time}</p>}
                </div>

              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-black dark:text-white/70">Reason *</label>
              <textarea rows="4" placeholder="Tell us about your project..." value={form.reason} onChange={set('reason')} required className="w-full dark:bg-black border-2 border-black dark:border-white/20 rounded-2xl px-4 py-4 focus:ring-0 transition-all outline-none resize-none text-black dark:text-white font-medium placeholder:text-black/30 dark:placeholder:text-white/20"></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-semibold text-center">Something went wrong. Please try again.</p>
            )}
            {status === 'cooldown' && (
              <p className="text-amber-500 text-xs font-semibold text-center">Please wait {cooldown}s before submitting again.</p>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full font-black py-5 rounded-full tracking-[0.2em] text-sm bg-black dark:bg-white text-white dark:text-black hover:opacity-90 border-2 border-black dark:border-white transition-all duration-300 transform active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'BOOKING...' : 'BOOK A MEET'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
