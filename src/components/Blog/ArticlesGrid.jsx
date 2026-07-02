import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TagBadge from './TagBadge';

const posts = [
  {
    tag: "Company",
    title: "From Freelance Studio to Product Company: Crivo's Journey into EV Tech",
    excerpt: "We spent years building websites, apps, and marketing campaigns for clients across industries. Here's the story of how that work gave us the tools — and the conviction — to build products that actually matter.",
    date: "June 10, 2026",
    readTime: "6 min read"
  },
  {
    tag: "IoT & Infrastructure",
    title: "OCPP Explained: The Open Protocol Powering Smart EV Charging Networks",
    excerpt: "OCPP 1.6J and 2.0.1 are the backbone of every cloud-managed EV charger. We break down how the protocol works, why it matters, and what operators need to understand before deploying infrastructure at scale.",
    date: "June 5, 2026",
    readTime: "8 min read"
  },
  {
    tag: "EV Tech",
    title: "Range Anxiety Is a Data Problem — Not a Battery Problem",
    excerpt: "Most EV owners overestimate how quickly their batteries drain. We explain why real-world range differs from rated specs, and how AI-powered trip planning finally closes the gap using terrain, weather, speed, and AC load data.",
    date: "May 28, 2026",
    readTime: "5 min read"
  },
  {
    tag: "Product",
    title: "Why India Needs a Unified EV Charging Wallet — And How We Built One",
    excerpt: "Indian EV drivers juggle 4–6 different apps just to charge their vehicles. Crivo's unified CPO wallet integrates Zeon, ChargeZone, Statiq, Jio-bp, and more into one seamless balance — no switching apps, no separate logins.",
    date: "May 20, 2026",
    readTime: "7 min read"
  },
  {
    tag: "Business",
    title: "What 50+ Client Projects Taught Us About Building a Digital Brand",
    excerpt: "Before Crivo built products, we built brands. From e-commerce platforms to mobile apps and performance marketing campaigns, here are the lessons that now drive every product decision we make.",
    date: "May 12, 2026",
    readTime: "6 min read"
  },
  {
    tag: "IoT & Infrastructure",
    title: "Cloud-Native EV Infrastructure: How We Architect for Scale",
    excerpt: "Running a CSMS at scale means managing thousands of concurrent WebSocket connections, real-time charger telemetry, and billing cycles simultaneously. Here's how we built a serverless architecture on AWS that handles it.",
    date: "May 3, 2026",
    readTime: "9 min read"
  },
];

function ArticlesGrid() {
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const handlePostClick = (post) => {
    if (!post.to) {
      setToastMessage(`"${post.title}" is in production. Check back soon!`);
    }
  };

  return (
    <section className="border-none pb-32 text-left">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-14">
          <h3 className="text-4xl font-black tracking-tight">All Articles</h3>
          <span className="text-black/40 dark:text-white/40 text-sm">{posts.length} articles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <div
              key={i}
              onClick={() => handlePostClick(post)}
              className="group flex flex-col justify-between p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-500 cursor-pointer overflow-hidden"
            >
              <div className="space-y-5">
                <TagBadge tag={post.tag} />
                <h3 className="text-xl font-black tracking-tight leading-snug group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                  {post.title}
                </h3>
                <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/60 transition-colors duration-500">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between mt-8 pt-6 border-none group-hover:border-white/10 dark:group-hover:border-black/10 transition-colors duration-500">
                <div className="flex items-center gap-3 text-xs text-black/40 dark:text-white/40 group-hover:text-white/50 dark:group-hover:text-black/60 transition-colors duration-500">
                  <span>{post.date}</span><span>·</span><span>{post.readTime}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-black/30 dark:text-white/30 group-hover:text-white/50 dark:group-hover:text-black/40 transition-colors duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 animate-fade-in-up">
          <div className="bg-[#111110]/90 dark:bg-white/95 text-white dark:text-black backdrop-blur-md border border-white/10 dark:border-black/10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-sm max-w-sm">
            <div className="w-2 h-2 rounded-full bg-current animate-ping opacity-75"></div>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </section>
  );
}

export default ArticlesGrid;
