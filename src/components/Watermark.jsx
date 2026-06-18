import { useEffect, useState } from 'react';

export default function Watermark() {
  const [info, setInfo] = useState('');

  useEffect(() => {
    const now = new Date();
    const date = `${now.getDate().toString().padStart(2,'0')}/${(now.getMonth()+1).toString().padStart(2,'0')}/${now.getFullYear()}`;
    const time = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;

    const lang = navigator.language || 'unknown';
    const tz   = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';
    const ua   = (navigator.userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)[\/\s][\d.]+/) || [''])[0];
    const res  = `${window.screen.width}×${window.screen.height}`;

    setInfo(`crivo.in · ${date} ${time} · ${ua} · ${res} · ${tz} · ${lang}`);
  }, []);

  if (!info) return null;

  // Sparse grid — 5 cols × 6 rows = 30 tiles, spread wide
  const COLS = 5;
  const ROWS = 6;
  const tiles = Array.from({ length: COLS * ROWS });

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {tiles.map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        return (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${col * 22 - 4}%`,
              top: `${row * 18 - 2}%`,
              transform: 'rotate(-28deg)',
              fontSize: '9px',
              fontFamily: 'monospace',
              fontWeight: 400,
              letterSpacing: '0.03em',
              whiteSpace: 'nowrap',
              color: 'white',
              mixBlendMode: 'difference',
              opacity: 0.1,
            }}
          >
            {info}
          </span>
        );
      })}
    </div>
  );
}
