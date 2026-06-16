import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Monitor, Smartphone, Cpu, Check, ArrowRight, Activity } from 'lucide-react';
import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

// Products baseline definition
const productsList = [
  {
    title: "CRIVO CSMS",
    icon: Monitor,
    description: "CRIVO CSMS is an intelligent, cloud-based platform built to power the future of electric vehicle charging networks. Monitor, control, and manage your chargers seamlessly from a single centralized operations console.",
    number: "01",
    status: "Active",
    route: "/product/csms",
    features: [
      "Natively OCPP 1.6J and 2.0.1 compliant protocols",
      "Real-time charger status monitoring and alerts telemetry",
      "Automated billing cycles and dynamic grid load-balancing"
    ]
  },
  {
    title: "Smart EV-Trip Planner",
    icon: Smartphone,
    description: "An AI-powered trip planner that optimizes EV routes by predicting precise state-of-charge degradation based on speed profiles, cabin AC draws, terrain slopes, and ambient temperatures.",
    number: "02",
    status: "Active",
    route: "/product/planner",
    features: [
      "Multi-factor predictive range calculation algorithm",
      "Single consolidated CPO wallet balance payment gateway",
      "Live charging station occupant mapping along corridors"
    ]
  },
  {
    title: "Sector Logistics",
    icon: Cpu,
    description: "An upcoming enterprise logistics route and dispatch optimizer specifically tailored for Indian supply chain markets, fully integrated with electric vehicle charging infrastructures.",
    number: "03",
    status: "Upcoming",
    features: [
      "AI-driven automated dispatch queue allocation",
      "Tailored routing intelligence for Indian road constraints",
      "Direct integration with CSMS charging network reservations"
    ]
  }
];

const faqs = [
  { q: "What is CRIVO CSMS and how does it connect with hardware?", a: "CRIVO CSMS is an intelligent, cloud-based platform built to manage EV charging networks. It communicates with chargers using standard OCPP 1.6J and 2.0.1 protocols over WebSockets, allowing network operators to monitor statuses, run remote diagnostics, and control grid load distributions." },
  { q: "How does the Smart EV-Trip Planner predict vehicle range?", a: "Our AI Trip Planner uses multi-factor machine learning models that process real-world telemetry parameters: battery state of charge (SOC), cabin air conditioning loads, weather wind drag, elevation gradients (slopes), speed profiles, and traffic densities to estimate range precisely." },
  { q: "What is the Unified EV Wallet and how does it benefit users?", a: "The Unified EV Wallet aggregates balances across multiple Charge Point Operators (CPOs) such as Zeon, Statiq, and ChargeZone into a single active balance. EV drivers can initiate charging sessions and settle payments automatically across any network using their unified pool." },
  { q: "What is the upcoming Sector Logistics solution?", a: "Sector Logistics is our upcoming enterprise scheduling, dispatch, and routing optimizer tailored for supply chain fleets in India. It integrates natively with our EV charging networks (CSMS) to plan optimal routes and charging stops for commercial electric vehicle fleets." },
  { q: "Are there APIs and SDKs available for custom integrations?", a: "Yes. CRIVO provides comprehensive REST APIs, WebSocket gateways, and mobile Flutter SDKs for both CSMS and the Trip Planner. Enterprise customers can integrate real-time telemetry, payment triggers, and route algorithms into their own applications." },
];

function Product() {
  // Live Simulator States
  const [logisticsQueue, setLogisticsQueue] = useState(1248);
  const [showFaqs, setShowFaqs] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Sector Logistics Queue Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const offset = Math.floor((Math.random() - 0.5) * 4);
      setLogisticsQueue(prev => Math.max(1240, Math.min(1260, prev + offset)));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen">
      <StarsBackground />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-end pb-24 overflow-hidden pt-32">
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

      {/* Showcase list with alternating layouts */}
      <section id="products" className="py-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 space-y-36">
          
          {/* Product 01: CSMS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Info Column */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black tracking-tighter text-black/20 dark:text-white/25">01</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/20 dark:border-white/20 text-[10px] font-bold tracking-wider uppercase bg-black/5 dark:bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                  Active Product
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  {productsList[0].title}
                </h2>
                <p className="text-lg text-black/60 dark:text-white/65 leading-relaxed font-medium">
                  {productsList[0].description}
                </p>
              </div>

              {/* Specifications checklist */}
              <ul className="space-y-3 pt-2">
                {productsList[0].features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-black/70 dark:text-white/70">
                    <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/10 dark:border-white/5">
                      <Check className="w-3 h-3 text-black dark:text-white" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link to={productsList[0].route}>
                  <button className="px-8 py-3.5 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold rounded-full transition-all duration-300 text-xs tracking-widest uppercase flex items-center gap-2">
                    Explore Product <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Showcase Column (Right) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-[2.5rem] p-2 shadow-xl relative overflow-hidden backdrop-blur-xl group">
                <img 
                  src="/EV Charger.jpeg" 
                  alt="CRIVO CSMS EV Charging Hub Interface" 
                  className="rounded-[1.8rem] w-full object-cover filter grayscale contrast-[1.02] brightness-[0.98]"
                />
              </div>
            </div>
          </div>

          {/* Product 02: Trip Planner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Image Showcase Column (Left) */}
            <div className="lg:col-span-7 order-last lg:order-first">
              <div className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-[2.5rem] p-2 shadow-xl relative overflow-hidden backdrop-blur-xl group">
                <img 
                  src="/TripPlanner.png" 
                  alt="Smart EV-Trip Planner Interface" 
                  className="rounded-[1.8rem] w-full object-cover filter grayscale contrast-[1.02] brightness-[0.98]"
                />
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black tracking-tighter text-black/20 dark:text-white/25">02</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/20 dark:border-white/20 text-[10px] font-bold tracking-wider uppercase bg-black/5 dark:bg-white/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-pulse" />
                  Active Product
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
                  {productsList[1].title}
                </h2>
                <p className="text-lg text-black/60 dark:text-white/65 leading-relaxed font-medium">
                  {productsList[1].description}
                </p>
              </div>

              {/* Specifications checklist */}
              <ul className="space-y-3 pt-2">
                {productsList[1].features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-black/70 dark:text-white/70">
                    <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/10 dark:border-white/5">
                      <Check className="w-3 h-3 text-black dark:text-white" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link to={productsList[1].route}>
                  <button className="px-8 py-3.5 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold rounded-full transition-all duration-300 text-xs tracking-widest uppercase flex items-center gap-2">
                    Explore Product <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Product 03: Sector Logistics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Info Column */}
            <div className="lg:col-span-5 text-left space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-6xl font-black tracking-tighter text-black/20 dark:text-white/25">03</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/20 dark:border-white/20 text-[10px] font-bold tracking-wider uppercase text-black/50 dark:text-white/40 bg-transparent">
                  Upcoming Roadmap
                </span>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none text-black/75 dark:text-white/80">
                  {productsList[2].title}
                </h2>
                <p className="text-lg text-black/50 dark:text-white/50 leading-relaxed font-medium">
                  {productsList[2].description}
                </p>
              </div>

              {/* Specifications checklist */}
              <ul className="space-y-3 pt-2">
                {productsList[2].features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-black/50 dark:text-white/50">
                    <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/10 dark:border-white/5">
                      <Check className="w-3 h-3 text-black/40 dark:text-white/30" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link to="/reach-us">
                  <button className="px-8 py-3.5 border border-black/20 dark:border-white/20 text-black/60 dark:text-white/60 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-bold rounded-full transition-all duration-300 text-xs tracking-widest uppercase flex items-center gap-2">
                    Request Integration Scoping <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Interactive Dispatch Node Grid Column (Right) */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-[2.5rem] p-6 shadow-xl relative overflow-hidden backdrop-blur-xl group">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/[0.02] dark:from-white/[0.01] via-transparent to-transparent pointer-events-none" />
                
                {/* Visual network interface */}
                <div className="bg-black/95 dark:bg-[#0c0c0d] rounded-2xl border border-black/30 dark:border-white/5 p-5 text-white font-sans text-xs text-left space-y-4 shadow-inner min-h-[300px] flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] uppercase text-white/50 tracking-wider font-bold">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-white" />
                      <span>DISPATCH GRID // INDIAN_METRO_CORRIDOR</span>
                    </div>
                    <span>Optimizing...</span>
                  </div>

                  {/* Network Graph Map */}
                  <div className="relative flex-1 flex items-center justify-center py-6 min-h-[140px]">
                    {/* SVG paths representing optimized routing networks */}
                    <svg className="absolute inset-0 w-full h-full stroke-current text-white/20" fill="none">
                      <line x1="15%" y1="15%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                      <line x1="85%" y1="20%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                      <line x1="15%" y1="85%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                      <line x1="80%" y1="80%" x2="50%" y2="50%" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
                    </svg>

                    {/* Nodes */}
                    <div className="absolute top-[10%] left-[10%] flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-white border border-black rounded-full animate-pulse" />
                      <span className="text-[8px] font-mono text-white/40 mt-1">DELHI</span>
                    </div>
                    <div className="absolute top-[15%] right-[12%] flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-white border border-black rounded-full" />
                      <span className="text-[8px] font-mono text-white/40 mt-1">KOLKATA</span>
                    </div>
                    <div className="absolute bottom-[10%] left-[12%] flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-white border border-black rounded-full" />
                      <span className="text-[8px] font-mono text-white/40 mt-1">MUMBAI</span>
                    </div>
                    <div className="absolute bottom-[12%] right-[15%] flex flex-col items-center">
                      <div className="w-3.5 h-3.5 bg-white border border-black rounded-full animate-pulse" />
                      <span className="text-[8px] font-mono text-white/40 mt-1">CHENNAI</span>
                    </div>
                    
                    {/* Center Hub */}
                    <div className="absolute top-[45%] left-[46%] flex flex-col items-center z-10 bg-black/80 p-2 rounded-xl border border-white/15">
                      <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md border border-black">
                        <Cpu className="w-2.5 h-2.5 text-black" />
                      </div>
                      <span className="text-[8px] font-mono font-bold text-white mt-1">CSMS_ROUTER</span>
                    </div>
                  </div>

                  {/* Dispatch stats widget */}
                  <div className="grid grid-cols-2 gap-3 bg-white/5 rounded-xl p-3 border border-white/5 text-[10px] font-mono leading-relaxed">
                    <div>
                      <p className="text-white/40 text-[8px] uppercase font-bold tracking-wider mb-0.5">Transit Queue</p>
                      <p className="font-extrabold text-sm">{logisticsQueue} Orders</p>
                    </div>
                    <div>
                      <p className="text-white/40 text-[8px] uppercase font-bold tracking-wider mb-0.5">Route Efficiency</p>
                      <p className="font-extrabold text-sm text-white">+18.4% YoY</p>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-2 text-[9px] text-white/30 flex justify-between font-mono">
                    <span>Target Market: India Fleet Logistics</span>
                    <span>Integration: API-Plug</span>
                  </div>
                </div>

                {/* Status Float Widget */}
                <div className="absolute bottom-10 right-10 bg-white dark:bg-[#151516] border border-black/15 dark:border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md opacity-60">
                  <div className="w-9 h-9 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold">Module</p>
                    <p className="font-extrabold text-xs text-black dark:text-white">B2B Core Grid</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] relative">
        <div className="max-w-7xl mx-auto px-6 text-left space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-black/40 dark:text-white/40 block">PRODUCT DEPLOYMENT FAQS</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
                COMMON <br /><span className="text-outline">QUESTIONS.</span>
              </h2>
              <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed font-medium">
                Find quick answers regarding OCPP integration standards compliance, machine learning range calculations, data pipelines, and multi-CPO wallet setups.
              </p>
            </div>
            <div className="shrink-0 pt-4 md:pt-0">
              <button 
                onClick={() => setShowFaqs(!showFaqs)}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black hover:opacity-90 font-bold rounded-full transition-all duration-300 text-xs tracking-widest uppercase flex items-center gap-2 shadow-md"
              >
                {showFaqs ? "Hide Questions" : "View Questions"} <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${showFaqs ? 'rotate-90' : ''}`} />
              </button>
            </div>
          </div>

          {showFaqs && (
            <div className="space-y-4 max-w-4xl pt-6 transition-all duration-500 animate-[fadeIn_0.5s_ease-out]">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-white/5">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-black/3 dark:hover:bg-white/5 transition-colors">
                    <span className="font-bold text-lg pr-8">{faq.q}</span>
                    <span className={`text-black/45 dark:text-white/45 text-2xl font-light shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <div className="px-8 pb-6 text-black/60 dark:text-white/60 leading-relaxed border-t border-black/10 dark:border-white/10 pt-5 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 relative overflow-hidden">
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
