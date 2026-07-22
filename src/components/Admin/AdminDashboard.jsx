import { useEffect, useMemo, useState } from 'react';
import { LayoutDashboard, LogOut, MailOpen, TrendingUp, Users } from 'lucide-react';
import AdminLogin from './AdminLogin';
import ContentCMS from './ContentCMS';
import Visitors from './Visitors';
import UserSubmissions from './UserSubmissions';
import AdminUsers from './AdminUsers';
import { PRESENCE_HEARTBEAT_MS, readPresence, writePresence } from './presence';

export default function AdminDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('crivo_admin_auth') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    return sessionStorage.getItem('crivo_admin_email') || '';
  });

  // Active view tab state
  const [activeTab, setActiveTab] = useState('content');

  // Overlay visibility for the Content/Analytics tabs — kept here (rather
  // than inside those tab components) because the shared header bar's title
  // below depends on them.
  const [showStudio, setShowStudio] = useState(false);
  const [showUmami, setShowUmami] = useState(false);

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

  // Heartbeat: mark this account "present" while the dashboard tab is open,
  // and clear it on unmount (tab close/navigate away isn't always caught,
  // hence PRESENCE_STALE_MS in AdminUsers as a fallback so a crashed tab
  // doesn't stay "Active" forever).
  useEffect(() => {
    if (!isAuthenticated || !adminEmail) return;

    const beat = () => {
      const presence = readPresence();
      presence[adminEmail] = Date.now();
      writePresence(presence);
    };
    beat();
    const interval = setInterval(beat, PRESENCE_HEARTBEAT_MS);

    return () => {
      clearInterval(interval);
      const presence = readPresence();
      delete presence[adminEmail];
      writePresence(presence);
    };
  }, [isAuthenticated, adminEmail]);

  const handleLogoutClick = () => {
    setIsAuthenticated(false);
    setAdminEmail('');
    sessionStorage.removeItem('crivo_admin_auth');
    sessionStorage.removeItem('crivo_admin_email');
  };

  // Render Login Authorization Screen
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onAuthenticated={(email) => {
          setIsAuthenticated(true);
          setAdminEmail(email);
          sessionStorage.setItem('crivo_admin_auth', 'true');
          sessionStorage.setItem('crivo_admin_email', email);
        }}
      />
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
            <div className="space-y-8 animate-page-transition">
              {activeTab === 'content' && (
                <ContentCMS showStudio={showStudio} setShowStudio={setShowStudio} />
              )}
              {activeTab === 'analytics' && (
                <Visitors showUmami={showUmami} setShowUmami={setShowUmami} />
              )}
              {activeTab === 'submissions' && <UserSubmissions />}
              {activeTab === 'users' && <AdminUsers />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
