import { Link } from 'react-router-dom';

const statsList = [
  { value: "50+", label: "Supported Platforms" },
  { value: "10+", label: "Customers" },
  { value: "20+", label: "Employees" },
  { value: "10K+", label: "Daily Active Users" }
];

function StatsSection() {
  return (
    <section className="pt-8 pb-32 text-left">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Who We Are</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-8">Elevate your Brand with CRIVO</h2>
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
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {statsList.map((s, i) => (
              <div key={i} className="p-5 md:p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-between gap-3 md:gap-4">
                <span className="text-4xl md:text-6xl font-black leading-none">{s.value}</span>
                <span className="text-black/50 dark:text-white/50 font-medium text-xs md:text-sm uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
