import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import TagBadge from './TagBadge';
import { useBlogPosts } from '../../hooks/useBlogPosts';

const LIVE_SLUG = 'ev-charging-control-systems';

const featuredDefault = {
  tag: "IoT & Infrastructure",
  title: "Smart Charging Infrastructure: Demystifying EV Chargers & Their Control Systems",
  excerpt: "Behind every EV charger is a complex network of microcontrollers and cloud software. Discover how modern CSMS platforms orchestrate charging loads and communicate via OCPP — and why getting this right is the foundation of India's EV future.",
  author: "Crivo Power Lab",
  date: "June 13, 2026",
  readTime: "8 min read",
  to: `/blogs/${LIVE_SLUG}`
};

function FeaturedPost() {
  const { data } = useBlogPosts();
  const latest = data?.[0];
  const featured = latest
    ? {
        tag: latest.category || 'Crivo',
        title: latest.title,
        excerpt: latest.excerpt,
        author: latest.author || 'Crivo Team',
        date: latest.publishedAt
          ? new Date(latest.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : '',
        readTime: latest.readTime,
        to: latest.slug === LIVE_SLUG ? `/blogs/${latest.slug}` : null,
      }
    : featuredDefault;

  const Wrapper = featured.to ? Link : 'div';
  const wrapperProps = featured.to ? { to: featured.to } : {};

  return (
    <section className="border-none text-left">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <Wrapper {...wrapperProps} className="group block relative p-10 md:p-16 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 overflow-hidden cursor-pointer">
          <div className="absolute top-8 right-10 text-[8rem] font-black text-black/5 dark:text-white/5 leading-none select-none pointer-events-none group-hover:text-white/5 dark:group-hover:text-black/5">
            FEATURED
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-6 max-w-2xl text-left">
              <TagBadge tag={featured.tag} />
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                {featured.title}
              </h2>
              <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors duration-500">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/65 transition-colors duration-500">
                <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
              </div>
            </div>
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:border-white/30 dark:group-hover:border-black/20 transition-all duration-500">
                <ArrowUpRight className="w-6 h-6 group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
}

export default FeaturedPost;
