import React, { useState, useEffect } from 'react';

function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [pipelineActive, setPipelineActive] = useState(false);

  // Dynamic progress counting up smoothly
  useEffect(() => {
    let start = null;
    const duration = 1200; // Snappy 1.2s load duration for a fast web experience

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const val = Math.min(100, Math.floor((elapsed / duration) * 100));
      
      setProgress(val);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        // When progress hits 100%, activate the output pipeline glow
        setPipelineActive(true);
        // Let the pipeline active state render for a brief moment, then fade out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500); // match transition duration
        }, 300);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [onComplete]);

  // SVG circle parameters
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;



  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none pointer-events-auto transition-all duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-3xl flex flex-col items-center px-4">
        {/* Horizontal Loader Widget */}
        <div className="flex items-center justify-center w-full gap-0 relative">
          
          {/* Left Track Line (Incoming Pipeline / Buffer) */}
          
          </div>

          {/* Central Circular Progress Core */}
          <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center shrink-0 mx-[-2px] z-10">
            {/* SVG Circle Ring */}
            <svg className="w-full h-full transform -rotate-90 origin-center" viewBox="0 0 200 200">
              <defs>
                {/* SVG Glow Filter for the circular track */}
                <filter id="ring-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background inactive ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-zinc-900/60"
                strokeWidth="5"
                fill="none"
              />

              {/* Foreground active glowing ring */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="stroke-white transition-all duration-100 ease-out"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                filter="url(#ring-glow)"
              />
            </svg>

            {/* Inner Percentages Display */}
  
          </div>

          {/* Right Track Line (Outgoing Pipeline / Active Output) */}
          <div className="w-24 sm:w-36 md:w-48 h-[6px] bg-zinc-900 rounded-r-full overflow-hidden relative shrink-0">
            <div
              className={`absolute left-0 h-full bg-white rounded-r-full origin-left transition-all duration-700 ease-out shadow-[0_0_15px_#fff,0_0_5px_#fff] ${
                pipelineActive ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </div>
        </div>

        {/* Pill-shaped Secondary Indicator Capsule */}
        <div
          className={`mt-10 px-8 py-2 border rounded-full text-sm font-mono tracking-widest bg-black/60 backdrop-blur-sm transition-all duration-700 ease-out ${
            pipelineActive
              ? 'border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105'
              : 'border-white/15 text-white/50'
          }`}
        >
         LOADING.....
        </div>
      </div>
    
  );
}

export default Preloader;
