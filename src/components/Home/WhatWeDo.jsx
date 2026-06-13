import { Monitor, Smartphone, Cpu, BarChart3 } from 'lucide-react';

const services = [
  {
    title: "Web Development",
    icon: Monitor,
    description: "Crafting responsive, dynamic websites that engage and convert. We build high-performance platforms tailored to your brand and business goals.",
    number: "01"
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Creating intuitive, high-performance mobile apps for seamless experiences across iOS and Android that users love.",
    number: "02"
  },
  {
    title: "IoT Automation Services",
    icon: Cpu,
    description: "Smart IoT solutions for seamless automation and efficiency. We connect devices, data, and decisions to streamline your operations.",
    number: "03"
  },
  {
    title: "Digital Marketing",
    icon: BarChart3,
    description: "Targeted campaigns, SEO, content creation, and social media strategies that drive growth and convert visitors into loyal customers.",
    number: "04"
  }
];

function WhatWeDo() {
  return (
    <section id="services" className="py-32 bg-[#F8F7F2] dark:bg-transparent text-[#111110] dark:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50">Our Expertise</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-[#111110] dark:text-white">
              WHAT WE <br />
              <span className="text-outline">DO.</span>
            </h2>
          </div>
          <p className="text-black/50 dark:text-white/50 text-lg max-w-sm leading-relaxed md:text-right">
            Building digital ecosystems with dynamic websites, intuitive apps, IoT automation, and comprehensive marketing strategies that spark growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative h-full flex flex-col justify-between p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 overflow-hidden"
              >
                <div className="absolute top-10 right-10 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none select-none">
                  {service.number}
                </div>

                <div className="relative z-10 space-y-10">
                  <div className="w-14 h-14 rounded-2xl bg-black/6 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-[#111110] dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl font-bold tracking-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-black/50 dark:text-white/50 text-xl font-medium leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors duration-500 pr-12">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="mt-12 h-1 w-0 bg-white dark:bg-black group-hover:w-full transition-all duration-700"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/3 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-white/5 dark:group-hover:bg-black/10 transition-all duration-700"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
