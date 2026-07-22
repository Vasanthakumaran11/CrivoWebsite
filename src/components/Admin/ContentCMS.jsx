import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronRight, FolderOpen, Settings, Trash2 } from 'lucide-react';

const INITIAL_FAQS = [
  { id: 1, question: "What is OCPP and why is it important?", answer: "OCPP (Open Charge Point Protocol) is a global open standard that allows EV chargers (posts) and cloud management software (CSMS) to communicate seamlessly. It avoids vendor lock-in and enables smart charging scheduling." },
  { id: 2, question: "What is the difference between AC and DC charging?", answer: "AC chargers supply alternating current to the vehicle's onboard converter (7-22kW), whereas DC fast chargers bypass the onboard charger and feed direct current straight to the battery pack, enabling speeds from 50kW to over 350kW." },
  { id: 3, question: "Does Crivo support Dynamic Load Balancing?", answer: "Yes, our dynamic load balancing controllers monitor the total building electrical load and dynamically throttle power to active chargers in sub-second loops, avoiding grid overloading and costly utility upgrades." }
];

const INITIAL_PRODUCTS = [
  { id: 'prod-1', name: 'C-Smart 22', type: 'AC Charging Station', power: '22 kW', connectors: 'Type-2 Cable', price: '₹55,000' },
  { id: 'prod-2', name: 'C-Fast 120', type: 'DC Fast Charger', power: '120 kW', connectors: 'Dual CCS-2', price: '₹12,50_000' },
  { id: 'prod-3', name: 'C-Home 7', type: 'Residential Charger', power: '7.4 kW', connectors: 'Type-2 Socket', price: '₹32,000' }
];

// Content Management tab, including its Sanity Studio placeholder overlay.
// `showStudio`/`setShowStudio` are owned by AdminDashboard since the shared
// top header bar's title depends on them.
export default function ContentCMS({ showStudio, setShowStudio }) {
  const navigate = useNavigate();

  const [studioActiveSchema, setStudioActiveSchema] = useState('faqs'); // faqs, products, settings
  const [faqs, setFaqs] = useState(INITIAL_FAQS);
  const [products] = useState(INITIAL_PRODUCTS);
  const [siteSettings, setSiteSettings] = useState({
    supportEmail: 'support@crivo.in',
    salesEmail: 'sales@crivo.in',
    supportPhone: '+91 99887 76655',
    address: 'Crivo Technologies, Outer Ring Road, Bengaluru, India',
    twitter: 'https://twitter.com/crivopower',
    linkedin: 'https://linkedin.com/company/crivo'
  });

  const [faqEditId, setFaqEditId] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Add/Edit mock FAQ inside Sanity Studio overlay
  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (!faqQuestion || !faqAnswer) return;

    if (faqEditId) {
      setFaqs(prev => prev.map(f => f.id === faqEditId ? { ...f, question: faqQuestion, answer: faqAnswer } : f));
      setFaqEditId(null);
    } else {
      setFaqs(prev => [...prev, { id: Date.now(), question: faqQuestion, answer: faqAnswer }]);
    }
    setFaqQuestion('');
    setFaqAnswer('');
  };

  // MOCK SANITY STUDIO OVERLAY VIEW
  if (showStudio) {
    return (
      <div className="space-y-8 animate-page-transition">
        <div className="p-6 md:p-8 bg-white/[0.02] border border-white/15 rounded-[2.5rem] relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="text-left">
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block mb-1">DASHBOARD EMBED</span>
              <h2 className="text-2xl font-black uppercase tracking-tight">Sanity Studio</h2>
            </div>
            <button
              onClick={() => setShowStudio(false)}
              className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all"
            >
              Close Studio
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/5 pt-6 text-left">
            {/* Studio Navigation sidebar */}
            <div className="lg:col-span-3 space-y-2 border-r border-white/5 pr-4">
              <span className="text-[8px] font-mono tracking-widest uppercase text-white/30 block mb-3">SCHEMA TYPES</span>
              {[
                { id: 'faqs', label: 'FAQs List', count: faqs.length },
                { id: 'products', label: 'Product List', count: products.length },
                { id: 'settings', label: 'Global Settings', count: 6 },
              ].map(schema => (
                <button
                  key={schema.id}
                  onClick={() => setStudioActiveSchema(schema.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between ${
                    studioActiveSchema === schema.id
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{schema.label}</span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    studioActiveSchema === schema.id ? 'bg-black/10 text-black' : 'bg-white/5 text-white/40'
                  }`}>{schema.count}</span>
                </button>
              ))}
            </div>

            {/* Studio Main Workspace Editor */}
            <div className="lg:col-span-9 space-y-6">
              {studioActiveSchema === 'faqs' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Manage FAQs Schema</h3>

                  {/* FAQ form */}
                  <form onSubmit={handleSaveFaq} className="p-5 bg-white/[0.01] border border-white/5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-bold text-white/80">{faqEditId ? 'Edit FAQ Item' : 'Create New FAQ'}</h4>
                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Question</label>
                      <input
                        type="text"
                        required
                        value={faqQuestion}
                        onChange={(e) => setFaqQuestion(e.target.value)}
                        placeholder="e.g. Does Crivo support dynamic power grids?"
                        className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Answer</label>
                      <textarea
                        required
                        rows={3}
                        value={faqAnswer}
                        onChange={(e) => setFaqAnswer(e.target.value)}
                        placeholder="Describe the answer..."
                        className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-white text-black font-bold rounded-lg text-xs uppercase tracking-wide transition-all"
                      >
                        {faqEditId ? 'Update Field' : 'Insert Item'}
                      </button>
                      {faqEditId && (
                        <button
                          type="button"
                          onClick={() => {
                            setFaqEditId(null);
                            setFaqQuestion('');
                            setFaqAnswer('');
                          }}
                          className="px-4 py-2 bg-white/5 text-white/60 hover:text-white rounded-lg text-xs uppercase tracking-wide transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>

                  {/* List of current FAQs */}
                  <div className="space-y-3">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-white/30 block">LIVE WORKSPACE ITEMS ({faqs.length})</span>
                    {faqs.map(item => (
                      <div key={item.id} className="p-4 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl flex items-start justify-between gap-4 transition-all">
                        <div className="space-y-1.5">
                          <div className="text-xs font-bold text-white">{item.question}</div>
                          <div className="text-[11px] text-white/60 leading-relaxed font-light">{item.answer}</div>
                        </div>
                        <div className="flex gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setFaqEditId(item.id);
                              setFaqQuestion(item.question);
                              setFaqAnswer(item.answer);
                            }}
                            className="p-1.5 text-white/40 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setFaqs(prev => prev.filter(f => f.id !== item.id))}
                            className="p-1.5 text-white/30 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studioActiveSchema === 'products' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Manage Products Schema</h3>
                  <div className="p-4 border border-dashed border-white/10 rounded-2xl text-center py-8">
                    <FolderOpen className="w-8 h-8 text-white/30 mx-auto mb-2" />
                    <p className="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
                      Products metadata can be updated in real-time. Below are active models rendering on the main products slider.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map(prod => (
                      <div key={prod.id} className="p-4 bg-white/5 border border-white/5 rounded-xl text-left flex flex-col justify-between">
                        <div>
                          <div className="text-xs font-mono text-white/40 uppercase tracking-widest mb-1">{prod.type}</div>
                          <div className="text-base font-bold mb-3">{prod.name}</div>
                          <div className="space-y-1.5 text-xs text-white/60 mb-4">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span>Max Capacity:</span> <span className="font-bold text-white">{prod.power}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span>Interface:</span> <span className="font-bold text-white">{prod.connectors}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Price Point:</span> <span className="font-bold text-white">{prod.price}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Editable schema drawer for ${prod.name} placeholder`)}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-[10px] uppercase font-bold tracking-wider text-center transition-all"
                        >
                          Configure Schema Field
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studioActiveSchema === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">Global Site Configurations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Support Email Portal', key: 'supportEmail', val: siteSettings.supportEmail },
                      { label: 'Sales/Business Inquiries', key: 'salesEmail', val: siteSettings.salesEmail },
                      { label: 'Emergency Hotline', key: 'supportPhone', val: siteSettings.supportPhone },
                      { label: 'Headquarters Address', key: 'address', val: siteSettings.address },
                      { label: 'Twitter profile URL', key: 'twitter', val: siteSettings.twitter },
                      { label: 'LinkedIn profile URL', key: 'linkedin', val: siteSettings.linkedin }
                    ].map(field => (
                      <div key={field.key} className="space-y-1.5">
                        <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">{field.label}</label>
                        <input
                          type="text"
                          value={field.val}
                          onChange={(e) => setSiteSettings({ ...siteSettings, [field.key]: e.target.value })}
                          className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => alert('Configurations saved to static mock database')}
                    className="px-5 py-2.5 bg-white text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Update Workspace
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CONTENT MANAGEMENT VIEW
  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="text-left font-sans">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Content Management
        </h1>
        <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-3xl">
          Edit all website content — product details, blogs, FAQs, banners, team members, social links, contact emails. Powered by Sanity Studio, embedded at <code className="bg-white/5 border border-white/10 px-1.5 py-0.5 rounded font-mono text-xs">/admin/studio</code>.
        </p>
      </div>

      {/* Studio Embed Alert Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] gap-4 relative overflow-hidden group">
        {/* Accent glow on hover */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none transition-all group-hover:scale-150"></div>

        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shrink-0"></span>
          <p className="text-xs text-white/70 font-semibold leading-relaxed">
            Sanity Studio is being built — this embed is a placeholder for the current build phase.
          </p>
        </div>

        <button
          onClick={() => navigate('/admin/studio')}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-white/20 rounded-xl text-xs uppercase tracking-wider font-bold transition-all text-white shrink-0 flex items-center gap-2"
        >
          Open Studio <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Schema Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Product Cards', desc: 'Manage listed products & details', action: 'products' },
          { title: 'Blog Posts', desc: 'Write and publish articles', action: 'blogs' },
          { title: 'FAQs', desc: 'Edit frequently asked questions', action: 'faqs' },
          { title: 'Banners', desc: 'Homepage & campaign banners', action: 'banners' },
          { title: 'Team Members', desc: 'Bios, photos, roles', action: 'team' },
          { title: 'Site Settings', desc: 'Social links & contact emails', action: 'settings' }
        ].map((card, idx) => (
          <div
            key={idx}
            onClick={() => {
              setShowStudio(true);
              if (card.action === 'products') setStudioActiveSchema('products');
              else if (card.action === 'settings') setStudioActiveSchema('settings');
              else setStudioActiveSchema('faqs');
            }}
            className="border border-white/10 rounded-3xl bg-white/[0.02] p-8 flex flex-col justify-between min-h-[170px] hover:border-white/20 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(255,255,255,0.02)] transition-all duration-300 relative overflow-hidden cursor-pointer group"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {card.title}
              </h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                {card.desc}
              </p>
            </div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/30 group-hover:text-white transition-colors flex items-center gap-1 mt-6">
              Configure schema <ArrowRight className="w-3 h-3 translate-x-0 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
