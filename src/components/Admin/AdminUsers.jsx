import { useEffect, useState } from 'react';
import {
  PRESENCE_KEY,
  LAST_LOGIN_KEY,
  PRESENCE_HEARTBEAT_MS,
  readPresence,
  readLastLogins,
  isPresenceActive,
  formatRelativeTime,
} from './presence';

// The only 3 accounts that can ever sign in (see AUTHORIZED_ACCOUNTS in
// AdminLogin.jsx), each with a fixed role. This is a static roster, not an
// editable list — there's no "invite" flow since login is hardcoded to
// exactly these three.
const ADMIN_ROSTER = [
  { email: 'bharani456@gmail.com', role: 'Founder' },
  { email: 'bs.gokulnath18@gmail.com', role: 'Developer' },
  { email: 'vasanthakumaran0011@gmail.com', role: 'Editor' },
];

export default function AdminUsers() {
  // Ticks periodically so the presence/last-login display below re-evaluates.
  // Presence itself is written elsewhere (AdminDashboard's heartbeat effect);
  // this component only reads localStorage and re-renders on a timer/storage
  // events so it stays in sync without needing that writer to know about it.
  const [presenceTick, setPresenceTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPresenceTick(t => t + 1), PRESENCE_HEARTBEAT_MS);
    const onStorage = (e) => {
      if (e.key === PRESENCE_KEY || e.key === LAST_LOGIN_KEY) setPresenceTick(t => t + 1);
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
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
                  const isActive = isPresenceActive(heartbeat);
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
  );
}
