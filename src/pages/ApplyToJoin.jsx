import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Zap } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

function ApplyToJoin() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '', portfolio: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Careers at Crivo</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            JOIN <br /><span className="text-outline">CRIVO.</span>
          </h1>
          <p className="max-w-xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            We're building EV infrastructure for India. If you want to work on products that matter, drop your details below — we'll take it from there.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Apply Now</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-[#111110] dark:text-white">
              DROP YOUR <br /><span className="text-outline">APPLICATION.</span>
            </h2>
            <p className="mt-6 text-black/50 dark:text-white/50 text-lg leading-relaxed max-w-lg">
              No lengthy HR process. Tell us who you are and what you've built.
            </p>
          </div>

          {submitted ? (
            <div className="p-14 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center mx-auto">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-black tracking-tight">Application Received!</h3>
              <p className="text-black/50 dark:text-white/50 text-lg max-w-sm mx-auto leading-relaxed">
                We'll review your details and reach out within 48 hours. Thanks for your interest in Crivo.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', role: '', portfolio: '', message: '' }); }}
                className="px-8 py-3 border border-black/20 dark:border-white/20 rounded-full text-sm font-bold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-10 md:p-14 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Full Name *</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="w-full px-5 py-4 bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Email *</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-5 py-4 bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Role You're Interested In *</label>
                <input
                  required
                  type="text"
                  value={formData.role}
                  onChange={e => setFormData(p => ({ ...p, role: e.target.value }))}
                  placeholder="e.g. Flutter Developer, ML Engineer, UI/UX Designer..."
                  className="w-full px-5 py-4 bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Portfolio / LinkedIn / GitHub</label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={e => setFormData(p => ({ ...p, portfolio: e.target.value }))}
                  placeholder="https://..."
                  className="w-full px-5 py-4 bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Tell Us About Yourself *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  placeholder="What have you built? What excites you about Crivo? What would you bring to the team?"
                  className="w-full px-5 py-4 bg-black/3 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-2xl hover:scale-[1.01] transition-transform text-sm tracking-widest uppercase"
              >
                Submit Application →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-3xl font-black tracking-tight mb-2">Have questions before applying?</h3>
            <p className="text-black/50 dark:text-white/50">Reach out directly — we're happy to talk.</p>
          </div>
          <Link to="/reach-us">
            <button className="flex items-center gap-3 px-10 py-4 border border-black/20 dark:border-white/20 rounded-full font-bold text-sm tracking-wide hover:bg-black/5 dark:hover:bg-white/5 transition-colors whitespace-nowrap">
              Contact Us <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ApplyToJoin;
