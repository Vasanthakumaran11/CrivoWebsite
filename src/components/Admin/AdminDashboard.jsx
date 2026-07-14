import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  TrendingUp, 
  MailOpen, 
  ShieldAlert, 
  Users, 
  LogOut, 
  Lock, 
  User, 
  Plus, 
  Search, 
  Trash2, 
  CheckCircle, 
  ExternalLink, 
  FileText, 
  Settings, 
  X, 
  ChevronRight, 
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  FolderOpen
} from 'lucide-react';

// Pre-defined initial lists for demo state
const INITIAL_ADMINS = [
  { email: 'you@crivo.in', role: 'Superadmin', status: 'Active (You)', lastLogin: 'Just now' },
  { email: 'devops@crivo.in', role: 'Developer', status: 'Active', lastLogin: '2 hours ago' },
  { email: 'content@crivo.in', role: 'Editor', status: 'Offline', lastLogin: '2 days ago' }
];

const INITIAL_SUBMISSIONS = [
  { id: 'SUB-4821', name: 'Arjun Mehta', contact: 'arjun@mehtalogistics.com', type: 'General', topic: 'Commercial Fleet Setup', message: 'Looking to set up 15 high-power charging slots at our main freight hub in Navi Mumbai. Need custom load management.', status: 'Pending', date: '2026-07-13 14:23' },
  { id: 'SUB-4822', name: 'Preeti Sharma', contact: 'preeti.s@techpark.in', type: 'General', topic: 'AC Charger Pricing', message: 'Requesting wholesale quote for 50 C-Smart22 AC chargers to deploy in our tech park basement.', status: 'Reviewed', date: '2026-07-13 11:05' },
  { id: 'SUB-4823', name: 'Vikram Singh', contact: 'v.singh@crivo.in', type: 'Career', topic: 'Hardware Firmware Intern', message: 'Applying for the Firmware Engineer role. Attached CV and github projects on RTOS and OCPP.', status: 'Pending', date: '2026-07-12 18:40' },
  { id: 'SUB-4824', name: 'Rajesh G.', contact: '9876543210', type: 'Emergency', topic: 'Trip Issue', message: 'Trip planner navigation failed to load charger occupancy status near Pune bypass. Current state of charge is low.', status: 'Resolved', date: '2026-07-12 15:10' }
];

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
  
  // Login form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active view tab state
  const [activeTab, setActiveTab] = useState('content');

  // Dynamic dashboard lists (local state storage)
  const [admins, setAdmins] = useState(INITIAL_ADMINS);
  const [submissions, setSubmissions] = useState(INITIAL_SUBMISSIONS);
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
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');

  const [showStudio, setShowStudio] = useState(false);
  const [studioActiveSchema, setStudioActiveSchema] = useState('faqs'); // faqs, products, settings

  const [faqEditId, setFaqEditId] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  // Submissions search & filters
  const [subFilter, setSubFilter] = useState('All');
  const [subSearch, setSubSearch] = useState('');

  // Security Logger State
  const [logFilter, setLogFilter] = useState('all');
  const [logs, setLogs] = useState(() => {
    const isAuthenticatedOnLoad = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('crivo_admin_auth') === 'true';
    if (isAuthenticatedOnLoad) {
      const baseTime = Date.now();
      return [
        { id: 1, type: 'info', timestamp: new Date(baseTime - 12000).toLocaleTimeString(), text: 'System diagnostics operational. Connection pool stable.' },
        { id: 2, type: 'info', timestamp: new Date(baseTime - 9000).toLocaleTimeString(), text: 'CORS check successful. Whitelisted domains loaded.' },
        { id: 3, type: 'warning', timestamp: new Date(baseTime - 6000).toLocaleTimeString(), text: 'Rate limit threshold checked: IP 103.112.5.4 bypassed admin rule.' },
        { id: 4, type: 'success', timestamp: new Date(baseTime - 3000).toLocaleTimeString(), text: 'Superadmin session established from browser context.' }
      ];
    }
    return [];
  });
  const logsEndRef = useRef(null);

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

  // Check localstorage for any actual submissions submitted during local testing
  useEffect(() => {
    if (isAuthenticated) {
      // Periodically append new mock system logs to look live
      const timer = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const logsPool = [
          { type: 'info', text: 'Telemetry synchronization complete. Cloud storage active.' },
          { type: 'info', text: 'Health ping returned status: 200 OK (latency: 14ms).' },
          { type: 'warning', text: 'Multiple read calls from subnet 192.168.1.0/24 - security rate monitoring is active.' },
          { type: 'info', text: 'WebSocket heartbeats acknowledged by edge controllers.' },
          { type: 'info', text: 'Sanity Studio sync queue: 0 pending changes.' }
        ];
        const randomLog = logsPool[Math.floor(Math.random() * logsPool.length)];
        setLogs(prev => [...prev, { id: Date.now(), ...randomLog, timestamp }]);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [isAuthenticated]);

  // Keep logs scrolled down
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Handle mock authentication
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter both username and password.');
      return;
    }
    // Accept any username & password
    setIsAuthenticated(true);
    sessionStorage.setItem('crivo_admin_auth', 'true');
    setLoginError('');

    // Initialize logs on login
    const baseTime = Date.now();
    setLogs([
      { id: 1, type: 'info', timestamp: new Date(baseTime - 12000).toLocaleTimeString(), text: 'System diagnostics operational. Connection pool stable.' },
      { id: 2, type: 'info', timestamp: new Date(baseTime - 9000).toLocaleTimeString(), text: 'CORS check successful. Whitelisted domains loaded.' },
      { id: 3, type: 'warning', timestamp: new Date(baseTime - 6000).toLocaleTimeString(), text: 'Rate limit threshold checked: IP 103.112.5.4 bypassed admin rule.' },
      { id: 4, type: 'success', timestamp: new Date(baseTime - 3000).toLocaleTimeString(), text: 'Superadmin session established from browser context.' }
    ]);
  };

  // Handle logout
  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('crivo_admin_auth');
    setLogs([]);
  };

  // Add mock admin
  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteEmail.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    const newAdmin = {
      email: inviteEmail,
      role: inviteRole,
      status: 'Pending',
      lastLogin: 'Never'
    };
    setAdmins(prev => [...prev, newAdmin]);
    setInviteEmail('');
    setShowInviteModal(false);
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

  // Delete submission
  const handleDeleteSubmission = (id) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  // Toggle status of submission
  const handleToggleSubStatus = (id) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Pending' ? 'Reviewed' : s.status === 'Reviewed' ? 'Resolved' : 'Pending';
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Filtered Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter(s => {
      const matchesType = subFilter === 'All' || s.type === subFilter;
      const matchesSearch = s.name.toLowerCase().includes(subSearch.toLowerCase()) || 
                            s.contact.toLowerCase().includes(subSearch.toLowerCase()) ||
                            s.topic.toLowerCase().includes(subSearch.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [submissions, subFilter, subSearch]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    if (logFilter === 'all') return logs;
    return logs.filter(l => l.type === logFilter);
  }, [logs, logFilter]);

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
                Any username and password are permitted for quick deployment verification.
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
                { id: 'security', label: 'Security Logs', icon: ShieldAlert },
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
                  SA
                </div>
                <div>
                  <div className="text-[11px] font-bold tracking-wide truncate max-w-[110px]">you@crivo.in</div>
                  <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold">Superadmin</div>
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
              <span className="text-[9px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-1">
                System Interface
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">
                {showStudio ? 'Sanity Studio Preview' : `${activeTab.replace('_', ' ')} Console`}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[9px] font-bold tracking-widest uppercase text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                Node Connected
              </span>
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
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-2">
                        SECTION 1
                      </span>
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
                    <div className="text-left font-sans">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-2">
                        SECTION 2
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Visitor Analytics
                      </h1>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
                        Monitor site traffic benchmarks, load times, access distributions, and geographic sessions.
                      </p>
                    </div>

                    {/* Metric Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Unique Visitors', val: '12,845', change: '+14.2%', plus: true },
                        { label: 'Avg Session Duration', val: '2m 45s', change: '+0.3s', plus: true },
                        { label: 'Bounce Rate', val: '34.2%', change: '-2.1%', plus: false },
                        { label: 'Conversion Rate', val: '3.8%', change: '+0.5%', plus: true }
                      ].map((metric, idx) => (
                        <div key={idx} className="p-6 bg-white/[0.02] border border-white/10 rounded-2xl">
                          <div className="text-[9px] uppercase tracking-wider text-white/40 font-bold mb-2">{metric.label}</div>
                          <div className="text-3xl font-black font-mono tracking-tight mb-2">{metric.val}</div>
                          <div className={`text-[10px] font-bold ${metric.plus ? 'text-white' : 'text-white/50'}`}>
                            {metric.change} vs last week
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Graphical Chart panel */}
                    <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">DAILY VISITOR SPECTRUM</span>
                        <span className="text-[8px] bg-white/10 px-2 py-0.5 rounded font-mono font-bold">7-DAY ROTATION</span>
                      </div>
                      <div className="h-[200px] flex items-end">
                        <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                          <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                              <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                            </linearGradient>
                          </defs>
                          {/* Grid Lines */}
                          <line x1="0" y1="50" x2="700" y2="50" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="100" x2="700" y2="100" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
                          <line x1="0" y1="150" x2="700" y2="150" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="3 3" />
                          
                          {/* Chart Path Area */}
                          <path
                            d="M 50,150 Q 150,80 250,130 T 450,70 T 650,40 L 650,200 L 50,200 Z"
                            fill="url(#gradient)"
                          />
                          {/* Chart Path Stroke */}
                          <path
                            d="M 50,150 Q 150,80 250,130 T 450,70 T 650,40"
                            fill="none"
                            stroke="rgba(255, 255, 255, 0.8)"
                            strokeWidth="2.5"
                          />
                          
                          {/* Chart Nodes */}
                          <circle cx="50" cy="150" r="4" fill="#fff" />
                          <circle cx="200" cy="100" r="4" fill="#fff" />
                          <circle cx="350" cy="100" r="4" fill="#fff" />
                          <circle cx="500" cy="70" r="4" fill="#fff" />
                          <circle cx="650" cy="40" r="4" fill="#fff" />
                          
                          {/* Label markers */}
                          <text x="50" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Mon</text>
                          <text x="150" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Tue</text>
                          <text x="250" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Wed</text>
                          <text x="350" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Thu</text>
                          <text x="450" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Fri</text>
                          <text x="550" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Sat</text>
                          <text x="650" y="190" fill="rgba(255, 255, 255, 0.3)" fontSize="10" textAnchor="middle">Sun</text>
                        </svg>
                      </div>
                    </div>

                    {/* Breakdown Distributions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Referral Channels */}
                      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl space-y-4">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">TRAFFIC ACQUISITION</span>
                        <div className="space-y-3.5">
                          {[
                            { name: 'Organic Search Engines', percent: 48, count: '6,165' },
                            { name: 'Direct Entries', percent: 26, count: '3,340' },
                            { name: 'Social Media Integrations', percent: 15, count: '1,926' },
                            { name: 'Referral Backlinks', percent: 11, count: '1,414' }
                          ].map((src, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-white/80">{src.name}</span>
                                <span>{src.percent}% ({src.count})</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-white h-full transition-all duration-1000" style={{ width: `${src.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Device Breakdown */}
                      <div className="p-6 bg-white/[0.02] border border-white/10 rounded-3xl space-y-4">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-white/40 block">HARDWARE PLATFORMS</span>
                        <div className="space-y-3.5">
                          {[
                            { name: 'Mobile Devices', percent: 62, count: '7,963' },
                            { name: 'Desktop/Workstation', percent: 31, count: '3,982' },
                            { name: 'Tablet Devices', percent: 7, count: '900' }
                          ].map((device, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-white/80">{device.name}</span>
                                <span>{device.percent}% ({device.count})</span>
                              </div>
                              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-white/60 h-full transition-all duration-1000" style={{ width: `${device.percent}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. SUBMISSIONS VIEW */}
                {activeTab === 'submissions' && (
                  <div className="space-y-8 text-left">
                    <div className="text-left font-sans">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-2">
                        SECTION 3
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Inbound Submissions
                      </h1>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
                        Access, review, and filter incoming customer inquiries, emergency assistance alerts, and hiring applications.
                      </p>
                    </div>

                    {/* Submissions Control Panel */}
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                      
                      {/* Search Bar */}
                      <div className="relative w-full md:w-80 flex items-center">
                        <Search className="absolute left-3.5 w-4 h-4 text-white/30" />
                        <input
                          type="text"
                          value={subSearch}
                          onChange={(e) => setSubSearch(e.target.value)}
                          placeholder="Search contact, name, topic..."
                          className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl pl-11 pr-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Filters */}
                      <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto shrink-0 justify-end">
                        {['All', 'General', 'Emergency', 'Career'].map(filterType => (
                          <button
                            key={filterType}
                            onClick={() => setSubFilter(filterType)}
                            className={`px-4 py-2 border rounded-xl text-[10px] uppercase tracking-wider font-bold transition-all ${
                              subFilter === filterType
                                ? 'bg-white text-black border-white'
                                : 'bg-white/5 text-white/55 border-white/10 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {filterType}
                          </button>
                        ))}
                      </div>

                    </div>

                    {/* Submissions List Card Layout */}
                    <div className="space-y-4">
                      {filteredSubmissions.length === 0 ? (
                        <div className="text-center p-12 border border-dashed border-white/10 rounded-2xl text-white/40 italic text-xs">
                          No matching submissions located for search filters.
                        </div>
                      ) : (
                        filteredSubmissions.map(sub => (
                          <div key={sub.id} className="p-6 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:border-white/15 transition-all">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                              <div className="space-y-1 text-left">
                                <div className="flex items-center gap-2">
                                  <h3 className="text-lg font-bold">{sub.name}</h3>
                                  <span className={`text-[8px] px-2 py-0.5 rounded font-mono font-bold uppercase ${
                                    sub.type === 'Emergency' ? 'bg-white text-black border border-white animate-pulse font-extrabold' :
                                    sub.type === 'Career' ? 'bg-white/10 text-white border border-white/25' :
                                    'bg-transparent text-white/50 border border-white/10'
                                  }`}>{sub.type}</span>
                                </div>
                                <div className="text-xs text-white/40 font-mono">{sub.contact} | {sub.date}</div>
                              </div>
                              <div className="flex items-center gap-2.5 shrink-0">
                                <button
                                  onClick={() => handleToggleSubStatus(sub.id)}
                                  className={`text-[9px] px-2.5 py-1.5 border font-bold uppercase tracking-wider rounded-xl transition-all ${
                                    sub.status === 'Pending' ? 'bg-transparent text-white/50 border-white/10 hover:border-white/30' :
                                    sub.status === 'Reviewed' ? 'bg-white/10 text-white border-white/20 hover:bg-white/15' :
                                    'bg-white text-black border-transparent font-extrabold hover:bg-white/90'
                                  }`}
                                >
                                  {sub.status}
                                </button>
                                <button
                                  onClick={() => handleDeleteSubmission(sub.id)}
                                  className="p-2 text-white/30 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20 rounded-xl transition-all"
                                  title="Remove Log"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="border-t border-white/5 pt-4 text-left">
                              <div className="text-xs font-bold text-white/80 mb-2 uppercase tracking-widest font-mono">Topic: {sub.topic}</div>
                              <p className="text-xs text-white/60 leading-relaxed font-light">{sub.message}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* 4. SECURITY LOGS VIEW */}
                {activeTab === 'security' && (
                  <div className="space-y-8 text-left">
                    <div className="text-left font-sans">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-2">
                        SECTION 4
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Security Logs
                      </h1>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
                        Monitor live diagnostics, request payloads, rate throttling audits, and auth transactions.
                      </p>
                    </div>

                    {/* Console Screen */}
                    <div className="border border-white/10 rounded-[2.5rem] bg-[#0A0A0C] overflow-hidden flex flex-col h-[400px]">
                      {/* Logger Header */}
                      <div className="px-6 py-3 bg-black/45 border-b border-white/5 flex items-center justify-between text-xs text-white/50">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                          <span className="font-mono text-[10px] tracking-wider uppercase font-bold text-white/60">Audit System Ingestion</span>
                        </div>
                        <div className="flex gap-2">
                          {['all', 'info', 'warning', 'success'].map(level => (
                            <button
                              key={level}
                              onClick={() => setLogFilter(level)}
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase border transition-all ${
                                logFilter === level 
                                  ? 'bg-white text-black border-white' 
                                  : 'bg-white/5 text-white/40 border-white/5 hover:text-white'
                              }`}
                            >
                              {level}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Log Console Output Stream */}
                      <div className="flex-1 p-6 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-3.5 scrollbar-thin scrollbar-thumb-white/10">
                        {filteredLogs.map(log => (
                          <div key={log.id} className="flex items-start gap-3">
                            <span className="text-white/30 shrink-0 select-none">[{log.timestamp}]</span>
                            <span className={`font-mono shrink-0 select-none ${
                               log.type === 'error' ? 'text-white underline decoration-white/30' :
                               log.type === 'warning' ? 'text-white/70' :
                               log.type === 'success' ? 'text-white font-bold' :
                               'text-white/50'
                             }`}>{log.type.toUpperCase()}:</span>
                            <span className="text-white/80 text-left">{log.text}</span>
                          </div>
                        ))}
                        <div ref={logsEndRef}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. ADMIN USERS VIEW */}
                {activeTab === 'users' && (
                  <div className="space-y-8 text-left">
                    <div className="text-left font-sans">
                      <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase font-bold block mb-2">
                        SECTION 5
                      </span>
                      <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none mb-4 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Admin Users
                      </h1>
                      <p className="text-sm md:text-base text-white/60 leading-relaxed font-light max-w-2xl">
                        Manage personnel permissions, edit access levels (Superadmin, Editor, Developer), and invite new console users.
                      </p>
                    </div>

                    {/* Invite User Trigger block */}
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-xs text-white/40 uppercase font-mono tracking-wider font-bold">Admin Directory ({admins.length})</span>
                      <button
                        onClick={() => setShowInviteModal(true)}
                        className="px-5 py-2.5 bg-white text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 hover:bg-white/90 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" /> Invite User
                      </button>
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
                            {admins.map((adm, idx) => (
                              <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                                <td className="p-4 pl-6 font-semibold">{adm.email}</td>
                                <td className="p-4">
                                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md font-mono text-[9px] font-bold text-white/80">
                                    {adm.role}
                                  </span>
                                </td>
                                <td className="p-4">
                                  <span className={`inline-flex items-center gap-1.5 font-semibold ${
                                    adm.status.includes('Active') ? 'text-white' : 'text-white/40'
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      adm.status.includes('Active') ? 'bg-white animate-pulse' : 'bg-white/15'
                                    }`}></span>
                                    {adm.status}
                                  </span>
                                </td>
                                <td className="p-4 pr-6 text-right text-white/50">{adm.lastLogin}</td>
                              </tr>
                            ))}
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

      {/* INVITE NEW ADMINISTRATOR MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#0F0F12] border border-white/10 rounded-[2rem] p-8 shadow-2xl text-left">
            <button 
              onClick={() => setShowInviteModal(false)}
              className="absolute top-6 right-6 p-1 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-xl font-bold uppercase tracking-tight mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Invite Admin User</h3>
            <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
              Invite a new developer, editor, or superadmin by inputting their credential email below.
            </p>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Email address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. content@crivo.in"
                  className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-white/20 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[8px] font-mono tracking-widest uppercase text-white/40">Access Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full bg-[#0d0d0d] border border-white/10 focus:border-white/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer transition-colors"
                >
                  <option value="Superadmin" className="text-black bg-white dark:text-white dark:bg-[#0c0c0e]">Superadmin</option>
                  <option value="Editor" className="text-black bg-white dark:text-white dark:bg-[#0c0c0e]">Editor</option>
                  <option value="Developer" className="text-black bg-white dark:text-white dark:bg-[#0c0c0e]">Developer</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white hover:bg-white/90 text-black font-black rounded-xl text-xs uppercase tracking-widest transition-all mt-6"
              >
                Send Invite Link
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
