import { Link } from 'react-router-dom';
import Footer from '../components/Home/footer';

const pillars = [
  { number: "01", title: "Innovation-Driven Solutions", desc: "We focus on creating forward-thinking digital experiences that adapt to the latest technologies by embracing cutting-edge tools and strategies that keep your business ahead of the curve." },
  { number: "02", title: "Holistic Approach", desc: "Seamlessly integrating every aspect of your digital presence — from web development and mobile apps to IoT automation and marketing strategies — all under one roof." },
  { number: "03", title: "Data-Backed Results", desc: "Every strategy we implement is driven by precise insights and analytics to optimise performance, reduce waste, and maximise ROI for your business." },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "4",   label: "Core Services" },
  { value: "5+",  label: "Years Experience" },
];

const team = [
  { name: "Gokul Nath", role: "Founder & CEO", initial: "G" },
  { name: "Design Team", role: "UI/UX & Branding", initial: "D" },
  { name: "Dev Team", role: "Engineering", initial: "E" },
  { name: "Growth Team", role: "Marketing & Strategy", initial: "M" },
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

      {/* Why Choose Crivo */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Our Difference</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              WHY CHOOSE <br /><span className="text-outline">CRIVO?</span>
            </h2>
            <p className="mt-6 text-black/50 dark:text-white/50 text-lg max-w-lg">Where Innovation Meets Solutions: Explore Our Offerings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700">
                <span className="text-5xl font-black text-black/10 dark:text-white/10 group-hover:text-white/10 dark:group-hover:text-black/10 transition-colors duration-500 leading-none block mb-8 select-none">{p.number}</span>
                <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{p.title}</h3>
                <p className="text-black/50 dark:text-white/50 leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/60 transition-colors duration-500">{p.desc}</p>
              </div>
            ))}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <div key={i} className="group p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] text-center hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700">
                <div className="w-16 h-16 rounded-full bg-black/6 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center text-2xl font-black mx-auto mb-6 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                  {t.initial}
                </div>
                <h4 className="font-black text-lg tracking-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{t.name}</h4>
                <p className="text-black/40 dark:text-white/40 text-sm mt-1 group-hover:text-white/60 dark:group-hover:text-black/50 transition-colors duration-500">{t.role}</p>
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
