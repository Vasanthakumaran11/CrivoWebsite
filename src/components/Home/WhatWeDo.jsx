const whyUs = [
  { title: "Innovation-Driven Solutions", desc: "We focus on creating forward-thinking digital experiences that adapt to the latest technologies by embracing cutting-edge tools and strategies." },
  { title: "Holistic Approach", desc: "We seamlessly integrate every aspect of your digital presence — from web development and mobile apps to marketing strategies — under one roof." },
  { title: "Data-Backed Results", desc: "Every strategy implemented is driven by precise insights and analytics to optimize performance and maximize ROI for your business." },
];

const process = [
  { step: "01", title: "Discovery", desc: "We deep-dive into your business, goals, and competition to build a solid foundation." },
  { step: "02", title: "Strategy", desc: "A tailored roadmap covering tech stack, timeline, milestones, and success metrics." },
  { step: "03", title: "Build", desc: "Design and development sprints with weekly demos so you always see progress." },
  { step: "04", title: "Launch", desc: "Rigorous testing, staging review, and a seamless go-live with zero downtime." },
  { step: "05", title: "Grow", desc: "Post-launch support, analytics reviews, and iteration cycles to keep you ahead." },
];

function WhatWeDo() {
  return (
    <section id="services" className="py-32 bg-[#F8F7F2] dark:bg-transparent text-[#111110] dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Why Choose Crivo */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50">Development for you</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-[#111110] dark:text-white">
              WHY CHOOSE <br />
              <span className="text-outline">CRIVO?</span>
            </h2>
          </div>
          <p className="text-black/50 dark:text-white/50 text-lg max-w-sm leading-relaxed md:text-right">
            Where Innovation Meets Solutions: Explore Our Offerings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {whyUs.map((w, i) => (
            <div key={i} className="group p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700">
              <span className="text-5xl font-black text-black/10 dark:text-white/10 group-hover:text-white/10 dark:group-hover:text-black/10 transition-colors duration-500 leading-none block mb-8 select-none">0{i + 1}</span>
              <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">{w.title}</h3>
              <p className="text-black/50 dark:text-white/50 leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/60 transition-colors duration-500">{w.desc}</p>
            </div>
          ))}
        </div>

        {/* Process */}
        <div className="pt-24 border-t border-black/10 dark:border-white/10">
          <div className="mb-20">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-4">How We Work</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-[#111110] dark:text-white">THE PROCESS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 border border-black/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden bg-white dark:bg-white/5">
            {process.map((p, i) => (
              <div 
                key={i} 
                className={`group p-8 flex flex-col gap-6 hover:bg-[#111110] dark:hover:bg-white transition-all duration-500 ${
                  i < process.length - 1 ? 'border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10' : ''
                }`}
              >
                <span className="text-4xl font-black text-black/10 dark:text-white/10 group-hover:text-white/15 dark:group-hover:text-black/15 transition-colors duration-500 select-none">
                  {p.step}
                </span>
                <div>
                  <h3 className="text-2xl font-black tracking-tight mb-4 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                    {p.title}
                  </h3>
                  <p className="text-black/50 dark:text-white/50 leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors duration-500">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default WhatWeDo;
