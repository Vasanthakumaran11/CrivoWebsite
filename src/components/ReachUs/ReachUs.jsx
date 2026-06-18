import { Link } from 'react-router-dom';
import Footer from '../Home/footer';
import StarsBackground from '../background/StarsBackground';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import DirectoryCards from './DirectoryCards';
import EmergencyDesk from './EmergencyDesk';

function ReachUs() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] -translate-x-1/4 translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
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

          {/* Left - Contact Info Links */}
          <div className="space-y-8">
            <ContactInfo />

            <div className="p-8 border border-black/10 dark:border-white/10 rounded-[2rem] bg-white dark:bg-white/5 text-left">
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
          <ContactForm />
        </div>
      </section>

      {/* Section 3: The Interoperability Gateway (Partner with Us) */}
      <section className="py-32 bg-transparent text-left">
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
      <EmergencyDesk />

      {/* Information Cards Directory */}
      <section className="py-32 text-left">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Quick Access</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              OFFICE <br /><span className="text-outline">DIRECTORY.</span>
            </h2>
          </div>

          <DirectoryCards />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ReachUs;
