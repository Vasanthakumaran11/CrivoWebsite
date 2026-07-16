const testimonialsDefault = [
  {
    quote: "Crivo transformed our outdated platform into a blazing-fast web app. The team delivered beyond our expectations — on time and with zero compromises on quality.",
    name: "Kumaravel",
    role: "National Chair – Innovation, CII Young Indians",
    initial: "K"
  },
  {
    quote: "From branding to deployment, Crivo handled everything seamlessly. Our app downloads tripled within two months of launch. Truly a world-class team.",
    name: "Kannan P.S.",
    role: "Executive Director, KonguTBI",
    initial: "K"
  },
  {
    quote: "Their digital marketing campaigns didn't just bring traffic — they brought the right traffic. Our conversion rate jumped 4x in under 90 days.",
    name: "Harris",
    role: "Twincord Technologies Private Limited",
    initial: "H"
  },
  {
    quote: "We had a tight deadline for our product launch. Crivo stepped in, built the entire platform, and had us live in 6 weeks. Remarkable execution.",
    name: "Kavin Kumaar",
    role: "Corporate Affairs, Zeon Electric Pvt Ltd",
    initial: "K"
  },
  {
    quote: "The support and maintenance team at Crivo feels like an in-house team. Fast response times, proactive monitoring — we haven't had a single outage since.",
    name: "Ragul",
    role: "Twincord Technologies Private Limited",
    initial: "R"
  },
];

import { useRef, useEffect } from 'react';
import { useHomePage } from '../../hooks/useHomePage';

function Client() {
  const { data } = useHomePage();
  const testimonials = data?.ourClients?.length ? data.ourClients : testimonialsDefault;

  const scrollRef = useRef(null);
  const animRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const speed = 0.6;
    const tick = () => {
      if (!isDragging.current) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      }
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    startScrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = startScrollLeft.current - (x - startX.current) * 1.2;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    startScrollLeft.current = scrollRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    scrollRef.current.scrollLeft = startScrollLeft.current - (e.touches[0].pageX - startX.current);
  };
  const onTouchEnd = () => { isDragging.current = false; };

  return (
    <section className="py-32 bg-[#F8F7F2] dark:bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="mb-20">

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mt-4 text-[#111110] dark:text-white">
            OUR <br />
            <span className="text-outline">CLIENTS.</span>
          </h2>
        </div>

        {/* Client Logos Grid */}
        <div className="py-16 px-8 bg-black/[0.03] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] mb-24 backdrop-xl">
          <div className="flex flex-wrap items-center justify-around gap-12 lg:gap-20">
            {/* Young Indians Logo */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="bg-[#181818] border border-white/5 px-6 py-5 rounded-lg flex flex-col items-center justify-center w-[140px] h-[110px] text-white shadow-xl hover:scale-105 transition-transform duration-300">
                <div className="flex items-baseline leading-none font-bold text-4xl mb-1 select-none">
                  <span>Y</span>
                  <span className="text-white/60 text-2xl ml-0.5">i</span>
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase text-white/95 text-center leading-none">Young Indians</span>
                <div className="mt-2 px-1.5 py-0.5 border border-white/20 rounded text-[6px] tracking-widest uppercase text-white/80 font-bold whitespace-nowrap">
                  WE CAN | WE WILL
                </div>
              </div>
            </div>

            {/* Ayon Logo */}
            <div className="flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-black dark:text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                    {/* Stylized leaf/mountain A */}
                    <path d="M12 2L2 22h4l3-6h6l3 6h4L12 2zm-1 10l3-6 3 6h-6z" />
                  </svg>
                  <span className="text-4xl font-semibold tracking-tight text-black dark:text-white font-serif">Ayon</span>
                </div>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/45 dark:text-white/45 mt-1">Clothing Brand</span>
              </div>
            </div>

            {/* VTS Logo */}
            <div className="flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
              <span className="text-5xl font-black tracking-[0.15em] text-black dark:text-white font-sans select-none">VTS</span>
            </div>

            {/* Twincord Logo */}
            <div className="flex flex-col items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
              <div className="flex flex-col items-center text-center">
                <span className="text-3xl font-extrabold tracking-tight text-black dark:text-white font-sans">Twincord</span>
                <span className="text-[9px] font-black tracking-widest uppercase text-black/45 dark:text-white/45 mt-1">Tech made simple</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Title */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none text-[#111110] dark:text-white">
              WHAT OUR CLIENTS <br />
              <span className="text-outline">SAY.</span>
            </h2>
        </div>

        {/* Testimonials — auto-scrolling marquee */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8F7F2] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8F7F2] dark:from-[#050505] to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab select-none"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="shrink-0 w-[320px] md:w-[380px] p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] flex flex-col justify-between gap-10"
              >
                <span className="text-6xl font-black text-black/10 dark:text-white/10 leading-none select-none">"</span>

                <p className="text-black/60 dark:text-white/70 text-base leading-relaxed -mt-6">
                  {t.quote}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-black/10 dark:border-white/10">
                  <div className="w-10 h-10 rounded-full bg-black/8 dark:bg-white/10 flex items-center justify-center text-[#111110] dark:text-white font-bold text-sm shrink-0">
                    {t.initial}
                  </div>
                  <div>
                    <p className="text-[#111110] dark:text-white font-semibold text-sm">{t.name}</p>
                    {t.role && <p className="text-black/40 dark:text-white/40 text-xs mt-0.5">{t.role}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Client;
