import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Cpu, BarChart3 } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

const products = [
  {
    title: "CRIVO CSMS",
    icon: Monitor,
    description: "CRIVO CSMS is an intelligent, cloud-based platform built to power the future of electric vehicle charging networks. Monitor, control, and manage your chargers seamlessly.",
    number: "01",
    status: "Active",
    route: "/product/csms"
  },
  {
    title: "Smart EV-Trip Planner",
    icon: Smartphone,
    description: "An AI based smart EV-Trip Planner that helps EV owners plan their trips efficiently. With features like route planning, charging station locator, and trip optimization, Smart EV-Trip Planner helps you make the most of your EV.",
    number: "02",
    status: "Active",
    route: "/product/planner"
  },
  {
    title: "Sector Logistics",
    icon: Cpu,
    description: "We are developing an innovative solution to optimize logistics operations specifically tailored for the Indian market.",
    number: "03",
    status: "Upcoming"
  }
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

          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            OUR <br /><span className="text-outline">PRODUCTS.</span>
          </h1>
          <p className="max-w-2xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            Building digital ecosystems with high-performance web platforms, intuitive mobile products, connected IoT systems, and automated growth structures.
          </p>
        </div>
      </section>

      {/* Products list with hover effects and status badges */}
      <section id="products" className="py-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              const CardTag = product.route ? Link : 'div';
              const cardProps = product.route ? { to: product.route } : {};
              return (
                <CardTag
                  key={index}
                  {...cardProps}
                  className="group relative h-full flex flex-col justify-between p-10 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 overflow-hidden"
                >
                  <div className="absolute top-10 right-10 text-8xl font-black opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none select-none">
                    {product.number}
                  </div>

                  <div className="relative z-10 space-y-10">
                    <div className="w-14 h-14 rounded-2xl bg-black/6 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#111110] dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-4xl font-bold tracking-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                        {product.title}
                      </h3>
                      <p className="text-black/50 dark:text-white/50 text-xl font-medium leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors duration-500 pr-12">
                        {product.description}
                      </p>
                      
                      <div className="flex pt-2">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wider uppercase transition-all duration-500 ${
                          product.status === 'Active'
                            ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-500/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 dark:group-hover:text-emerald-700 dark:group-hover:bg-emerald-500/10'
                            : 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-500/5 group-hover:bg-amber-500/20 group-hover:text-amber-300 dark:group-hover:text-amber-700 dark:group-hover:bg-amber-500/10'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            product.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                          }`} />
                          {product.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 h-1 w-0 bg-white dark:bg-black group-hover:w-full transition-all duration-700"></div>
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/3 dark:bg-white/5 rounded-full blur-[100px] group-hover:bg-white/5 dark:group-hover:bg-black/10 transition-all duration-700"></div>
                </CardTag>
              );
            })}
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
