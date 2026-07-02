import Footer from '../components/Home/footer';
import StarsBackground from '../components/background/StarsBackground';

const policySections = [
  {
    title: "Information We Collect",
    body: [
      "We collect information you provide directly when you fill out contact forms, book a meeting, or apply to join our team. This includes your name, email address, phone number, and any message or details you submit.",
      "We may also collect basic usage data automatically, such as pages visited, time spent, and device type, to help us understand how our website is being used and improve the experience.",
    ],
  },
  {
    title: "How We Use Your Information",
    body: [
      "Information you submit through our forms is used solely to respond to your inquiry, schedule a meeting, or process your application. We do not sell, rent, or trade your personal information to third parties.",
      "Usage data is used in aggregate and anonymised form to improve our website performance and content. It is never linked to identifiable individuals.",
    ],
  },
  {
    title: "Third-Party Services",
    body: [
      "Our platform and infrastructure use trusted third-party services, including Amazon Web Services (AWS), Firebase, Vercel, and Razorpay. These providers have their own privacy policies and security standards. We only share data with them to the extent necessary to operate our services.",
      "Our website may use analytics tools. These tools may set cookies or collect browsing data in accordance with their own terms.",
    ],
  },
  {
    title: "Cookies",
    body: [
      "We use minimal, functional cookies to remember your theme preference (light/dark mode) and improve your browsing experience. We do not use advertising or tracking cookies.",
      "You can disable cookies through your browser settings at any time. Disabling cookies may affect certain preferences on the site.",
    ],
  },
  {
    title: "Data Retention",
    body: [
      "Form submissions and contact data are retained only as long as necessary to fulfil the purpose for which they were collected, or as required by applicable law.",
      "You may request deletion of your personal data at any time by contacting us at the address below.",
    ],
  },
  {
    title: "Your Rights",
    body: [
      "You have the right to access, correct, or delete the personal information we hold about you. You may also request that we stop processing your data for specific purposes.",
      "To exercise any of these rights, please contact us at info@crivo.in. We will respond within a reasonable timeframe.",
    ],
  },
  {
    title: "Contact",
    body: [
      "If you have any questions about this Privacy Policy or how we handle your data, please reach out to us at info@crivo.in or through the contact form on our Reach Us page.",
    ],
  },
];

export default function PrivacyPolicy() {
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
            PRIVACY <br /><span className="text-outline">POLICY.</span>
          </h1>
          <p className="text-black/40 dark:text-white/40 text-base">Last updated: June 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-12 pb-12 border-b border-black/10 dark:border-white/10">
            Crivo is committed to protecting your privacy. This policy explains what information we collect, how we use it, and your rights in relation to it. By using our website at crivo.in, you agree to the practices described below.
          </p>

          <div className="space-y-12">
            {policySections.map((s, i) => (
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
