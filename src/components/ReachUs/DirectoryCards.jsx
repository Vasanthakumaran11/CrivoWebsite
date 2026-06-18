import { 
  Phone, Clock, Share2, MapPin, HelpCircle, Briefcase, 
  ArrowRight, ArrowUpRight, Linkedin, Twitter, Instagram, Youtube 
} from 'lucide-react';

const directoryCardsList = [
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
          <p className="text-black/60 dark:text-white/60 leading-relaxed mb-4 text-xl">
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
              { icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/company/crivo-tech/' },
              { icon: Twitter, name: 'X', url: 'https://x.com/Crivo_Tech' },
              { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/crivo_tech_?igsh=bnB6ZTVua3RuZ2dk' },
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
        <div className="hidden lg:flex flex-col gap-2.5 w-full mt-4 text-left">
          {[
            { icon: Linkedin, name: 'LinkedIn', url: 'https://www.linkedin.com/company/crivo-tech/' },
            { icon: Twitter, name: 'X', url: 'https://x.com/Crivo_Tech' },
            { icon: Instagram, name: 'Instagram', url: 'https://www.instagram.com/crivo_tech_?igsh=bnB6ZTVua3RuZ2dk' },
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

function DirectoryCards() {
  return (
    <>
      {/* Desktop view (lg and above) */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-8 lg:gap-24 py-8">
        {directoryCardsList.map((card, i) => {
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

              {/* Hover Popup State */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[320px] h-[108%] opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-20 flex flex-col justify-between p-8 bg-[#F8F7F2]/98 dark:bg-[#050505]/98 backdrop-blur-xl border border-black/15 dark:border-white/10 rounded-[2.5rem] shadow-2xl text-left">
                {card.details}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile & Tablet view (below lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-6 py-8">
        {directoryCardsList.map((card, i) => (
          <div key={i} className="relative w-full rounded-[2rem] border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 flex flex-col justify-between p-6 sm:p-8 text-left shadow-sm hover:shadow-md transition-shadow">
            {card.details}
          </div>
        ))}
      </div>
    </>
  );
}

export default DirectoryCards;
