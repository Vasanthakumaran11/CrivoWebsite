const partners = [
  { name: "Shopify" },
  { name: "Razorpay" },
  { name: "AWS" },
  { name: "Vercel" },
  { name: "Firebase" },
  { name: "Stripe" },
  { name: "HubSpot" },
  { name: "Figma" },
  { name: "MongoDB" },
  { name: "Cloudflare" },
];

function Partners() {
  return (
    <section className="py-20 overflow-hidden bg-[#F8F7F2] dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-black/50 dark:text-white/50 mb-14">
          Trusted Technologies &amp; Partners
        </p>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F7F2] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F7F2] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>

          <div className="flex gap-12 overflow-hidden">
            <div className="flex gap-12 animate-marquee shrink-0">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 px-8 py-4 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-full text-black/60 dark:text-white/40 font-semibold text-sm tracking-wide hover:text-[#111110] dark:hover:text-white/70 hover:border-black/30 dark:hover:border-white/20 transition-colors cursor-default whitespace-nowrap"
                >
                  {p.name}
                </div>
              ))}
            </div>
            <div className="flex gap-12 animate-marquee shrink-0">
              {[...partners, ...partners].map((p, i) => (
                <div
                  key={i}
                  className="shrink-0 px-8 py-4 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-full text-black/60 dark:text-white/40 font-semibold text-sm tracking-wide hover:text-[#111110] dark:hover:text-white/70 hover:border-black/30 dark:hover:border-white/20 transition-colors cursor-default whitespace-nowrap"
                >
                  {p.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partners;
