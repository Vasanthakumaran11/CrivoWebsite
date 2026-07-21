import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  MailOpen,
  Users,
  LogOut,
  Lock,
  User,
  Trash2,
  CheckCircle,
  ExternalLink,
  FileText,
  Settings,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FolderOpen,
  BarChart2,
  Globe,
  Monitor,
  Activity,
  Clock
} from 'lucide-react';

// Only these three accounts may authenticate into the console.
// NOTE: this runs entirely client-side — anyone can read these credentials
// out of the deployed JS bundle. This gate keeps casual visitors out of the
// UI, it is not a substitute for real server-side authentication.
const AUTHORIZED_ACCOUNTS = {
  'bharani456@gmail.com': 'Bharani@crivo',
  'bs.gokulnath18@gmail.com': 'Gokul@crivo',
  'vasanthakumaran0011@gmail.com': 'Vasanth@crivo',
};

// Umami analytics dashboard URL. Set VITE_UMAMI_URL in .env to override for production.
const UMAMI_URL = import.meta.env.VITE_UMAMI_URL || 'http://127.0.0.1:3006';

// The only 3 accounts that can ever sign in (see AUTHORIZED_ACCOUNTS above),
// each with a fixed role. This is a static roster, not an editable list —
// there's no "invite" flow since login is hardcoded to exactly these three.
const ADMIN_ROSTER = [
  { email: 'bharani456@gmail.com', role: 'Founder' },
  { email: 'bs.gokulnath18@gmail.com', role: 'Developer' },
  { email: 'vasanthakumaran0011@gmail.com', role: 'Editor' },
];

// Best-effort "who's online" tracking via localStorage. This only sees tabs/
// windows open in THIS browser on THIS device — there's no backend, so true
// cross-device presence isn't possible without one.
const PRESENCE_KEY = 'crivo_admin_presence';
const LAST_LOGIN_KEY = 'crivo_admin_last_login';
const PRESENCE_HEARTBEAT_MS = 4000;
const PRESENCE_STALE_MS = 10000;

function readJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}
function readPresence() { return readJSON(PRESENCE_KEY); }
function writePresence(map) { localStorage.setItem(PRESENCE_KEY, JSON.stringify(map)); }
function readLastLogins() { return readJSON(LAST_LOGIN_KEY); }
function writeLastLogins(map) { localStorage.setItem(LAST_LOGIN_KEY, JSON.stringify(map)); }

function formatRelativeTime(ts) {
  if (!ts) return 'Never';
  const diff = Date.now() - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}

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

export default function AdminDashboard() {
  const navigate = useNavigate();
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('crivo_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return sessionStorage.getItem('crivo_admin_email') || '';
  });

  // Login form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active view tab state
  const [activeTab, setActiveTab] = useState('content');

  // Dynamic dashboard lists (local state storage)
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

  // Modal / Drawer visibility controls
  const [showStudio, setShowStudio] = useState(false);
  const [studioActiveSchema, setStudioActiveSchema] = useState('faqs'); // faqs, products, settings
  const [showUmami, setShowUmami] = useState(false);

  const [faqEditId, setFaqEditId] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Ticks periodically so the presence/last-login display below re-evaluates
  const [presenceTick, setPresenceTick] = useState(0);

  // Heartbeat: mark this account "present" while the dashboard tab is open,
  // and clear it on unmount (tab close/navigate away isn't always caught,
  // hence PRESENCE_STALE_MS as a fallback so a crashed tab doesn't stay
  // "Active" forever).
  useEffect(() => {
    if (!isAuthenticated || !adminEmail) return;

    const beat = () => {
      const presence = readPresence();
      presence[adminEmail] = Date.now();
      writePresence(presence);
      setPresenceTick(t => t + 1);
    };
    beat();
    const interval = setInterval(beat, PRESENCE_HEARTBEAT_MS);

    const onStorage = (e) => {
      if (e.key === PRESENCE_KEY || e.key === LAST_LOGIN_KEY) setPresenceTick(t => t + 1);
    };
    window.addEventListener('storage', onStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
      const presence = readPresence();
      delete presence[adminEmail];
      writePresence(presence);
    };
  }, [isAuthenticated, adminEmail]);

  // Generate background particles deterministically to avoid impure functions during render
  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const left = ((i * 17) % 100);
      const top = ((i * 23) % 100);
      const size = (((i * 7) % 20) / 10) + 1; // 1px to 3px
      const duration = ((i * 3) % 8) + 7; // 7s to 15s
      const delay = -((i * 13) % 10); // -10s to 0s
      return {
        id: i,
        left: `${left}%`,
        top: `${top}%`,
        size: `${size}px`,
        duration: `${duration}s`,
        delay: `${delay}s`,
      };
    });
  }, []);

  // Handle authentication — only the three authorized accounts may sign in
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }
    const email = username.trim().toLowerCase();
    if (AUTHORIZED_ACCOUNTS[email] !== password) {
      setLoginError('Invalid email or password. Access is restricted to authorized personnel.');
      return;
    }
    setIsAuthenticated(true);
    setAdminEmail(email);
    sessionStorage.setItem('crivo_admin_auth', 'true');
    sessionStorage.setItem('crivo_admin_email', email);
    setPassword('');
    setLoginError('');

    const lastLogins = readLastLogins();
    lastLogins[email] = Date.now();
    writeLastLogins(lastLogins);
  };

  // Handle logout — the presence heartbeat effect's cleanup clears this
  // account's "online" marker when isAuthenticated flips to false below.
  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    setAdminEmail('');
    sessionStorage.removeItem('crivo_admin_auth');
    sessionStorage.removeItem('crivo_admin_email');
  };

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

  // Render Login Authorization Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center relative overflow-hidden font-sans p-6">
        {/* Particle BG */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map(p => (
            <div
              key={p.id}
              className="absolute bg-white/40 rounded-full animate-float-particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                animationDuration: p.duration,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none z-0"></div>

        {/* Form container */}
        <div className="relative z-10 w-full max-w-md bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center font-bold text-white text-xl mb-4">
              C
            </div>
            <h1 className="text-2xl font-black uppercase tracking-widest" style={{ fontFamily: "'Outfit', sans-serif" }}>Crivo</h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1 font-bold">Admin Console Gate</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {loginError && (
              <div className="flex items-center gap-2 p-3.5 bg-white/5 border border-white/20 text-white text-xs rounded-xl">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-[9px] font-mono tracking-widest uppercase text-white/50">Username or Email</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@crivo.in"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-white/45 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[9px] font-mono tracking-widest uppercase text-white/50">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-4 h-4 text-white/30" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.02] border border-white/10 focus:border-white/45 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white hover:bg-white/90 text-black font-black rounded-2xl text-xs uppercase tracking-widest transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              Authorize <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <p className="text-[10px] text-white/30 leading-relaxed max-w-xs mx-auto">
                Access is restricted to authorized personnel only.
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Render Admin Dashboard Screen (Authenticated)
  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-hidden font-sans select-text">
      {/* Dynamic Star/Particle BG */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute bg-white/40 rounded-full animate-float-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 w-full">
        
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 backdrop-blur-3xl flex flex-col justify-between shrink-0 z-20">
          
          {/* Header */}
          <div>
            <div className="p-6 flex items-center gap-3.5 border-b border-white/5">
              <div className="w-9 h-9 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center font-bold text-white text-base">
                C
              </div>
              <div className="text-left">
                <div className="font-black text-sm tracking-widest uppercase">Crivo</div>
                <div className="text-[9px] uppercase tracking-wider text-white/40 font-semibold mt-0.5">Admin Console</div>
              </div>
            </div>

            {/* Menu */}
            <nav className="p-4 space-y-1.5 text-left">
              {[
                { id: 'content', label: 'Content Management', icon: LayoutDashboard },
                { id: 'analytics', label: 'Visitor Analytics', icon: TrendingUp },
                { id: 'submissions', label: 'Submissions', icon: MailOpen },
                { id: 'users', label: 'Admin Users', icon: Users },
              ].map(item => {
                const IconComp = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setShowStudio(false);
                      setShowUmami(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 ${
                      active && !showStudio
                        ? 'bg-white/10 border border-white/10 text-white shadow-inner shadow-white/5'
                        : 'border border-transparent text-white/55 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 ${active && !showStudio ? 'text-white' : 'text-white/40'}`} />
                    <span>{item.label}</span>
                    {active && !showStudio && <span className="ml-auto w-1 h-3 bg-white rounded-full"></span>}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile / Logout footer */}
          <div className="p-4 border-t border-white/5 bg-black/20 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/25 flex items-center justify-center font-bold text-xs text-white">
                  {adminEmail[0]}
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-wide truncate max-w-[110px]">{adminEmail}</div>
                </div>
              </div>
              <button 
                onClick={handleLogoutClick}
                className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-transparent hover:border-white/5"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto z-10 relative">
          
          {/* Main header block */}
          <header className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-black/10 backdrop-blur-md">
            <div className="text-left">
             
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {showUmami ? 'Umami Analytics Dashboard' : showStudio ? 'Sanity Studio Preview' : `${activeTab.replace('_', ' ')} Console`}
              </h2>
            </div>
            
            
          </header>

          <div className="flex-1 p-8 md:p-12 overflow-y-auto">
            {/* Show dynamic tabs based on selections */}

            {/* MOCK SANITY STUDIO OVERLAY VIEW */}
            {showStudio ? (
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
            ) : (
              <div className="space-y-8 animate-page-transition">
                {/* 1. CONTENT MANAGEMENT VIEW */}
                {activeTab === 'content' && (
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
                )}

                {/* 2. VISITOR ANALYTICS VIEW */}
                {activeTab === 'analytics' && (
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
                )}

                {/* 3. SUBMISSIONS VIEW */}
                {activeTab === 'submissions' && (
                  <div className="space-y-8 text-left">
                    <div className="text-left font-sans">
                     
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Inbound Submissions
                      </h1>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
                        Book-a-Meet and contact form submissions are handled by Web3Forms — view and manage them there.
                      </p>
                    </div>

                    <div className="p-12 border border-dashed border-white/10 rounded-[2rem] text-center">
                      <MailOpen className="w-8 h-8 text-white/20 mx-auto mb-4" />
                      
                      <a
                        href="https://web3forms.com/dashboard"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all hover:bg-white/90 active:scale-95"
                      >
                        Open Web3Forms Dashboard <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                )}

                {/* 4. ADMIN USERS VIEW */}
                {activeTab === 'users' && (
                  <div className="space-y-8 text-left">
                    <div className="text-left font-sans">
                      
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Admin Users
                      </h1>
                      
                    </div>

                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-xs text-white/40 uppercase font-mono tracking-wider font-bold">Admin Directory ({ADMIN_ROSTER.length})</span>
                    </div>

                    {/* Users list Table */}
                    <div className="bg-white/[0.02] border border-white/10 rounded-3xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/2 select-none text-[9px] uppercase tracking-widest text-white/40 font-mono">
                              <th className="p-4 pl-6">Administrator Address</th>
                              <th className="p-4">Assigned Role</th>
                              <th className="p-4">Connection State</th>
                              <th className="p-4 pr-6 text-right">Last Authorization</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-medium">
                            {(() => {
                              // Recomputed on every presenceTick / render — reads straight
                              // from localStorage rather than mirroring it into state.
                              void presenceTick;
                              const presence = readPresence();
                              const lastLogins = readLastLogins();
                              return ADMIN_ROSTER.map((adm) => {
                                const heartbeat = presence[adm.email];
                                const isActive = !!heartbeat && (Date.now() - heartbeat < PRESENCE_STALE_MS);
                                return (
                                  <tr key={adm.email} className="hover:bg-white/[0.01] transition-colors">
                                    <td className="p-4 pl-6 font-semibold">{adm.email}</td>
                                    <td className="p-4">
                                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-mono text-[9px] font-bold text-white/80">
                                        {adm.role}
                                      </span>
                                    </td>
                                    <td className="p-4">
                                      <span className={`inline-flex items-center gap-1.5 font-semibold ${isActive ? 'text-white' : 'text-white/40'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-white/15'}`}></span>
                                        {isActive ? 'Active' : 'Offline'}
                                      </span>
                                    </td>
                                    <td className="p-4 pr-6 text-right text-white/50">{formatRelativeTime(lastLogins[adm.email])}</td>
                                  </tr>
                                );
                              });
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
