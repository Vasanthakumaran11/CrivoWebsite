import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Clock, Share2, HelpCircle, Briefcase, ArrowRight, Linkedin, Twitter, Instagram, Youtube, Copy, Check, Send, Terminal, ChevronRight, AlertTriangle, ArrowLeft, Loader2 } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

const contactInfo = [
  { icon: Mail, label: "Email Us", value: "info@crivo.in", href: "mailto:info@crivo.in" },
  { icon: Phone, label: "Call Us", value: "+91 96007 60063", href: "tel:+919600760063" },
  { icon: MapPin, label: "Find Us", value: "///radius.timesaver.poised", href: "https://what3words.com/radius.timesaver.poised" },
];

const directoryCards = [
  {
    icon: Phone,
    title: "Contact",
    details: (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <Phone className="w-5 h-5 text-black/70 dark:text-white/70" />
            </div>
            <h4 className="font-bold text-lg">Contact Us</h4>
          </div>
          <p className="text-black/60 dark:text-white/60  leading-relaxed mb-4 text-xl">
            221 R.K Building, Uthukuli,<br />Tiruppur - 638751
          </p>
        </div>
        <div className="space-y-2 pt-4 border-t border-black/5 dark:border-white/5">
          <a href="tel:+919600760063" className="block font-bold text-black dark:text-white hover:underline text-xl">
            +91 96007 60063
          </a>
          <a href="mailto:info@crivo.in" className="block text-black/50 dark:text-white/40 hover:underline text-xl">
            info@crivo.in
          </a>
        </div>
      </div>
    )
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-black/70 dark:text-white/70" />
            </div>
            <h4 className="font-bold text-lg">Office Hours</h4>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold mb-1">Mon - Sat</p>
              <p className="font-semibold text-xl">[9.00 pm - 5.00 am]</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold mb-1">Sunday</p>
              <p className="font-semibold text-xl">[9.00 am - 5.00 am] <span className="text-xs font-normal opacity-70">(calls only)</span></p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    icon: Share2,
    title: "Socials",
    details: (
      <div className="flex flex-col h-full justify-between items-center relative overflow-hidden w-full">
        <style>{`
          @keyframes orbit-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes orbit-reverse {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(-360deg); }
          }
          .animate-orbit {
            animation: orbit-spin 12s linear infinite;
          }
          .animate-orbit-reverse {
            animation: orbit-reverse 12s linear infinite;
          }
          .orbit-container:hover .animate-orbit {
            animation-play-state: running;
          }
          .orbit-container:hover .animate-orbit-reverse {
            animation-play-state: running;
          }
        `}</style>
        
        <div className="flex items-center gap-3 mb-2 w-full text-left">
          <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
            <Share2 className="w-5 h-5 text-black/70 dark:text-white/70" />
          </div>
          <h4 className="font-bold text-lg">Socials</h4>
        </div>

        {/* Orbit Loop (Mobile/Tablet View) */}
        <div className="orbit-container relative w-44 h-44 flex items-center justify-center my-auto lg:hidden">
          {/* Inner circle track */}
          <div className="absolute inset-4 rounded-full border border-dashed border-black/15 dark:border-white/15"></div>
          
          {/* Center text / design */}
          <div className="absolute w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[10px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase">
            Crivo
          </div>

          {/* Rotating orbit */}
          <div className="absolute inset-0 animate-orbit">
            {[
              { icon: Linkedin, name: 'LinkedIn', url: '#' },
              { icon: Twitter, name: 'X', url: '#' },
              { icon: Instagram, name: 'Instagram', url: '#' },
              { icon: Youtube, name: 'Youtube', url: '#' }
            ].map((soc, i) => {
              const SocIcon = soc.icon;
              const angle = i * 90;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(64px) rotate(${-angle}deg)`
                  }}
                >
                  <a
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-orbit-reverse w-10 h-10 rounded-full bg-white dark:bg-[#151515] border border-black/10 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:text-[#111110] dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 hover:scale-110 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    title={soc.name}
                  >
                    <SocIcon className="w-5 h-5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Standard Vertically Placed Format (Desktop View) */}
        <div className="hidden lg:flex flex-col gap-2.5 w-full mt-4">
          {[
            { icon: Linkedin, name: 'LinkedIn', url: '#' },
            { icon: Twitter, name: 'X', url: '#' },
            { icon: Instagram, name: 'Instagram', url: '#' },
            { icon: Youtube, name: 'Youtube', url: '#' }
          ].map((soc, i) => {
            const SocIcon = soc.icon;
            return (
              <a
                key={i}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-[#111110] dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center">
                    <SocIcon className="w-4 h-4 text-black/70 dark:text-white/70" />
                  </div>
                  <span className="font-bold text-sm">{soc.name}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-50" />
              </a>
            );
          })}
        </div>
      </div>
    )
  },
  {
    icon: MapPin,
    title: "Location",
    details: (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-black/70 dark:text-white/70" />
            </div>
            <h4 className="font-bold text-lg">Location</h4>
          </div>
          <p className="text-black/50 dark:text-white/50 text-xl leading-relaxed mb-4">
            Easily find us on map services to schedule an in-person meeting or office tour.
          </p>
        </div>
        <a href="https://what3words.com/radius.timesaver.poised" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold text-black dark:text-white hover:underline text-xs">
          Way to Crivo <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    )
  },
  {
    icon: HelpCircle,
    title: "Support Option",
    details: (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <HelpCircle className="w-5 h-5 text-black/70 dark:text-white/70" />
            </div>
            <h4 className="font-bold text-lg">Support Option</h4>
          </div>
          <p className="text-black/50 dark:text-white/50 text-xl leading-relaxed mb-4">
            Get dedicated support for all our web, app, and system platforms directly from our core engineering team.
          </p>
        </div>
        <a href="mailto:support@crivo.in" className="font-bold text-black dark:text-white hover:underline text-xl">
          support@crivo.in
        </a>
      </div>
    )
  },
  {
    icon: Briefcase,
    title: "Apply to join",
    details: (
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-black/70 dark:text-white/70" />
            </div>
            <h4 className="font-bold text-lg">Apply to join</h4>
          </div>
          <p className="text-black/50 dark:text-white/50 text-xl leading-relaxed mb-4">
            We are always looking for passionate builders, designers, and innovators to shape the future of tech.
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40">Mail your resume →</p>
          <a href="mailto:hr@crivo.in" className="font-bold text-black dark:text-white hover:underline text-xl">
            hr@crivo.in
          </a>
        </div>
      </div>
    )
  }
];

function ReachUs() {
  const [supportCopied, setSupportCopied] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // 'help' | null
  
  // Help Form State
  const [helpForm, setHelpForm] = useState({ contact: '', topic: 'General Support', description: '' });
  const [helpSubmitStatus, setHelpSubmitStatus] = useState('idle'); // 'idle' | 'submitting' | 'success'
  const [helpLogStep, setHelpLogStep] = useState(0);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setSupportCopied(true);
    setTimeout(() => setSupportCopied(false), 2000);
  };

  const handleHelpSubmit = (e) => {
    e.preventDefault();
    setHelpSubmitStatus('submitting');
    setHelpLogStep(0);
    
    // Simulate connection log sequence
    setTimeout(() => setHelpLogStep(1), 500);
    setTimeout(() => setHelpLogStep(2), 1000);
    setTimeout(() => setHelpLogStep(3), 1500);
    setTimeout(() => {
      setHelpSubmitStatus('success');
      setHelpForm({ contact: '', topic: 'General Support', description: '' });
    }, 2000);
  };

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] -translate-x-1/4 translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Get In Touch</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            REACH <br /><span className="text-outline">US.</span>
          </h1>
          <p className="max-w-xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            Have a project in mind, a question, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left */}
          <div className="space-y-8">
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <a key={i} href={c.href} target={c.icon === MapPin ? '_blank' : undefined} rel="noreferrer"
                  className="group flex items-center justify-between p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500">
                      <Icon className="w-5 h-5 text-black/50 dark:text-white/60 group-hover:text-white dark:group-hover:text-black/60 transition-colors duration-500" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/60 transition-colors duration-500 font-bold mb-1">{c.label}</p>
                      <p className="font-semibold group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{c.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-black/30 dark:text-white/30 group-hover:text-white/60 dark:group-hover:text-black/65 transition-colors duration-500" />
                </a>
              );
            })}

            <div className="p-8 border border-black/10 dark:border-white/10 rounded-[2rem] bg-white dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.25em] font-bold text-black/40 dark:text-white/50 mb-3">Prefer a call?</p>
              <h3 className="text-3xl font-black tracking-tight mb-4">Book a 30-min meet</h3>
              <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed mb-8">
                Skip the back-and-forth. Pick a time that works for you and let's talk through your project directly.
              </p>
              <Link to="/book-meet">
                <button className="px-8 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-sm tracking-wide">
                  BOOK A MEET
                </button>
              </Link>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12">
            <h3 className="text-2xl font-black tracking-tight mb-8">Send us a message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Name</label>
                  <input type="text" placeholder="Your name"
                    className="w-full bg-black/4 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3.5 text-[#111110] dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Email</label>
                  <input type="email" placeholder="name@company.com"
                    className="w-full bg-black/4 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3.5 text-[#111110] dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Subject</label>
                <div className="relative">
                  <select className="w-full bg-black/4 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3.5 text-[#111110] dark:text-white appearance-none focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors text-sm cursor-pointer">
                    <option value="" disabled>Select a topic</option>
                    <option>CRIVO CSMS Platform Support</option>
                    <option>Smart EV-Trip Planner Licensing</option>
                    <option>Sector Logistics Collaboration</option>
                    <option>Custom API & Developer Integration</option>
                    <option>General Product Query</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black/40 dark:text-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Message</label>
                <textarea rows="5" placeholder="Tell us about your project or query..."
                  className="w-full bg-black/4 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl px-4 py-3.5 text-[#111110] dark:text-white placeholder:text-black/25 dark:placeholder:text-white/20 focus:outline-none focus:border-black/30 dark:focus:border-white/30 transition-colors resize-none text-sm"></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-[1.02] transition-transform text-sm tracking-widest">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 3: The Interoperability Gateway (Partner with Us) */}
      <section className="py-32 bg-transparent">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-left">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/45 dark:text-white/40 block mb-4">Partner With Us</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
              LET'S WORK <br /><span className="text">TOGETHER.</span>
            </h2>
          </div>

          <div className="bg-white text-black border border-black rounded-[2.5rem] p-10 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 text-left shadow-lg">
            {/* Column A */}
            <div className="flex flex-col justify-between space-y-8 h-full">
              <div className="space-y-4">
                <span className="inline-flex px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-wider text-black/60">
                  NETWORK CPO INTEGRATION // NODE 01
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  Network Interoperability Integration
                </h3>
                <p className="text-black/60 text-base font-medium leading-relaxed">
                  Are you an Indian CPO looking to eliminate payment friction? Connect your charging hardware and wallet API layer to our unified infrastructure to immediately access thousands of multi-network EV drivers.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/book-meet">
                  <button className="w-full sm:w-auto px-8 py-4 bg-black text-white hover:bg-black/90 font-bold rounded-full text-xs tracking-widest uppercase transition-transform hover:scale-[1.02] shadow-sm">
                    Request API Documentation Handshake
                  </button>
                </Link>
              </div>
            </div>

            {/* Column B */}
            <div className="flex flex-col justify-between space-y-8 h-full md:border-l md:border-black/10 md:pl-16 pt-8 md:pt-0">
              <div className="space-y-4">
                <span className="inline-flex px-3 py-1 bg-black/5 rounded-full text-[9px] font-bold uppercase tracking-wider text-black/60">
                  AMENITY DISCOVERY // NODE 02
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight">
                  Strategic Amenity Mapping
                </h3>
                <p className="text-black/60 text-base font-medium leading-relaxed">
                  Do you own a hotel, restaurant, or highway rest plaza with EV charging facilities? List your location on our AI recommendation engine to attract long-distance travelers looking for comfort-first charging stops.
                </p>
              </div>
              <div className="pt-4">
                <Link to="/book-meet">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-black border border-black hover:bg-black/5 font-bold rounded-full text-xs tracking-widest uppercase transition-transform hover:scale-[1.02]">
                    Register Your Commercial Space
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Real-Time Incident Reporting (The Emergency Desk) */}
      <section className="bg-black text-white py-32 border-t border-white/10">
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
                  <span className="relative flex h-2 w-2">
                  </span>
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
              {/* Background ambient light */}

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
                            <option value="Trip Issue">Trip Issue</option>
                            <option value="Wallet Delay">Wallet Timeout</option>
                            <option value="Charger Offline">Offline Charger</option>
                            <option value="Other">Other Query</option>
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
                        <p className="text-xs font-mono tracking-widest text-white font-bold uppercase">ALERT BROADCASTED</p>
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
                    <div className="flex items-center justify-between">
                    </div>
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
              {/* Background ambient light */}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  
                </div>
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

      {/* Information Cards Directory */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Quick Access</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              OFFICE <br /><span className="text-outline">DIRECTORY.</span>
            </h2>
          </div>

          {/* Desktop view (lg and above) */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-8 lg:gap-24 py-8">
            {directoryCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="group relative w-full h-[360px] rounded-[2.5rem] border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col items-center justify-between py-10 px-4 cursor-pointer transition-all duration-500 hover:shadow-2xl">
                  {/* Default State */}
                  <div className="flex flex-col items-center justify-between h-full w-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-90">
                    <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#111110] dark:text-white" />
                    </div>
                    <h3 className="text-base lg:text-lg font-black tracking-[0.15em] lg:tracking-[0.2em] uppercase text-[#111110] dark:text-white lg:[writing-mode:vertical-lr] lg:rotate-180 lg:my-auto text-center whitespace-nowrap">
                      {card.title}
                    </h3>
                  </div>

                  {/* Hover Popup State (Enlarged and Opacity Background) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[320px] h-[108%] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20 flex flex-col justify-between p-8 bg-[#F8F7F2]/98 dark:bg-[#050505]/98 backdrop-blur-xl border border-black/15 dark:border-white/10 rounded-[2.5rem] shadow-2xl text-left">
                    {card.details}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile & Tablet view (below lg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 py-8">
            {directoryCards.map((card, i) => (
              <div key={i} className="relative w-full rounded-[2rem] border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col justify-between p-6 sm:p-8 text-left shadow-sm hover:shadow-md transition-shadow">
                {card.details}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReachUs;
