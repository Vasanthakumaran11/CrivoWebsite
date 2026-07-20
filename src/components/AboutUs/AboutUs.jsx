import { Link } from 'react-router-dom';
import Footer from '../Home/footer';
import StarsBackground from '../background/StarsBackground';
import StatsSection from './StatsSection';
import MissionVision from './MissionVision';
import Leaders from './Leaders';
import CoreTeam from './CoreTeam';
import { useAboutPage } from '../../hooks/useAboutPage';

function AboutUs() {
  const { data } = useAboutPage();
  const hero = data?.hero;
  const cta = data?.cta;

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden pt-32 text-left">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[500px] bg-black/3 dark:bg-white/3 rounded-full blur-[160px] translate-x-1/3 -translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">{hero?.eyebrow || 'Our Story'}</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            {hero?.titleLine1 || 'ABOUT'} <br /><span className="text-outline">{hero?.titleLine2 || 'CRIVO.'}</span>
          </h1>
          <p className="max-w-2xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            {hero?.description || 'Seamlessly blending technology with unparalleled business vision to craft intelligent, innovative solutions for unmatched transformation success.'}
          </p>
        </div>
      </section>

      {/* Mission & Who We Are */}
      <StatsSection />

      {/* Our Mission & Vision */}
      <MissionVision />

      {/* Leadership Team */}
      <section className="pt-12 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <Leaders />
          
          <CoreTeam />
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-left">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">{cta?.eyebrow || 'Work With Us'}</span>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-10">
            {cta?.titleLine1 || 'GET STARTED WITH'} <br /><span className="text-outline">{cta?.titleLine2 || 'CRIVO TODAY.'}</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book-meet">
              <button className="px-12 py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-base tracking-wide">
                {cta?.ctaBookText || 'BOOK A MEET'}
              </button>
            </Link>
            <a href="mailto:info@crivo.in">
              <button className="px-12 py-5 border border-black/20 dark:border-white/20 font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-base">
                {cta?.ctaEmailText || 'EMAIL US'}
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
