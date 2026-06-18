import { Link } from 'react-router-dom';
import Footer from '../Home/footer';
import StarsBackground from '../background/StarsBackground';
import ProductShowcase from './ProductShowcase';
import Faqs from './Faqs';

function Product() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen">
      <StarsBackground />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32 text-left">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-black/[0.02] dark:bg-white/[0.01] rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-left">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/40 dark:text-white/40 block mb-6">STANDALONE PRODUCTS INDEX</span>
          <h1 className="text-6xl md:text-[8.5rem] font-black tracking-tighter leading-none mb-8 uppercase">
            OUR <br /><span className="text-outline">PRODUCTS.</span>
          </h1>
          <p className="max-w-2xl text-xl text-black/60 dark:text-white/60 leading-relaxed font-medium">
            Building specialized modular systems. Natively compliant charging management, range-anxiety solving predictive routing, and optimized cargo logistics grids.
          </p>
        </div>
      </section>

      {/* Products Showcase alternate list */}
      <ProductShowcase />

      {/* FAQ Accordion Section */}
      <Faqs />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/40 dark:text-white/40 block">SCALING SOLUTIONS</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            INTEGRATE <br /><span className="text-outline">CRIVO TECHNOLOGY.</span>
          </h2>
          <p className="max-w-xl text-lg text-black/60 dark:text-white/60 mx-auto font-medium">
            Contact our engineering integration desk to design, deploy, and scale custom instances of our products.
          </p>
          <div className="pt-4">
            <Link to="/book-meet">
              <button className="px-12 py-4 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold rounded-full transition-all duration-300 text-sm tracking-wider uppercase">
                Book A Technical Meet
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Product;
