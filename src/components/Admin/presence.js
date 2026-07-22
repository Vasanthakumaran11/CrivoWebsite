// Shared "who's online" / "last login" persistence helpers, backed by
// localStorage. Best-effort only — this sees tabs/windows open in THIS
// browser on THIS device, so true cross-device presence isn't possible
// without a backend.
export const PRESENCE_KEY = 'crivo_admin_presence';
export const LAST_LOGIN_KEY = 'crivo_admin_last_login';
export const PRESENCE_HEARTBEAT_MS = 4000;
export const PRESENCE_STALE_MS = 10000;

function readJSON(key) {
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch { return {}; }
}

export function readPresence() { return readJSON(PRESENCE_KEY); }
export function writePresence(map) { localStorage.setItem(PRESENCE_KEY, JSON.stringify(map)); }
export function readLastLogins() { return readJSON(LAST_LOGIN_KEY); }
export function writeLastLogins(map) { localStorage.setItem(LAST_LOGIN_KEY, JSON.stringify(map)); }

export function isPresenceActive(heartbeat) {
  return !!heartbeat && (Date.now() - heartbeat < PRESENCE_STALE_MS);
}

export function formatRelativeTime(ts) {
  if (!ts) return 'Never';
  const diff = Date.now() - ts;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
  return `${Math.floor(diff / 86400000)}d ago`;
}
