import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Linkedin, Github, Mail } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

const stats = [
  { value: "50+", label: "Supported Platforms" },
  { value: "10+",   label: "Customers" },
  { value: "20+",  label: "Employees" },
  { value: "10K+", label :"Daily Active users" }
];

const leaders = [
  { 
    name: "Bharanidharan", 
    role: "Founder & CEO", 
    initial: "B",
    linkedin: "https://linkedin.com/in/bharanidharan-rn",
 
    email: "founder@crivo.in"
  },
  { 
    name: "Hareeni S", 
    role: "COO and Co-Founder", 
    initial: "H",
    linkedin: "https://linkedin.com/in/hareeni-s",
    
    email: "coo@crivo.in"
  },
  { 
    name: "Gokulnath Sundaramurthi", 
    role: "CTO and Co-Founder", 
    initial: "G",
    linkedin: "https://linkedin.com/in/gokulnath-s",
   
    email: "cto@crivo.in"
  },
];

const coreTeam = [
  { 
    name: "Vasantha Kumar", 
    role: "Data Engineer & Frontend Developer", 
    email: "vasanth@crivo.in",
    image: "/VasanthaKumar.png",
    pos: { left: "15%", top: "20%" },
    github: "#",
    linkedin: "#",
    initial: "V"
  },
  { 
    name: "Dharshan", 
    role: "Team Coordinator", 
    email: "dharshan@crivo.in",
    image: "/Dharshan.png",
    pos: { left: "50%", top: "20%" },
    github: "#",
    linkedin: "#",
    initial: "D"
  },
  { 
    name: "Bharat Kumar", 
    role: "Flutter Developer", 
    email: "bharat@crivo.in",
    image: "/BharatKumar.jpeg",
    pos: { left: "85%", top: "20%" },
    github: "#",
    linkedin: "#",
    initial: "B",
    imgPos: "top"
  },
  { 
    name: "Praneesh", 
    role: "Backend Developer", 
    email: "praneesh@crivo.in",
    image: "/Praneesh.png",
    pos: { left: "15%", top: "80%" },
    github: "#",
    linkedin: "#",
    initial: "P"
  },
  { 
    name: "Thirumalai Kumar", 
    role: "ML Developer", 
    email: "thirumalai@crivo.in",
    image: "/ThirumalaiKumar.png",
    pos: { left: "50%", top: "80%" },
    github: "#",
    linkedin: "#",
    initial: "T"
  },
  { 
    name: "Antony Milton", 
    role: "ML Developer", 
    email: "antony@crivo.in",
    image: "/AntonyMilton.png",
    pos: { left: "85%", top: "80%" },
    github: "#",
    linkedin: "#",
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

function AboutUs() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-black/3 dark:bg-white/3 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Our Story</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            ABOUT <br /><span className="text-outline">CRIVO.</span>
          </h1>
          <p className="max-w-2xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            Seamlessly blending technology with unparalleled business vision — crafting intelligent solutions that combine innovation, technology, and vision for unmatched transformation success.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Who We Are</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-8">Rise your Brand with CRIVO</h2>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-6">
                Crivo Tech is a modern product tech company built for the digital era. We build robust, scalable platforms for businesses of all sizes — from ambitious startups to established enterprises — to power and grow their digital presence.
              </p>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-10">
                Our team combines deep technical expertise with strategic thinking to engineer premium products across web platforms, mobile apps, IoT systems, and automated pipelines. We don't just deliver software — we build long-term value rooted in product excellence.
              </p>
              <Link to="/book-meet">
                <button className="px-10 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform">
                  BUILD WITH US
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] flex flex-col justify-between gap-4">
                  <span className="text-6xl font-black leading-none">{s.value}</span>
                  <span className="text-black/50 dark:text-white/50 font-medium text-sm uppercase tracking-wider">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision (Alternate Side Consecutive) */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-x-12 gap-y-16 lg:gap-y-0 items-start">
            {/* Mission Column (Row 1, Column 1) */}
            <div className="flex flex-col gap-8 lg:col-start-1 lg:row-start-1">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Purpose</span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                  OUR <br /><span className="text-outline">MISSION</span>
                </h2>
              </div>
              <div className="group relative p-8 md:p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-2 hover:shadow-2xl w-full">
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                  To democratize technology by offering accessible and affordable solutions while nurturing the next generation of innovators through practical education. We strive to bridge the gap between complex digital challenges and intuitive, human-centric solutions. By championing open collaboration and continuous learning, we empower teams to scale with confidence and efficiency.
                </p>
              </div>
            </div>
            
            {/* Vision Column (Row 2, Column 2 - starts exactly where Mission ends) */}
            <div className="flex flex-col gap-8 lg:col-start-2 lg:row-start-2 lg:pl-16 lg:mt-[-2cm]">
              <div>
                <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Future</span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
                  OUR <br /><span className="text-outline">VISION</span>
                </h2>
              </div>
              <div className="group relative p-8 md:p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-2 hover:shadow-2xl w-full lg:max-w-[480px]">
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                  To create a world where technology is affordable, accessible, and backed by a workforce skilled through real-world experience. We envision a future where high-quality engineering and enterprise-grade tools are accessible to every builder and organization. By fostering a diverse global community of skilled creators, we aim to drive positive, lasting change across the tech ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">The People</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              OUR <br /><span className="text-outline">TEAM.</span>
            </h2>
          </div>
          <div>
            <h6 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8">
              LEADERS
            </h6>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaders.map((t, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] text-center hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 hover:-translate-y-2 hover:shadow-xl flex flex-col justify-between h-full">
                <div>
                  <div className="w-16 h-16 rounded-full bg-black/6 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:text-white dark:group-hover:text-black">
                    {t.initial}
                  </div>
                  <h4 className="font-black text-lg tracking-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{t.name}</h4>
                  <p className="text-black/40 dark:text-white/40 text-sm mt-1 group-hover:text-white/60 dark:group-hover:text-black/50 transition-colors duration-500">{t.role}</p>
                </div>
                
                {/* Social icons */}
                <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-black/5 dark:border-white/5 group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-500">
                  <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                  </a>
                
                  <a href={`mailto:${t.email}`} className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <br></br>
          <br></br>
          <div className="mt-12">
            <h6 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8">
              CORE TEAM
            </h6>
          </div>

          {/* Desktop Layout (Futuristic Network Flow - Transparent Backdrop) */}
          <div className="relative w-full h-[1050px] hidden lg:block z-10 my-12">
            {/* SVG Connecting Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Backing connection paths (grey/black in light mode, dark grey in dark mode) */}
              <path d="M 50 50 V 20 H 15" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
              <path d="M 50 50 V 20" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
              <path d="M 50 50 V 20 H 85" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
              <path d="M 50 50 V 80 H 15" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
              <path d="M 50 50 V 80" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />
              <path d="M 50 50 V 80 H 85" className="stroke-black/15 dark:stroke-zinc-800" strokeWidth="0.4" fill="none" />

              {/* Glowing active circuit paths (animated dashes - dark/light responsive) */}
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
            {coreTeam.map((t, i) => (
              <div
                key={i}
                className="absolute group p-[1px] w-[280px] transition-all duration-500 hover:-translate-y-2 z-10"
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
                    {/* Member image with full color and max clarity */}
                    <div className="w-full h-56 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden relative mb-5 border border-black/5 dark:border-white/5">
                      <TeamMemberImage
                        src={t.image}
                        alt={t.name}
                        initial={t.initial}
                        position={t.imgPos}
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

          {/* Mobile/Tablet Layout (Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-8 mt-12">
            {coreTeam.map((t, i) => (
              <div
                key={i}
                className="group relative p-[1px] w-full max-w-[340px] mx-auto transition-all duration-500 hover:-translate-y-2"
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
                    {/* Member image with full color and max clarity */}
                    <div className="w-full h-56 bg-zinc-100 dark:bg-zinc-900 rounded-xl overflow-hidden relative mb-5 border border-black/5 dark:border-white/5">
                      <TeamMemberImage
                        src={t.image}
                        alt={t.name}
                        initial={t.initial}
                        position={t.imgPos}
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
      </section>

      {/* CTA */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Work With Us</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10">
            GET STARTED WITH <br /><span className="text-outline">CRIVO TODAY.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book-meet">
              <button className="px-12 py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-base tracking-wide">
                BOOK A MEET
              </button>
            </Link>
            <a href="mailto:info@crivo.in">
              <button className="px-12 py-5 border border-black/20 dark:border-white/20 font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-base">
                EMAIL US
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutUs;
