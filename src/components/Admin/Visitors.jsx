import { Activity, ArrowRight, BarChart2, ChevronRight, Clock, ExternalLink, Globe, Monitor, Users } from 'lucide-react';

// Umami analytics dashboard URL. Set VITE_UMAMI_URL in .env to override for production.
const UMAMI_URL = import.meta.env.VITE_UMAMI_URL || 'http://127.0.0.1:3006';

// Visitor Analytics tab, including its Umami iframe overlay. `showUmami`/
// `setShowUmami` are owned by AdminDashboard since the shared top header
// bar's title depends on them.
export default function Visitors({ showUmami, setShowUmami }) {
  return (
    <div className="space-y-8 text-left">

      {showUmami ? (
        /* ── Umami iframe overlay (mirrors Sanity Studio overlay) ── */
        <div className="space-y-8 animate-page-transition">
          <div className="p-6 md:p-8 bg-white/[0.02] border border-white/15 rounded-[2.5rem] relative overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">DASHBOARD EMBED</span>
                <h2 className="text-2xl font-black uppercase tracking-tight">Umami Analytics</h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={UMAMI_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all flex items-center gap-1.5"
                >
                  Open in Tab <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  onClick={() => setShowUmami(false)}
                  className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>

            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/10"
              style={{ height: '70vh' }}
            >
              <iframe
                src={UMAMI_URL}
                title="Umami Analytics Dashboard"
                className="w-full h-full bg-[#0d0d0d]"
                style={{ border: 'none', minHeight: '600px' }}
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur border border-white/10 rounded-lg text-[10px] text-white/50 font-mono pointer-events-none">
                {UMAMI_URL}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── Default analytics landing ── */
        <>
          <div className="text-left font-sans">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Visitor Analytics
            </h1>
            <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-3xl">
              Monitor site traffic, page views, unique visitors, referrers and geographic sessions — powered by Umami, a privacy-friendly open-source analytics platform.
            </p>
          </div>

          {/* Umami Status Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] gap-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-150"></div>

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shrink-0"></span>
              <p className="text-xs text-white/70 font-semibold leading-relaxed">
                Umami Analytics is live and collecting visitor data — open the dashboard to explore real-time statistics.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={UMAMI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all text-white flex items-center gap-2"
              >
                Open in Tab <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setShowUmami(true)}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all text-white shrink-0 flex items-center gap-2"
              >
                View Statistics <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Metric Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Page Views', desc: 'Total pages loaded by all visitors across the full site', icon: BarChart2 },
              { title: 'Unique Visitors', desc: 'Individual sessions tracked via privacy-safe hashed fingerprints', icon: Users },
              { title: 'Session Duration', desc: 'Average time visitors spend engaging with your content', icon: Clock },
              { title: 'Top Referrers', desc: 'Traffic sources — direct, organic search, social and campaigns', icon: Globe },
              { title: 'Geographic Data', desc: 'Countries and regions driving your inbound traffic', icon: Activity },
              { title: 'Device & Browser', desc: 'Breakdown of desktop, mobile, tablet, OS and browser usage', icon: Monitor },
            ].map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setShowUmami(true)}
                  className="border border-white/10 rounded-3xl bg-white/[0.02] p-8 flex flex-col justify-between min-h-[170px] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 relative overflow-hidden cursor-pointer group"
                >
                  <div className="space-y-3">
                    <IconComp className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                    <h3 className="text-xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/50 leading-relaxed font-light">
                      {card.desc}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-white transition-colors flex items-center gap-1 mt-6">
                    View in Umami <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
