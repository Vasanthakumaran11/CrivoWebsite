import { useState } from 'react';
import { canSubmit, recordSubmit, secondsUntilNextSubmit } from '../../utils/formSecurity';

const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FORM_KEY = 'contact';

const inputClass =
  'w-full bg-black/4 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3.5 text-[#111110] dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm';

const labelClass = 'text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50';

const SUBJECTS = [
  'CRIVO CSMS Platform Support',
  'Smart EV Trip Planner Licensing',
  'Sector Logistics Collaboration',
  'Custom API & Developer Integration',
  'General Product Query',
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | cooldown
  const [cooldown, setCooldown] = useState(0);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) return;

    const wait = secondsUntilNextSubmit(FORM_KEY);
    if (!canSubmit(FORM_KEY)) {
      setCooldown(wait);
      setStatus('cooldown');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          botcheck: '',
          name: form.name,
          email: form.email,
          subject: `[Crivo] ${form.subject}`,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm(EMPTY);
        recordSubmit(FORM_KEY);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col items-center justify-center min-h-[480px] text-center">
        <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#111110] dark:text-white">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-3">Message Sent</h3>
        <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed mb-8 max-w-xs">
          Thanks for reaching out. We'll get back to you within 1–2 business days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="px-8 py-3 border border-black/20 dark:border-white/20 text-sm font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors tracking-widest"
        >
          SEND ANOTHER
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12 text-left">
      <h3 className="text-2xl font-black tracking-tight mb-8">Send us a message</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={labelClass}>Name</label>
            <input
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={set('name')}
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={set('email')}
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Subject</label>
          <div className="relative">
            <select
              value={form.subject}
              onChange={set('subject')}
              required
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="" disabled className="text-black/50 dark:text-white/30 bg-white dark:bg-[#050505]">
                Select a topic
              </option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s} className="text-black dark:text-white bg-white dark:bg-[#050505]">
                  {s}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className={labelClass}>Message</label>
          <textarea
            rows="5"
            placeholder="Tell us about your project or query..."
            value={form.message}
            onChange={set('message')}
            required
            className={`${inputClass} resize-none`}
          />
        </div>

        {status === 'error' && (
          <p className="text-red-500 dark:text-red-400 text-xs font-semibold text-center">
            Something went wrong. Please try again or email us directly.
          </p>
        )}
        {status === 'cooldown' && (
          <p className="text-amber-500 dark:text-amber-400 text-xs font-semibold text-center">
            Please wait {cooldown}s before submitting again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-[1.02] transition-transform text-sm tracking-widest disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
        </button>
      </form>
    </div>
  );
}
