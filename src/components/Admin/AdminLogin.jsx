import { useState } from 'react';
import { AlertTriangle, ArrowRight, Lock, User } from 'lucide-react';
import StarsBackground from '../background/StarsBackground';
import { readLastLogins, writeLastLogins } from './presence';

// Only these three accounts may authenticate into the console.
// NOTE: this runs entirely client-side — anyone can read these credentials
// out of the deployed JS bundle. This gate keeps casual visitors out of the
// UI, it is not a substitute for real server-side authentication.
const AUTHORIZED_ACCOUNTS = {
  'bharani456@gmail.com': 'Bharani@crivo',
  'bs.gokulnath18@gmail.com': 'Gokul@crivo',
  'vasanthakumaran0011@gmail.com': 'Vasanth@crivo',
};

export default function AdminLogin({ onAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

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
    setPassword('');
    setLoginError('');

    const lastLogins = readLastLogins();
    lastLogins[email] = Date.now();
    writeLastLogins(lastLogins);

    onAuthenticated(email);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex overflow-hidden font-sans relative isolate" style={{ fontFamily: "'Outfit', sans-serif" }}>

      <StarsBackground count={35} />

      {/* ── LEFT PANEL ── */}
      <div className="hidden md:flex flex-col items-center justify-center relative w-1/2 overflow-hidden p-12 select-none">

        {/* CRIVO. outline text */}
        <div className="relative z-10 text-center">
          <h1
            className="font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(5rem, 9vw, 8rem)',
              color: 'transparent',
              WebkitTextStroke: '1.5px rgba(255,255,255,0.22)',
              letterSpacing: '-0.02em',
            }}
          >
            CRIVO.
          </h1>
          <p
            className="mt-5 text-[10px] tracking-[0.35em] uppercase text-white/25 font-semibold"
          >
            CONTROL. ACCESS. MANAGE.
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 md:w-1/2 flex items-center justify-center relative p-6">

        {/* subtle border separator on desktop */}
        <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-white/[0.06]" />

        {/* Card */}
        <div
          className="w-full max-w-sm relative z-10"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '1.75rem',
            padding: '2.5rem 2rem',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex flex-col items-center mb-8">
            
            
            <h2
              className="font-black uppercase tracking-[0.22em] text-white"
              style={{ fontSize: '1.35rem' }}
            >
              CRIVO
            </h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/35 mt-1 font-semibold">
              ADMIN CONSOLE GATE
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            {loginError && (
              <div
                className="flex items-center gap-2 p-3 text-white text-xs rounded-xl"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)' }}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Username field */}
            <div className="space-y-1.5">
              <label
                className="block text-[8.5px] font-semibold tracking-[0.28em] uppercase"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                USERNAME OR EMAIL
              </label>
              <div className="relative flex items-center">
                <User
                  className="absolute left-4 w-4 h-4"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                />
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@crivo.in"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.85rem',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.85rem',
                    paddingBottom: '0.85rem',
                    fontSize: '0.84rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.38)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-1.5">
              <label
                className="block text-[8.5px] font-semibold tracking-[0.28em] uppercase"
                style={{ color: 'rgba(255,255,255,0.38)' }}
              >
                PASSWORD
              </label>
              <div className="relative flex items-center">
                <Lock
                  className="absolute left-4 w-4 h-4"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                />
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.85rem',
                    paddingLeft: '3rem',
                    paddingRight: '1rem',
                    paddingTop: '0.85rem',
                    paddingBottom: '0.85rem',
                    fontSize: '0.84rem',
                    color: 'white',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(255,255,255,0.38)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
            </div>

            {/* Authorize button */}
            <button
              id="admin-authorize-btn"
              type="submit"
              style={{
                width: '100%',
                marginTop: '0.75rem',
                padding: '1rem',
                background: 'white',
                color: '#0d0d0d',
                borderRadius: '0.85rem',
                fontWeight: 900,
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'opacity 0.15s, transform 0.1s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              AUTHORIZE <ArrowRight style={{ width: 15, height: 15 }} />
            </button>

            <p
              className="text-center"
              style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.22)', marginTop: '0.75rem', lineHeight: 1.6 }}
            >
              Access is restricted to authorized personnel only.
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}
