import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Cpu, BarChart3, CheckCircle2 } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

const services = [
  {
    number: "01", icon: Monitor,
    title: "Web Platforms",
    tagline: "Responsive. Dynamic. Convert-Ready.",
    description: "Engineering responsive, scalable web applications that engage users and drive conversions. We build high-performance platforms engineered for your specific growth metrics — from standalone portals to full-scale enterprise software.",
    features: ["Custom UI/UX Architecture", "SEO-Optimised Structure", "API & Database Integrations", "Performance Optimisation"],
  },
  {
    number: "02", icon: Smartphone,
    title: "Mobile Products",
    tagline: "iOS & Android. Intuitive. High-Performance.",
    description: "Creating intuitive, native-grade mobile products that offer seamless user experiences. Our cross-platform and native solutions ensure your software runs flawlessly on every device.",
    features: ["Cross-Platform (React Native)", "Native iOS & Android", "Secure Backend Integration", "App Store Compliance"],
  },
  {
    number: "03", icon: Cpu,
    title: "IoT & Systems Automation",
    tagline: "Connect. Automate. Optimise.",
    description: "Smart IoT hardware and system integrations for seamless automation. We connect devices, data, and logic to optimize operations, reduce downtime, and cut costs.",
    features: ["Hardware & Sensor Integration", "Real-Time Dashboards", "Workflow Automation", "Predictive Modeling"],
  },
  {
    number: "04", icon: BarChart3,
    title: "Growth & Optimization",
    tagline: "Targeted. Data-Driven. Growth-Focused.",
    description: "Strategic campaign orchestration, search indexing, and conversion funnel optimization that scale product reach and build customer loyalty with clear ROI tracking.",
    features: ["Search Performance & indexing", "Growth Optimization Campaigns", "User Analytics & Cohorts", "Analytics & Reporting"],
  },
];

const whyUs = [
  { title: "Innovation-Driven Solutions", desc: "We focus on creating forward-thinking digital experiences that adapt to the latest technologies by embracing cutting-edge tools and strategies." },
  { title: "Holistic Approach", desc: "Seamlessly integrates every aspect of your digital presence — from web development and mobile apps to marketing strategies — under one roof." },
  { title: "Data-Backed Results", desc: "Every strategy implemented is driven by precise insights and analytics to optimise performance and maximise ROI for your business." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We deep-dive into your business, goals, and competition to build a solid foundation." },
  { step: "02", title: "Strategy", desc: "A tailored roadmap covering tech stack, timeline, milestones, and success metrics." },
  { step: "03", title: "Build", desc: "Design and development sprints with weekly demos so you always see progress." },
  { step: "04", title: "Launch", desc: "Rigorous testing, staging review, and a seamless go-live with zero downtime." },
  { step: "05", title: "Grow", desc: "Post-launch support, analytics reviews, and iteration cycles to keep you ahead." },
];

function Product() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">What We Offer</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            OUR <br /><span className="text-outline">PRODUCT</span>
          </h1>
          <p className="max-w-2xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            Building digital ecosystems with high-performance web platforms, intuitive mobile products, connected IoT systems, and automated growth structures.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="group grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] border border-black/10 dark:border-white/10 rounded-[2rem] overflow-hidden hover:border-black/20 dark:hover:border-white/20 transition-all duration-500">
                <div className="p-10 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 flex flex-col justify-between gap-8">
                  <span className="text-7xl font-black text-black/10 dark:text-white/10 leading-none select-none">{s.number}</span>
                  <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-black/50 dark:text-white/60" />
                  </div>
                </div>
                <div className="p-10 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-black/40 dark:text-white/40 mb-3">{s.tagline}</p>
                  <h3 className="text-3xl font-black tracking-tight mb-5">{s.title}</h3>
                  <p className="text-black/60 dark:text-white/60 leading-relaxed text-base">{s.description}</p>
                </div>
                <div className="p-10 flex flex-col justify-center gap-4">
                  {s.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-3 text-black/50 dark:text-white/60 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-black/30 dark:text-white/30 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Crivo */}
      <section className="py-32 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">Development for you</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              WHY CHOOSE <br /><span className="text-outline">CRIVO?</span>
            </h2>
            <p className="mt-6 text-black/50 dark:text-white/50 text-lg max-w-lg">Where Innovation Meets Solutions: Explore Our Offerings</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyUs.map((w, i) => (
              <div key={i} className="group p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700">
                <span className="text-5xl font-black text-black/10 dark:text-white/10 group-hover:text-white/10 dark:group-hover:text-black/10 transition-colors duration-500 leading-none block mb-8 select-none">0{i + 1}</span>
                <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{w.title}</h3>
                <p className="text-black/50 dark:text-white/50 leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/60 transition-colors duration-500">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-32 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">How We Work</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">THE PROCESS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 border border-black/10 dark:border-white/10 rounded-[2rem] overflow-hidden">
            {process.map((p, i) => (
              <div key={i} className={`p-8 flex flex-col gap-6 ${i < process.length - 1 ? 'border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10' : ''}`}>
                <span className="text-4xl font-black text-black/10 dark:text-white/10 select-none">{p.step}</span>
                <div>
                  <h3 className="text-xl font-black tracking-tight mb-2">{p.title}</h3>
                  <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Ready to Begin?</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10">
            GET STARTED WITH <br /><span className="text-outline">CRIVO TODAY.</span>
          </h2>
          <Link to="/book-meet">
            <button className="px-12 py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-base tracking-wide">
              BOOK A MEET
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Product;
