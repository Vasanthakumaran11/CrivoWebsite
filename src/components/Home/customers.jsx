const testimonials = [
  {
    quote: "Crivo transformed our outdated platform into a blazing-fast web app. The team delivered beyond our expectations — on time and with zero compromises on quality.",
    name: "Arjun Mehta",
    role: "Founder, NexaRetail",
    initial: "A"
  },
  {
    quote: "From branding to deployment, Crivo handled everything seamlessly. Our app downloads tripled within two months of launch. Truly a world-class team.",
    name: "Priya Nair",
    role: "CEO, EduSpark",
    initial: "P"
  },
  {
    quote: "Their digital marketing campaigns didn't just bring traffic — they brought the right traffic. Our conversion rate jumped 4x in under 90 days.",
    name: "Rohan Desai",
    role: "CMO, GrowthStack",
    initial: "R"
  },
  {
    quote: "We had a tight deadline for our product launch. Crivo stepped in, built the entire platform, and had us live in 6 weeks. Remarkable execution.",
    name: "Sneha Krishnan",
    role: "Co-Founder, FinPulse",
    initial: "S"
  },
  {
    quote: "The support and maintenance team at Crivo feels like an in-house team. Fast response times, proactive monitoring — we haven't had a single outage since.",
    name: "Vikram Iyer",
    role: "CTO, LogiTrack",
    initial: "V"
  },
  {
    quote: "Crivo redesigned our entire digital presence and it shows. Customer engagement is up, bounce rate is down, and our brand finally looks the part.",
    name: "Ananya Sharma",
    role: "Head of Growth, Veyron Labs",
    initial: "A"
  }
];

function Customers() {
  return (
    <section className="py-32 bg-[#F8F7F2] dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-20">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50">Testimonials</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mt-4 text-[#111110] dark:text-white">
            WHAT CUSTOMERS <br />
            <span className="text-outline">SAY.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="group relative p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 flex flex-col justify-between gap-10"
            >
              <span className="text-6xl font-black text-black/10 dark:text-white/10 leading-none select-none">"</span>

              <p className="text-black/60 dark:text-white/70 text-base leading-relaxed -mt-6">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10">
                <div className="w-10 h-10 rounded-full bg-black/8 dark:bg-white/10 flex items-center justify-center text-[#111110] dark:text-white font-bold text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-[#111110] dark:text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-black/40 dark:text-white/40 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Customers;
