function Newsletter() {
  return (
    <section className="border-none py-32 text-center">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Stay Updated</span>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
          GET THE LATEST <br /><span className="text-outline">IN YOUR INBOX.</span>
        </h2>
        <p className="text-black/50 dark:text-white/50 mb-10 text-lg">No spam. EV tech deep dives, product updates, and insights from the Crivo team.</p>
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
  );
}

export default Newsletter;
