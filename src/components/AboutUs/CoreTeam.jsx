import { useState } from 'react';
import { Linkedin, Github } from 'lucide-react';

const coreTeamList = [
  { 
    name: "Vasantha Kumar A", 
    role: "Data Engineer & Frontend Developer", 
    email: "vasanthakumaran0011@gmail.com",
    image: "/VasanthaKumar.png",
    pos: { left: "15%", top: "20%" },
    github: "https://github.com/Vasanthakumaran11",
    linkedin: "https://www.linkedin.com/in/vasanthakumaran11/",
    initial: "V"
  },
  { 
    name: "Darshan T P", 
    role: "Product Lead", 
    email: "darshantp13@gmail.com",
    image: "/dharsan.png",
    pos: { left: "50%", top: "20%" },
    github: "https://github.com/Darshan-T-P",
    linkedin: "https://www.linkedin.com/in/darshantp13/",
    initial: "D"
  },
  { 
    name: "Bharat Kumar J", 
    role: "Flutter Developer", 
    email: "bharathkumar037@gmail.com",
    image: "/BharatKumar.jpeg",
    pos: { left: "85%", top: "20%" },
    linkedin: "https://www.linkedin.com/in/bharathkumar-j-373598386/",
    github: "https://github.com/Bharathkumar2024",
    initial: "B",
  },
  { 
    name: "Praneesh S", 
    role: "Backend Developer", 
    email: "spraneesh2007@gmail.com",
    image: "/Praneesh.png",
    pos: { left: "15%", top: "80%" },
    github: "https://github.com/SelvaPraneesh",
    linkedin: "https://www.linkedin.com/in/praneeshs",
    initial: "P"
  },
  { 
    name: "Thirumalai Kumar C", 
    role: "ML Developer", 
    email: "thirumalai@crivo.in",
    image: "/ThirumalaiKumar.png",
    pos: { left: "50%", top: "80%" },
    github: "https://github.com/thirumalaikumar07",
    linkedin: "https://www.linkedin.com/in/thirumalaikumar-c-62b158365",
    initial: "T"
  },
  { 
    name: "Anthoni Milton R", 
    role: "ML Developer", 
    email: "miltonanthonimilton@gmail.com",
    image: "/AntonyMilton.png",
    pos: { left: "85%", top: "80%" },
    github: "https://github.com/anthonimilton07",
    linkedin: "https://www.linkedin.com/in/anthoni-milton-milton-1842ab315/",
    initial: "A"
  },
];

function TeamMemberImage({ src, alt, initial, position = "center" }) {
  const [error, setError] = useState(false);
  
  if (error || !src) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 text-4xl font-black text-black/40 dark:text-white/40">
        {initial}
      </div>
    );
  }
  
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      style={{ objectPosition: position }}
    />
  );
}

function CoreTeam() {
  return (
    <div className="text-left mt-12">
      <div>
        <h6 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8">
          CORE TEAM
        </h6>
      </div>

      {/* Desktop Layout (Futuristic Network Flow - Transparent Backdrop) */}
      <div className="relative w-full h-[1050px] hidden lg:block z-10 my-12">
        {/* SVG Connecting Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Backing connection paths */}
          <path d="M 50 50 V 20 H 15" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 20" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 20 H 85" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80 H 15" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80 H 85" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />

          {/* Glowing active circuit paths (animated dashes) */}
          <path d="M 50 50 V 20 H 15" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 20" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 20 H 85" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80 H 15" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
          <path d="M 50 50 V 80 H 85" className="stroke-black/35 dark:stroke-white/40 animate-dash" strokeWidth="0.4" fill="none" />
        </svg>

        {/* Central Node Card */}
        <div
          className="absolute bg-white dark:bg-[#070708] border border-black/10 dark:border-white/10 rounded-[2rem] p-6 text-center shadow-2xl flex flex-col justify-center items-center z-20 w-[320px] h-[140px]"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
        >
          <h3 className="text-3xl font-black text-black dark:text-white tracking-tight uppercase leading-none mb-1">
            OUR CORE
          </h3>
          <h3 className="text-3xl font-black text-outline tracking-tight uppercase leading-none mb-4">
            TEAM
          </h3>
          <p className="text-black/40 dark:text-zinc-500 text-[9px] uppercase tracking-[0.3em] font-black">
            THE MIND BEHIND CRIVO
          </p>
        </div>

        {/* Core Team Cards */}
        {coreTeamList.map((t, i) => (
          <div
            key={i}
            className="absolute group p-[1px] w-[280px] transition-all duration-500 hover:-translate-y-2 z-10 text-left"
            style={{
              left: t.pos.left,
              top: t.pos.top,
              transform: 'translate(-50%, -50%)',
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
            }}
          >
            {/* Glow Border */}
            <div className="absolute inset-0 bg-black/10 dark:bg-white/10 group-hover:bg-black/30 group-hover:dark:bg-white/30 transition-all duration-500 rounded-[1.5rem]"></div>
            
            {/* Inner Card */}
            <div
              className="relative bg-white dark:bg-[#070708] p-6 w-full flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
                minHeight: '380px'
              }}
            >
              <div>
                <div className="w-full h-56 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden relative mb-5 border border-black/5 dark:border-white/5">
                  <TeamMemberImage
                    src={t.image}
                    alt={t.name}
                    initial={t.initial}
                    position={t.position || 'center'}
                  />
                </div>
                <h4 className="font-black text-xl tracking-tight text-black dark:text-white leading-tight">
                  {t.name}
                </h4>
                <p className="text-black/60 dark:text-zinc-400 text-sm mt-1 font-medium leading-tight">
                  {t.role}
                </p>
              </div>
              
              {/* Contact details */}
              <div className="flex items-center justify-center mx-2 mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-xs text-black/50 dark:text-zinc-500">
                <div className="flex items-center gap-2.5">
                  <a href={`mailto:${t.email}`} className="hover:text-black dark:hover:text-white transition-colors truncate max-w-[130px] font-semibold" title={t.email}>
                    Email
                  </a>
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">
                    LinkedIn
                  </a>
                  <a href={t.github} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet Layout (Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-8 mt-12">
        {coreTeamList.map((t, i) => (
          <div
            key={i}
            className="group relative p-[1px] w-full max-w-[340px] mx-auto transition-all duration-500 hover:-translate-y-2 text-left"
            style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)' }}
          >
            {/* Glow Border */}
            <div className="absolute inset-0 bg-black/10 dark:bg-white/10 group-hover:bg-black/30 group-hover:dark:bg-white/30 transition-all duration-500 rounded-[1.5rem]"></div>
            
            {/* Inner Card */}
            <div
              className="relative bg-white dark:bg-[#070708] p-6 w-full flex flex-col justify-between"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)',
                minHeight: '380px'
              }}
            >
              <div>
                <div className="w-full h-56 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden relative mb-5 border border-black/5 dark:border-white/5">
                  <TeamMemberImage
                    src={t.image}
                    alt={t.name}
                    initial={t.initial}
                    position={t.position || 'center'}
                  />
                </div>
                <h4 className="font-black text-xl tracking-tight text-black dark:text-white leading-tight">
                  {t.name}
                </h4>
                <p className="text-black/60 dark:text-zinc-400 text-sm mt-1 font-medium leading-tight">
                  {t.role}
                </p>
              </div>
              
              {/* Contact details */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/10 dark:border-white/10 text-xs text-black/50 dark:text-zinc-500">
                <a href={`mailto:${t.email}`} className="hover:text-black dark:hover:text-white transition-colors truncate max-w-[130px]" title={t.email}>
                  {t.email}
                </a>
                <div className="flex items-center gap-2.5">
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">
                    LinkedIn
                  </a>
                  <span>·</span>
                  <a href={t.github} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white transition-colors font-semibold">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CoreTeam;
