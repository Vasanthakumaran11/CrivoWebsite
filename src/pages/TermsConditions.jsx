import Footer from '../components/Home/footer';
import StarsBackground from '../components/StarsBackground';

const termsSections = [
  {
    title: "Acceptance of Terms",
    body: [
      "By accessing or using the Crivo website (crivo.in), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our website.",
      "We reserve the right to update or modify these terms at any time. Continued use of the site following any changes constitutes your acceptance of the updated terms.",
    ],
  },
  {
    title: "Use of the Website",
    body: [
      "You may use this website for lawful purposes only. You agree not to use the site in any way that violates applicable laws, infringes on the rights of others, or disrupts the normal operation of the website.",
      "You may not attempt to gain unauthorised access to any part of the website or its underlying infrastructure. Scraping, crawling, or automated data collection without prior written consent is prohibited.",
    ],
  },
  {
    title: "Intellectual Property",
    body: [
      "All content on this website including text, graphics, logos, product names, and code is the property of Crivo and is protected by applicable intellectual property laws.",
      "You may not reproduce, distribute, modify, or create derivative works from any content on this site without prior written permission from Crivo.",
    ],
  },
  {
    title: "Products and Services",
    body: [
      "Information about Crivo's products (including Crivo CSMS and the AI Trip Planner) is provided for general informational purposes. Product features, pricing, and availability may change without notice.",
      "Nothing on this website constitutes a binding offer or guarantee of service unless confirmed in a separate written agreement between you and Crivo.",
    ],
  },
  {
    title: "Limitation of Liability",
    body: [
      "To the fullest extent permitted by applicable law, Crivo shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of, or inability to use, this website or its content.",
      "We do not warrant that the website will be available at all times, free of errors, or free from viruses or other harmful components. Use of the site is at your own risk.",
    ],
  },
  {
    title: "Third-Party Links",
    body: [
      "Our website may contain links to third-party websites. These links are provided for convenience only. Crivo does not endorse and is not responsible for the content, privacy practices, or terms of any third-party site.",
    ],
  },
  {
    title: "Governing Law",
    body: [
      "These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Tamil Nadu, India.",
    ],
  },
  {
    title: "Contact",
    body: [
      "For questions regarding these Terms & Conditions, please contact us at info@crivo.in.",
    ],
  },
];

export default function TermsConditions() {
  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden pt-36">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">Legal</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6">
            TERMS &amp; <br /><span className="text-outline">CONDITIONS.</span>
          </h1>
          <p className="text-black/40 dark:text-white/40 text-base">Last updated: June 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-12 pb-12 border-b border-black/10 dark:border-white/10">
            These Terms & Conditions govern your use of the Crivo website and any services or products described on it. Please read them carefully before using our site.
          </p>

          <div className="space-y-12">
            {termsSections.map((s, i) => (
              <div key={i} className="space-y-4">
                <h2 className="text-xl font-black tracking-tight text-[#111110] dark:text-white">{s.title}</h2>
                {s.body.map((p, j) => (
                  <p key={j} className="text-black/60 dark:text-white/60 leading-relaxed">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
