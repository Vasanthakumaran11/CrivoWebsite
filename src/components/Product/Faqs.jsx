import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const faqsList = [
  { q: "What is CRIVO CSMS and how does it connect with hardware?", a: "CRIVO CSMS is an intelligent, cloud-based platform built to manage EV charging networks. It communicates with chargers using standard OCPP 1.6J and 2.0.1 protocols over WebSockets, allowing network operators to monitor statuses, run remote diagnostics, and control grid load distributions." },
  { q: "How does the Smart EV-Trip Planner predict vehicle range?", a: "Our AI Trip Planner uses multi-factor machine learning models that process real-world telemetry parameters: battery state of charge (SOC), cabin air conditioning loads, weather wind drag, elevation gradients (slopes), speed profiles, and traffic densities to estimate range precisely." },
  { q: "What is the Unified EV Wallet and how does it benefit users?", a: "The Unified EV Wallet aggregates balances across multiple Charge Point Operators (CPOs) such as Zeon, Statiq, and ChargeZone into a single active balance. EV drivers can initiate charging sessions and settle payments automatically across any network using their unified pool." },
  { q: "Are there APIs and SDKs available for custom integrations?", a: "Yes. CRIVO provides comprehensive REST APIs, WebSocket gateways, and mobile Flutter SDKs for both CSMS and the Trip Planner. Enterprise customers can integrate real-time telemetry, payment triggers, and route algorithms into their own applications." },
];

function Faqs() {
  const [showFaqs, setShowFaqs] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-32 bg-black/[0.01] dark:bg-white/[0.01] relative text-left">
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
            {faqsList.map((faq, i) => (
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
  );
}

export default Faqs;
