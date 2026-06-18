import Footer from '../Home/footer';
import StarsBackground from '../background/StarsBackground';
import FeaturedPost from './FeaturedPost';
import ArticlesGrid from './ArticlesGrid';
import Newsletter from './Newsletter';

function Blogs() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32 text-left">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Insights & Ideas</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            OUR <br /><span className="text-outline">BLOG</span>
          </h1>
          <p className="max-w-xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            From our freelancing roots to building EV infrastructure — deep dives, product thinking, and honest lessons from the Crivo team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <FeaturedPost />

      {/* Posts grid */}
      <ArticlesGrid />

      {/* Newsletter */}
      <Newsletter />

      <Footer />
    </div>
  );
}

export default Blogs;
