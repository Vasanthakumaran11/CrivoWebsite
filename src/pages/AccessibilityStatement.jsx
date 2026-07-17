import Footer from '../components/Home/footer';
import StarsBackground from '../components/background/StarsBackground';
import { useLegalPage } from '../hooks/useLegalPage';

const a11ySectionsDefault = [
  {
    title: "Our Commitment",
    body: [
      "Crivo is committed to ensuring our website is accessible to all users, including those with disabilities. We believe that everyone should be able to access information about our products and services without barriers.",
      "We are continuously working to improve the accessibility of crivo.in and align with internationally recognised accessibility standards.",
    ],
  },
  {
    title: "Standards We Follow",
    body: [
      "We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, motor, and cognitive impairments.",
    ],
  },
  {
    title: "Measures We Have Taken",
    isList: true,
    body: [
      "Sufficient colour contrast between text and background elements across both light and dark modes.",
      "Semantic HTML structure with appropriate heading hierarchy to support screen readers and assistive technologies.",
      "All interactive elements (buttons, links, form fields) are keyboard-navigable and include accessible labels.",
      "Images and icons that convey meaning include descriptive alt text or aria-labels.",
      "Forms include clearly associated labels and error states to assist users completing them.",
      "The site supports both light and dark themes, respecting user preference where possible.",
    ],
  },
  {
    title: "Known Limitations",
    body: [
      "While we strive for full accessibility, some areas of the site may still present challenges. In particular, certain animated and interactive components such as the testimonial scroll area and the live simulator sections may not be fully optimised for all assistive technologies.",
      "We are actively working to address these limitations in future updates.",
    ],
  },
  {
    title: "Feedback and Assistance",
    body: [
      "If you encounter any accessibility barriers on our website, or if you need information in an alternative format, please contact us at info@crivo.in. We welcome your feedback and will do our best to accommodate your needs.",
      "We aim to respond to accessibility-related requests within 5 business days.",
    ],
  },
  {
    title: "Enforcement",
    body: [
      "If you are not satisfied with our response to an accessibility concern, you may contact the relevant regulatory body in your jurisdiction. In India, matters relating to digital accessibility may be referred to the Ministry of Electronics and Information Technology (MeitY).",
    ],
  },
];

export default function AccessibilityStatement() {
  const { data } = useLegalPage('accessibilityStatement');
  const hero = data?.hero;
  const intro = data?.intro;
  const a11ySections = data?.sections?.length ? data.sections : a11ySectionsDefault;

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300">
      <StarsBackground />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 overflow-hidden pt-36">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-black/3 dark:bg-white/3 rounded-full blur-[150px] translate-x-1/4 -translate-y-1/4"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6">{hero?.eyebrow || 'Legal'}</span>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mb-6">
            {hero?.titleLine1 || 'ACCESSIBILITY'} <br /><span className="text-outline">{hero?.titleLine2 || 'STATEMENT.'}</span>
          </h1>
          <p className="text-black/40 dark:text-white/40 text-base">{hero?.lastUpdated || 'Last updated: June 2026'}</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          {intro && (
            <p className="text-black/60 dark:text-white/60 text-lg leading-relaxed mb-12 pb-12 border-b border-black/10 dark:border-white/10">
              {intro}
            </p>
          )}
          <div className="space-y-12">
            {a11ySections.map((s, i) => (
              <div key={i}>
                <h2 className="text-xl font-black tracking-tight text-[#111110] dark:text-white mb-4">{s.title}</h2>
                {s.isList ? (
                  <ul className="space-y-3">
                    {s.body.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-black/60 dark:text-white/60 leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black/30 dark:bg-white/30 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="space-y-4">
                    {s.body.map((p, j) => (
                      <p key={j} className="text-black/60 dark:text-white/60 leading-relaxed">{p}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
