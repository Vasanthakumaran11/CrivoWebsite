import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Footer from '../components/Home/footer';

const featured = {
  tag: "Web Development",
  title: "Why Your Business Needs a Performance-First Website in 2025",
  excerpt: "Page speed is no longer just a technical metric — it's a revenue lever. We break down how Core Web Vitals, server-side rendering, and smart caching directly impact your bottom line.",
  author: "Crivo Team",
  date: "May 28, 2025",
  readTime: "7 min read",
};

const posts = [
  { tag: "App Development", title: "React Native vs Flutter: Which One Is Right for Your Next App?", excerpt: "A no-BS comparison of the two dominant cross-platform frameworks in 2025 — performance, ecosystem, and team fit.", date: "May 20, 2025", readTime: "5 min read" },
  { tag: "Digital Marketing", title: "The SEO Playbook That Actually Works in the Age of AI Search", excerpt: "Google's SGE has changed everything. Here's how to stay visible when AI-generated answers dominate the SERPs.", date: "May 14, 2025", readTime: "6 min read" },
  { tag: "Business", title: "From MVP to Scale: How to Architect Your Digital Product for Growth", excerpt: "Most startups build fast and break later. We walk you through the decisions that prevent expensive rewrites at scale.", date: "May 8, 2025", readTime: "8 min read" },
  { tag: "Design", title: "The Psychology of UI: How Visual Hierarchy Drives Conversions", excerpt: "Small design decisions — font weight, whitespace, button placement — have outsized effects on user behaviour.", date: "Apr 30, 2025", readTime: "5 min read" },
  { tag: "Web Development", title: "Server Components, Edge Functions & the New Rendering Frontier", excerpt: "Next.js 14 and React Server Components have redrawn the lines between client and server. Here's what every dev needs to know.", date: "Apr 22, 2025", readTime: "6 min read" },
  { tag: "Digital Marketing", title: "Email Marketing Is Not Dead — You're Just Doing It Wrong", excerpt: "A deep-dive into segmentation, personalisation, and the automation flows that generate 42x ROI for our clients.", date: "Apr 15, 2025", readTime: "4 min read" },
];

const tagColors = {
  "Web Development":   "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20",
  "App Development":   "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20",
  "Digital Marketing": "bg-green-500/10 text-green-600 dark:text-green-300 border-green-500/20",
  "Business":          "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20",
  "Design":            "bg-pink-500/10 text-pink-600 dark:text-pink-300 border-pink-500/20",
};

function TagBadge({ tag }) {
  const cls = tagColors[tag] || "bg-black/5 dark:bg-white/10 text-black/60 dark:text-white/60 border-black/10 dark:border-white/20";
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${cls}`}>
      {tag}
    </span>
  );
}

function Blogs() {
  return (
    <div className="bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Insights & Ideas</span>
          <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-8">
            OUR <br /><span className="text-outline">BLOG</span>
          </h1>
          <p className="max-w-xl text-xl text-black/60 dark:text-white/60 leading-relaxed">
            Deep dives, practical guides, and honest opinions from the Crivo team.
          </p>
        </div>
      </section>

      {/* Featured post */}
      <section className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="group relative p-10 md:p-16 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-700 overflow-hidden cursor-pointer">
            <div className="absolute top-8 right-10 text-[8rem] font-black text-black/5 dark:text-white/5 leading-none select-none pointer-events-none group-hover:text-white/5 dark:group-hover:text-black/5">
              FEATURED
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-6 max-w-2xl">
                <TagBadge tag={featured.tag} />
                <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                  {featured.title}
                </h2>
                <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors duration-500">
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/50 transition-colors duration-500">
                  <span>{featured.author}</span><span>·</span><span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
                </div>
              </div>
              <div className="shrink-0">
                <div className="w-14 h-14 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center group-hover:border-white/30 dark:group-hover:border-black/20 transition-all duration-500">
                  <ArrowUpRight className="w-6 h-6 group-hover:text-white dark:group-hover:text-black transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="border-t border-black/10 dark:border-white/10 pb-32">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-14">
            <h3 className="text-4xl font-black tracking-tight">All Articles</h3>
            <span className="text-black/40 dark:text-white/40 text-sm">{posts.length} articles</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <div key={i} className="group flex flex-col justify-between p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-500 cursor-pointer overflow-hidden">
                <div className="space-y-5">
                  <TagBadge tag={post.tag} />
                  <h3 className="text-xl font-black tracking-tight leading-snug group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                    {post.title}
                  </h3>
                  <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/60 transition-colors duration-500">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/10 dark:border-white/10 group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-500">
                  <div className="flex items-center gap-3 text-xs text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/40 transition-colors duration-500">
                    <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-black/30 dark:text-white/30 group-hover:text-white/50 dark:group-hover:text-black/40 transition-colors duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-black/10 dark:border-white/10 py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Stay Updated</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            GET THE LATEST <br /><span className="text-outline">IN YOUR INBOX.</span>
          </h2>
          <p className="text-black/50 dark:text-white/50 mb-10 text-lg">No spam. Just deep dives, guides, and updates from the team.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 bg-white dark:bg-white/5 border border-black/20 dark:border-white/10 rounded-full text-[#111110] dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 focus:outline-none focus:border-black/40 dark:focus:border-white/30 transition-colors"
            />
            <button className="px-8 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform whitespace-nowrap text-sm tracking-wide">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Blogs;
