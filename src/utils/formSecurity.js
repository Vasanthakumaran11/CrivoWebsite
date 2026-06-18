const COOLDOWN_MS = 60_000; // 1 minute between submissions per form

export function canSubmit(formKey) {
  try {
    const last = localStorage.getItem(`crivo_submit_${formKey}`);
    if (!last) return true;
    return Date.now() - parseInt(last, 10) > COOLDOWN_MS;
  } catch {
    return true;
  }
}

export function recordSubmit(formKey) {
  try {
    localStorage.setItem(`crivo_submit_${formKey}`, Date.now().toString());
  } catch {}
}

export function secondsUntilNextSubmit(formKey) {
  try {
    const last = localStorage.getItem(`crivo_submit_${formKey}`);
    if (!last) return 0;
    const remaining = COOLDOWN_MS - (Date.now() - parseInt(last, 10));
    return remaining > 0 ? Math.ceil(remaining / 1000) : 0;
  } catch {
    return 0;
  }
}
