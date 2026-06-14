import React, { useMemo } from 'react';

const StarsBackground = () => {
  const stars = useMemo(() => {
    const starCount = 65; // Sparse and distant but slightly populated
    const items = [];
    for (let i = 0; i < starCount; i++) {
      const top = Math.random() * 100; // Percentage
      const left = Math.random() * 100; // Percentage
      const size = Math.random() * 1.5 + 1.2; // 1.2px to 2.7px
      const duration = Math.random() * 3 + 2.5; // 2.5s to 5.5s duration (faster twinkling)
      const delay = Math.random() * 5; // 0s to 5s delay
      const opacity = Math.random() * 0.3 + 0.7; // Base opacity between 0.7 and 1.0

      items.push({
        id: i,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: opacity,
        },
      });
    }
    return items;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Background space gradient layers - black and grey space effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#27272a]/5 to-[#09090b]/10 dark:via-[#18181b]/40 dark:to-black transition-colors duration-300"></div>
      
      {/* Radial glow effects simulating distant grey/black nebulas */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#27272a]/5 dark:bg-[#27272a]/15 rounded-full blur-[140px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-[#09090b]/5 dark:bg-black/40 rounded-full blur-[160px]"></div>
      
      {/* Stars Container */}
      <div className="absolute inset-0 w-full h-full">
        {stars.map((star) => (
          <div
            key={star.id}
            style={star.style}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.95),_0_0_4px_rgba(255,255,255,0.8)] animate-twinkle pointer-events-none"
          />
        ))}
      </div>
    </div>
  );
};

export default StarsBackground;
