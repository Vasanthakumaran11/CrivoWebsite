import { Link } from 'react-router-dom';
import { Target, Eye, Linkedin, Github, Mail } from 'lucide-react';
import Footer from '../components/Home/footer';

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
    github: "https://github.com/Bharanidharan-RN",
    email: "founder@crivo.in"
  },
  { 
    name: "Hareeni S", 
    role: "COO and Co-Founder", 
    initial: "H",
    linkedin: "https://linkedin.com/in/hareeni-s",
    github: "#",
    email: "coo@crivo.in"
  },
  { 
    name: "Gokulnath Sundaramurthi", 
    role: "CTO and Co-Founder", 
    initial: "G",
    linkedin: "https://linkedin.com/in/gokulnath-s",
    github: "https://github.com/Gokulnath-S",
    email: "cto@crivo.in"
  },
];

const coreTeam = [
  { 
    name: "Gokulnath Sundaramurthi", 
    role: "Frontend Developer", 
    email: "cto@crivo.in", 
    initial: "G",
    linkedin: "https://linkedin.com/in/gokulnath-s",
    github: "https://github.com/Gokulnath-S"
  },
  { 
    name: "Bharanidharan R N", 
    role: "Backend Developer", 
    email: "founder@crivo.in", 
    initial: "B",
    linkedin: "https://linkedin.com/in/bharanidharan-rn",
    github: "https://github.com/Bharanidharan-RN"
  },
  { 
    name: "Hareeni S", 
    role: "Operations Automation Manager", 
    email: "coo@crivo.in", 
    initial: "H",
    linkedin: "https://linkedin.com/in/hareeni-s",
    github: "#"
  },
  { 
    name: "Darshan T P", 
    role: "App Developer", 
    email: "apps@crivo.in", 
    initial: "D",
    linkedin: "#",
    github: "#"
  },
  { 
    name: "Pavi", 
    role: "Human Resources", 
    email: "hr@crivo.in", 
    initial: "P",
    linkedin: "#",
    github: "#"
  },
  { 
    name: "Badri Narayanan B R", 
    role: "Automation Engineer", 
    email: "automate@crivo.in", 
    initial: "B",
    linkedin: "#",
    github: "#"
  },
];

function AboutUs() {
  return (
    <div className="bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">

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
                Crivo Tech is a full-service digital agency built for the modern era. We partner with businesses of all sizes — from ambitious startups to established enterprises — to design, build, and grow their digital presence.
              </p>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-10">
                Our team combines deep technical expertise with strategic thinking to deliver solutions across web development, mobile apps, IoT automation, and digital marketing. We don't just deliver projects — we build long-term partnerships rooted in results.
              </p>
              <Link to="/book-meet">
                <button className="px-10 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform">
                  START A PROJECT
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

      {/* Our Mission & Vision (Floating Staggered Cards) */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Purpose & Future</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              MISSION <br /> 
            </h2>
          </div>
          <div className="flex flex-col gap-10 md:gap-16">
            {/* Our Mission Card */}
            <div className="group relative p-10 md:p-12 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-4 hover:shadow-2xl max-w-3xl mr-auto">
              <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/10 group-hover:bg-white/20 dark:group-hover:bg-black/10 flex items-center justify-center mb-8 transition-colors duration-500">
                <Target className="w-8 h-8 text-[#111110] dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-6 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">Our Mission</h3>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                To democratize technology by offering accessible and affordable solutions while nurturing the next generation of innovators through practical education.
              </p>
            </div>

            {/* Our Vision Card */}
            <div className="ml-auto">
             <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="text-outline ml-10">VISION.</span> 
            </h2> 
            </div>
            <div className="group relative p-10 md:p-12 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 shadow-xl hover:-translate-y-4 hover:shadow-2xl max-w-3xl ml-auto">
              <div className="w-16 h-16 rounded-2xl bg-black/5 dark:bg-white/10 group-hover:bg-white/20 dark:group-hover:bg-black/10 flex items-center justify-center mb-8 transition-colors duration-500">
                <Eye className="w-8 h-8 text-[#111110] dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
              </div>
              <h3 className="text-3xl font-black tracking-tight mb-6 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">Our Vision</h3>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors duration-500">
                To create a world where technology is affordable, accessible, and backed by a workforce skilled through real-world experience.
              </p>
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
                  {t.github !== "#" && (
                    <a href={t.github} target="_blank" rel="noopener noreferrer" className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                      <Github className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                    </a>
                  )}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreTeam.map((t, i) => (
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
                  {t.linkedin !== "#" && (
                    <a href={t.linkedin} target="_blank" rel="noopener noreferrer" className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                    </a>
                  )}
                  {t.github !== "#" && (
                    <a href={t.github} target="_blank" rel="noopener noreferrer" className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                      <Github className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                    </a>
                  )}
                  <a href={`mailto:${t.email}`} className="text-black/40 dark:text-white/40 group-hover:text-white/60 dark:group-hover:text-black/50 hover:text-black dark:hover:text-white transition-colors">
                    <Mail className="w-4 h-4 hover:scale-110 transition-transform duration-300" />
                  </a>
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
