import { ArrowUpRight, Monitor, Smartphone, BarChart3, Settings, Palette } from 'lucide-react';

const services = [
  {
    title: "Website Development",
    icon: <Monitor className="w-8 h-8" />,
    description: "Creating high-performance, responsive websites with cutting-edge technologies to establish your digital presence.",
    number: "01"
  },
  {
    title: "App Development",
    icon: <Smartphone className="w-8 h-8" />,
    description: "Building intuitive mobile applications for iOS and Android that deliver seamless user experiences.",
    number: "02"
  },
  {
    title: "Digital Marketing",
    icon: <BarChart3 className="w-8 h-8" />,
    description: "Driving growth through data-driven strategies, SEO, and targeted campaigns that convert visitors into customers.",
    number: "03"
  },
  {
    title: "Support & Maintenance",
    icon: <Settings className="w-8 h-8" />,
    description: "Providing continuous technical support and updates to ensure your platforms remain secure and up-to-date.",
    number: "04"
  }
];

function WhatWeDo() {
  return (
    <section id="services" className="py-32 bg-transparent text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/50">Our Expertise</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
              WHAT WE <br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>DO.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative h-full flex flex-col justify-between p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white hover:border-white transition-all duration-700 overflow-hidden"
            >
              {/* Service Number Background */}
              <div className="absolute top-10 right-10 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                {service.number}
              </div>

              <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-start">
                  
                  
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold tracking-tight group-hover:text-black transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-white/50 text-xl font-medium leading-relaxed group-hover:text-black/70 transition-colors duration-500 pr-12">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Bottom Decoration */}
              <div className="mt-12 h-1 w-0 bg-black group-hover:w-full transition-all duration-700"></div>

              {/* Background Glow */}
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-[100px] group-hover:bg-black/10 transition-all duration-700"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;
