import { useState } from 'react';
import { Check, Copy, Terminal, ArrowLeft, Send, Loader2, Phone, ChevronRight } from 'lucide-react';

const W3F_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
import { canSubmit, recordSubmit } from '../../utils/formSecurity';
const FORM_KEY = 'emergency';

function EmergencyDesk() {
  const [supportCopied, setSupportCopied] = useState(false);
  const [activeForm, setActiveForm] = useState(null);
  const [helpForm, setHelpForm] = useState({ contact: '', topic: 'Trip Issue', description: '' });
  const [helpSubmitStatus, setHelpSubmitStatus] = useState('idle');
  const [helpLogStep, setHelpLogStep] = useState(0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSupportCopied(true);
    setTimeout(() => setSupportCopied(false), 2000);
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit(FORM_KEY)) return;
    setHelpSubmitStatus('submitting');
    setHelpLogStep(0);

    // Start terminal animation
    setTimeout(() => setHelpLogStep(1), 500);
    setTimeout(() => setHelpLogStep(2), 1000);
    setTimeout(() => setHelpLogStep(3), 1500);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: W3F_KEY,
          botcheck: '',
          subject: `[Crivo Emergency] ${helpForm.topic}`,
          name: helpForm.contact,
          email: helpForm.contact.includes('@') ? helpForm.contact : 'support@crivo.in',
          message: `Contact: ${helpForm.contact}\nTopic: ${helpForm.topic}\n\nDetails:\n${helpForm.description}`,
        }),
      });
      const data = await res.json();
      setTimeout(() => {
        if (data.success) {
          setHelpSubmitStatus('success');
          setHelpForm({ contact: '', topic: 'Trip Issue', description: '' });
          recordSubmit(FORM_KEY);
        } else {
          setHelpSubmitStatus('idle');
        }
      }, 2000);
    } catch {
      setTimeout(() => setHelpSubmitStatus('idle'), 2000);
    }
  };

  return (
    <section className="bg-black text-white py-32 border-t border-white/10 text-left">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20 text-left" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
          <span className="text-sm font-bold tracking-[0.25em] text-white/40 block mb-4">THE EMERGENCY DESK</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight uppercase leading-none">
            CUSTOMER ASSISTANCE.
          </h2>
        </div>

        {/* Grid of 3 Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          
          {/* Box 1: Support Email */}
          <div className="border border-white/15 rounded-3xl bg-white/[0.03] p-8 flex flex-col justify-between min-h-[300px] hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 relative overflow-hidden group text-left">
            {/* Background ambient light */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:bg-white/10 transition-colors duration-300"></div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="relative flex h-2 w-2"></span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Direct Support Email</h3>
              <p className="text-xs text-white/60 leading-relaxed font-semibold">
                Have general queries, partnership proposals, or detailed logs to send? Connect directly with our core email support gateway.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              {/* Email Copy Card */}
              <div className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/5 rounded-2xl group/email relative hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex flex-col truncate">
                  <a href="mailto:support@crivo.in" className="text-sm font-bold font-mono tracking-tight hover:text-white/80 transition-colors block truncate text-white">
                    support@crivo.in
                  </a>
                </div>
                <button 
                  onClick={() => copyToClipboard('support@crivo.in')}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all shadow-inner"
                  title="Copy email to clipboard"
                >
                  {supportCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                {supportCopied && (
                  <span className="absolute -top-6 right-2 text-[9px] bg-white/10 text-white px-2 py-0.5 rounded border border-white/20 font-mono animate-pulse">Copied!</span>
                )}
              </div>
            </div>
          </div>

          {/* Box 2: Get Help Form */}
          <div className="border border-white/15 rounded-3xl bg-white/[0.03] p-8 flex flex-col justify-between min-h-[300px] hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 relative overflow-hidden group text-left">
            {activeForm === 'help' ? (
              <div className="flex flex-col h-full justify-between space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveForm(null)}
                    className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-white/50 hover:text-white transition-colors"
                  >
                    <ArrowLeft className="w-3 h-3" /> Back
                  </button>
                </div>

                {helpSubmitStatus === 'idle' && (
                  <form onSubmit={handleHelpSubmit} className="space-y-3 flex-1 flex flex-col justify-center">
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Contact Email / Phone</label>
                      <input 
                        required
                        type="text" 
                        value={helpForm.contact}
                        onChange={(e) => setHelpForm({...helpForm, contact: e.target.value})}
                        placeholder="e.g. driver@crivo.in" 
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 rounded-xl px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Topic</label>
                        <select 
                          value={helpForm.topic}
                          onChange={(e) => setHelpForm({...helpForm, topic: e.target.value})}
                          className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/40 rounded-xl px-2 py-2 text-[11px] text-white focus:outline-none transition-colors cursor-pointer"
                        >
                          <option value="Trip Issue" className="text-black dark:text-white bg-white dark:bg-[#0d0d0d]">Trip Issue</option>
                          <option value="Wallet Delay" className="text-black dark:text-white bg-white dark:bg-[#0d0d0d]">Wallet Timeout</option>
                          <option value="Charger Offline" className="text-black dark:text-white bg-white dark:bg-[#0d0d0d]">Offline Charger</option>
                          <option value="Other" className="text-black dark:text-white bg-white dark:bg-[#0d0d0d]">Other Query</option>
                        </select>
                      </div>
                      <div className="flex flex-col justify-end">
                        <button 
                          type="submit"
                          className="w-full py-2 bg-white hover:bg-white/90 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1"
                        >
                          <Send className="w-3 h-3" /> Transmit
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Details</label>
                      <textarea 
                        required
                        rows={2}
                        value={helpForm.description}
                        onChange={(e) => setHelpForm({...helpForm, description: e.target.value})}
                        placeholder="Provide context..." 
                        className="w-full bg-white/[0.02] border border-white/10 focus:border-white/40 rounded-xl px-3 py-2 text-[10px] text-white placeholder:text-white/25 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </form>
                )}

                {helpSubmitStatus === 'submitting' && (
                  <div className="font-mono text-[10px] bg-black border border-white/5 rounded-2xl p-4 space-y-1.5 flex-1 flex flex-col justify-between min-h-[170px]">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-1.5 text-white/80">
                        <Terminal className="w-3 h-3 animate-pulse" />
                        <span>CONNECTING TO SUPPORT GRID...</span>
                      </div>
                      {helpLogStep >= 1 && (
                        <div className="text-white/60">&gt; PACKAGING DIAGNOSTIC PAYLOAD...</div>
                      )}
                      {helpLogStep >= 2 && (
                        <div className="text-white/60">&gt; BROADCASTING TO ENGINEERING QUEUE...</div>
                      )}
                      {helpLogStep >= 3 && (
                        <div className="text-white font-bold">&gt; TRANSMISSION COMPLETE. NODE INDEXED.</div>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[8px] text-white/30 border-t border-white/5 pt-2">
                      <span>GATEWAY: HELP_DESK_PIPE</span>
                      <Loader2 className="w-2.5 h-2.5 animate-spin text-white" />
                    </div>
                  </div>
                )}

                {helpSubmitStatus === 'success' && (
                  <div className="flex flex-col items-center justify-center text-center space-y-3 flex-1 min-h-[170px]">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-mono tracking-widest text-white font-bold uppercase">ALERT BROADCAST</p>
                      <p className="text-[10px] font-mono text-white/40 mt-1">Ref ID: #HLP-{(Math.floor(Math.random() * 9000) + 1000)}</p>
                    </div>
                    <button 
                      onClick={() => { setActiveForm(null); setHelpSubmitStatus('idle'); }}
                      className="px-4 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-colors"
                    >
                      Close Console
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Get Help Console</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-semibold">
                    Experiencing trip planner anomalies or charging wallet issues? Send an instant alert directly to our active engineering queue.
                  </p>
                </div>

                <button 
                  onClick={() => { setActiveForm('help'); setHelpSubmitStatus('idle'); }}
                  className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-transparent font-bold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Open Help Console</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Box 3: Hotline Support */}
          <div className="border border-white/15 rounded-3xl bg-white/[0.03] p-8 flex flex-col justify-between min-h-[300px] hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] transition-all duration-300 relative overflow-hidden group text-left">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Urgent Support Line</h3>
              <p className="text-xs text-white/60 leading-relaxed font-semibold">
                Currently stranded on a live trip or facing critical charger wallet lockouts? Contact our 24/7 hotline for priority emergency support.
              </p>
            </div>

            <div className="space-y-4 mt-6">
              <a 
                href="tel:+919600760063"
                className="w-full flex items-center justify-center gap-1.5 py-3.5 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 hover:border-transparent font-bold rounded-2xl text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                <span>+91 96007 60063</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default EmergencyDesk;
