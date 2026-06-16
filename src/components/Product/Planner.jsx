import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Navigation, Zap, Shield, Wallet, AlertTriangle, 
  Check, Activity, Cloud, Compass, Battery, Play, Pause, 
  RotateCcw, CheckCircle2, Smartphone, MapPin, TrendingUp, Loader2
} from 'lucide-react';
import Footer from '../Home/footer';
import StarsBackground from '../StarsBackground';

// Milestones on the Mumbai -> Pune -> Kolhapur route
const milestones = [
  { name: "Mumbai", dist: 0, batteryStart: 82, progressVal: 0, type: "start" },
  { name: "Lonavala (ChargeZone)", dist: 83, progressVal: 22, type: "charger" },
  { name: "Pune (Statiq)", dist: 149, progressVal: 39, type: "charger" },
  { name: "Satara (Zeon)", dist: 230, progressVal: 60, type: "charger" },
  { name: "Kolhapur", dist: 385, batteryEnd: 52, progressVal: 100, type: "end" }
];

function Planner() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [acOn, setAcOn] = useState(true);
  const [isSportMode, setIsSportMode] = useState(false);
  const [isUphill, setIsUphill] = useState(false);
  const [isRainy, setIsRainy] = useState(false);

  // Unified Wallet Balance State
  const [walletBalances, setWalletBalances] = useState({
    chargeZone: 842,
    statiq: 1250,
    jioBp: 560,
    zeon: 390
  });
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  // Simulation logic parameters
  const speedVal = isSportMode ? 85 : 65; // km/h
  const trafficVal = isRainy ? 55 : 30; // traffic load %

  // Calculate dynamic consumption rate (battery % lost per km)
  const baseConsumption = 0.18; // base loss percentage per km
  const consumptionFactor = 
    baseConsumption + 
    (acOn ? 0.04 : 0) + 
    (isSportMode ? 0.08 : 0) + 
    (isUphill ? 0.07 : 0) + 
    (isRainy ? 0.05 : 0);

  // Dynamic distance & battery values based on progress
  const totalTripDist = 385;
  const currentDistance = parseFloat(((progress / 100) * totalTripDist).toFixed(0));

  // Battery remaining simulation
  const startBattery = 82;
  const rawBatteryUsed = currentDistance * consumptionFactor;
  let simulatedBattery = Math.max(0, Math.round(startBattery - rawBatteryUsed));

  // Determine current active segment
  let currentSegment = milestones[0];
  for (let i = 0; i < milestones.length; i++) {
    if (progress >= milestones[i].progressVal) {
      currentSegment = milestones[i];
    }
  }

  // Trigger simulated charging stops when battery hits a critical threshold
  const [lastChargedMilestone, setLastChargedMilestone] = useState(null);

  // Auto-running simulation loop
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setLastChargedMilestone(null);
            return 0; // loop back
          }
          const next = prev + 1;
          
          // Check if we hit a charging station milestone and need to simulate charging
          const matched = milestones.find(m => m.progressVal === next && m.type === "charger");
          if (matched && lastChargedMilestone !== matched.name) {
            setIsPlaying(false);
            setLastChargedMilestone(matched.name);
            // Simulate dynamic recharge overlay
            setTimeout(() => {
              setIsPlaying(true);
            }, 3000);
          }

          return next;
        });
      }, 350);
    }
    return () => clearInterval(interval);
  }, [isPlaying, lastChargedMilestone]);

  // Adjust current battery if recently charged at a milestone
  if (lastChargedMilestone) {
    simulatedBattery = 85; // reset battery to 85% at charging stop
  }

  // AI range factors list mapping
  const aiRangeFactors = [
    { label: "Speed", val: isSportMode ? "70%" : "45%", pct: isSportMode ? 70 : 45 },
    { label: "Terrain", val: isUphill ? "55%" : "20%", pct: isUphill ? 55 : 20 },
    { label: "AC Usage", val: acOn ? "40%" : "5%", pct: acOn ? 40 : 5 },
    { label: "Traffic", val: isRainy ? "55%" : "30%", pct: isRainy ? 55 : 30 }
  ];

  // Station score breakdown based on active location and conditions
  const stationScoreBreakdown = [
    { label: "Charger Fit", val: "9.5", pct: 95 },
    { label: "Speed", val: isSportMode ? "8.5" : "9.0", pct: isSportMode ? 85 : 90 },
    { label: "Amenities", val: isRainy ? "8.0" : "8.8", pct: isRainy ? 80 : 88 },
    { label: "Deviation", val: "9.2", pct: 92 }
  ];

  // Simulate consolidated payment action
  const triggerUnifiedPayment = () => {
    if (isPaying || paySuccess) return;
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaySuccess(true);
      // Deduct balance from a random operator to show real-time synchronization
      setWalletBalances(prev => ({
        ...prev,
        statiq: prev.statiq - 320
      }));
      // Auto-reset payment state after 4 seconds
      setTimeout(() => {
        setPaySuccess(false);
      }, 4000);
    }, 2500);
  };

  const totalWalletBalance = walletBalances.chargeZone + walletBalances.statiq + walletBalances.jioBp + walletBalances.zeon;

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen">
      <StarsBackground />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-black/3 dark:bg-white/[0.02] rounded-full blur-[150px]"></div>
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10 w-full">
          {/* Left Column: Headline */}
          <div className="md:col-span-7 space-y-8 text-left">
            <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-[#111110] dark:text-white uppercase">
              AI SMART TRIP <br />
              <span className="text-outline">PLANNER SYSTEM</span>
            </h1>

            <p className="text-xl md:text-2xl font-medium tracking-tight text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
              PREDICT RANGE, OPTIMIZE ROUTE STOPS, AND TRANSACT VIA UNIFIED WALLET BALANCES SEAMLESSLY.
            </p>

            <p className="text-base text-black/50 dark:text-white/45 leading-relaxed max-w-xl">
              An intelligent route intelligence platform designed for the Indian EV ecosystem. Crivo Smart EV Trip Planner predicts realistic ranges based on AC loads, terrain variations, weather drag, and speed profiles, routing drivers to charging stops while linking all CPO wallets natively.
            </p>
          </div>

          {/* Right Column: Visual Component Overlay */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            <div className="absolute w-[350px] h-[350px] bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[450px] h-[450px] bg-transparent border border-dashed border-black/10 dark:border-white/5 rounded-full" />
            
            <div className="relative group max-w-[340px] md:max-w-none p-4">
              <div className="absolute -inset-3 bg-gradient-to-tr from-black/5 dark:from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-opacity duration-700" />
              <div className="relative bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 p-2.5 rounded-[2rem] shadow-2xl backdrop-blur-xl transition-all duration-700 hover:translate-y-[-8px]">
                <img 
                  src="/designdashboard.png" 
                  alt="Smart EV-Trip Planner Interface" 
                  className="rounded-[1.6rem] w-full object-cover filter contrast-[1.02] brightness-[0.98] shadow-md animate-fade-in"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Description */}
      <section className="py-24 border-t border-black/10 dark:border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
                Predictive Trip Intelligence <br />
                <span className="text-outline">Designed for the Indian Terrain</span>
              </h2>
              <p className="text-base md:text-lg text-black/60 dark:text-white/60 leading-relaxed font-normal">
                Crivo's predictive Trip Planner leverages advanced machine learning to eliminate range anxiety. Our platform dynamically calculates battery health and range degradation using real-world factors like weather wind drag, elevation gradients, passenger loads, and AC cabin draw.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 p-2.5 rounded-[2rem] shadow-xl backdrop-blur-xl group hover:translate-y-[-4px] transition-transform duration-500">
                <img 
                  src="/SmartTip.png" 
                  alt="AI Range Smart Tip Widget" 
                  className="rounded-[1.6rem] w-full object-cover filter contrast-[1.01] shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Route Planner & Range Factor Simulator Section */}
      <section className="py-28 border-t border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Route Intelligence Simulator</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">
              EXPERIENCE THE AI <br />
              <span className="text-outline">ROUTE ADVISER</span>
            </h2>
            <p className="text-base text-black/50 dark:text-white/50 max-w-2xl mx-auto">
              Simulate route telemetry on the Mumbai ➔ Pune ➔ Kolhapur corridor. Adjust trip variables and see dynamic charger suggestions update instantly.
            </p>
          </div>

          <div className="space-y-8">
            {/* Top Interactive Panel: Route Timeline & Score Breakdowns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Left Column: Route Path Timeline */}
              <div className="lg:col-span-8">
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-md backdrop-blur-md flex flex-col justify-between h-full space-y-8 text-left">
                  
                  {/* Timeline Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/45 dark:text-white/40">Sample Route Intelligence</span>
                      <h3 className="text-2xl font-black tracking-tight uppercase mt-1">Mumbai ➔ Pune ➔ Kolhapur</h3>
                    </div>
                    
                    {/* Control Buttons */}
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-3.5 rounded-full border border-black/15 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        title={isPlaying ? "Pause Simulation" : "Start Simulation"}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>
                      <button 
                        onClick={() => { setProgress(0); setLastChargedMilestone(null); }}
                        className="p-3.5 rounded-full border border-black/15 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        title="Reset Journey"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Charging Popup Overlay Notification */}
                  {lastChargedMilestone && (
                    <div className="p-4 bg-black/5 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-2xl flex items-center justify-between animate-pulse">
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-extrabold uppercase tracking-wide">
                          Recharging Vehicle Battery at {lastChargedMilestone}...
                        </span>
                      </div>
                      <span className="text-[10px] font-bold opacity-60">Consolidated CPO Charge Sync</span>
                    </div>
                  )}

                  {/* Route Timeline Line */}
                  <div className="relative py-12">
                    {/* Horizontal Line on Desktop, Vertical on Mobile */}
                    <div className="absolute top-[50%] left-0 right-0 h-[2px] bg-black/10 dark:bg-white/10 hidden md:block" />
                    
                    {/* Dynamic Progress indicator bar */}
                    <div 
                      className="absolute top-[50%] left-0 h-[2px] bg-black dark:bg-white transition-all duration-300 hidden md:block" 
                      style={{ width: `${progress}%` }}
                    />

                    {/* Milestones layout */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 relative z-10 justify-items-center">
                      {milestones.map((m, idx) => {
                        const isReached = progress >= m.progressVal;
                        const isActive = currentSegment.name === m.name;
                        return (
                          <div key={idx} className="flex flex-col items-center text-center space-y-2 relative">
                            {/* Milestone Marker Circle */}
                            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 bg-[#F8F7F2] dark:bg-[#050505] ${
                              isActive ? 'border-black dark:border-white scale-125 border-2 shadow-lg font-black' :
                              isReached ? 'border-black dark:border-white bg-black dark:bg-white' : 'border-black/20 dark:border-white/10'
                            }`}>
                              {m.type === "charger" ? (
                                <Zap className={`w-3.5 h-3.5 ${isReached && !isActive ? 'text-[#F8F7F2] dark:text-[#050505]' : 'text-black dark:text-white'}`} />
                              ) : (
                                <div className={`w-2 h-2 rounded-full ${isReached && !isActive ? 'bg-[#F8F7F2] dark:bg-[#050505]' : 'bg-black/30 dark:bg-white/30'}`} />
                              )}
                            </div>

                            {/* Label */}
                            <div className="space-y-0.5">
                              <p className={`text-xs font-extrabold uppercase tracking-tight ${isActive ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/45'}`}>
                                {m.name.split(" ")[0]}
                              </p>
                              {m.type === "charger" && (
                                <p className="text-[9px] font-mono text-black/40 dark:text-white/40 block leading-none">
                                  {m.dist} km
                                </p>
                              )}
                              {m.type === "start" && (
                                <p className="text-[9px] font-mono text-black/40 dark:text-white/40 block leading-none">
                                  Start · {m.batteryStart}%
                                </p>
                              )}
                              {m.type === "end" && (
                                <p className="text-[9px] font-mono text-black/40 dark:text-white/40 block leading-none">
                                  {m.dist} km
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Range Factors Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-black/5 dark:border-white/5">
                    {/* Range Factors Left */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/45">AI Range Factors</h4>
                      <div className="space-y-3">
                        {aiRangeFactors.map((factor, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-black/60 dark:text-white/50">{factor.label}</span>
                              <span className="font-extrabold">{factor.val}</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-black dark:bg-white rounded-full transition-all duration-500" 
                                style={{ width: `${factor.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Range Recommendation Status Right */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-black/40 dark:text-white/45">Station Score Breakdown</h4>
                      <div className="space-y-3">
                        {stationScoreBreakdown.map((score, idx) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-black/60 dark:text-white/50">{score.label}</span>
                              <span className="font-extrabold">{score.val} / 10</span>
                            </div>
                            <div className="h-1.5 w-full bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-black dark:bg-white rounded-full transition-all duration-500" 
                                style={{ width: `${score.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Variable Toggles */}
              <div className="lg:col-span-4">
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-md backdrop-blur-md flex flex-col justify-between h-full space-y-6 text-left">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight uppercase flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Configure AI Engine
                    </h3>
                    <p className="text-xs text-black/40 dark:text-white/40 mt-1">
                      Toggle telemetry signals and watch range predictions fluctuate dynamically.
                    </p>
                  </div>

                  <div className="space-y-4 flex-1 py-4">
                    {/* AC Toggle */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5">
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white">Air Conditioner</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40">Cabin cooling compressor load</p>
                      </div>
                      <button 
                        onClick={() => setAcOn(!acOn)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all tracking-wider border ${
                          acOn 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-extrabold' 
                            : 'bg-transparent text-black dark:text-white border-black/20 dark:border-white/25'
                        }`}
                      >
                        {acOn ? "ON" : "OFF"}
                      </button>
                    </div>

                    {/* Drive Mode Toggle */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5">
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white">Driving Mode</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40">Eco speed control vs Performance</p>
                      </div>
                      <button 
                        onClick={() => setIsSportMode(!isSportMode)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          isSportMode 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-extrabold' 
                            : 'bg-transparent text-black dark:text-white border-black/20 dark:border-white/25'
                        }`}
                      >
                        {isSportMode ? "SPORT" : "ECO"}
                      </button>
                    </div>

                    {/* Terrain Toggle */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5">
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white">Terrain Slope</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40">Flat highway vs Uphill gradient climb</p>
                      </div>
                      <button 
                        onClick={() => setIsUphill(!isUphill)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          isUphill 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-extrabold' 
                            : 'bg-transparent text-black dark:text-white border-black/20 dark:border-white/25'
                        }`}
                      >
                        {isUphill ? "UPHILL" : "FLAT"}
                      </button>
                    </div>

                    {/* Weather Toggle */}
                    <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5">
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white">Weather Drag</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40">Rainy heavy wind resistance vs Clear</p>
                      </div>
                      <button 
                        onClick={() => setIsRainy(!isRainy)}
                        className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                          isRainy 
                            ? 'bg-black text-white dark:bg-white dark:text-black border-transparent font-extrabold' 
                            : 'bg-transparent text-black dark:text-white border-black/20 dark:border-white/25'
                        }`}
                      >
                        {isRainy ? "RAINY" : "CLEAR"}
                      </button>
                    </div>
                  </div>

                  {/* Simulated Telemetry Stats */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5 grid grid-cols-2 gap-4 text-xs font-mono">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Vehicle Speed</p>
                      <p className="font-extrabold text-sm">{speedVal} km/h</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Traffic Density</p>
                      <p className="font-extrabold text-sm">{trafficVal}%</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Row: AI Recommendation Map Graphic */}
            <div className="relative group overflow-hidden rounded-[2rem] border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-2 shadow-2xl backdrop-blur-md">
              <div className="relative w-full aspect-[16/9] min-h-[300px] bg-[#0c0c0e] rounded-[1.8rem] overflow-hidden flex flex-col justify-between p-6 md:p-10 text-left">
                {/* Active Route Map Background */}
                <img 
                  src="/map.png" 
                  alt="Active Route Map" 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" 
                />
                
                {/* Simulated grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
                
                {/* Live Animation Marker on Map */}
                <div 
                  className="absolute w-4 h-4 bg-white rounded-full animate-ping pointer-events-none z-20" 
                  style={{
                    left: `${15 + progress * 0.7}%`,
                    top: `${50 + Math.sin(progress * 0.1) * 8}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.3s ease-out, top 0.3s ease-out'
                  }}
                />
                <div className="absolute w-2.5 h-2.5 bg-white rounded-full pointer-events-none z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                  style={{
                    left: `${15 + progress * 0.7}%`,
                    top: `${50 + Math.sin(progress * 0.1) * 8}%`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.3s ease-out, top 0.3s ease-out'
                  }}
                />

                <div className="z-10 flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">AI Recommendation Engine</span>
                    <h3 className="text-3xl font-black text-white uppercase mt-1 leading-none">Active Route Intelligence</h3>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono text-white/70">
                    Active CPO Nodes: 43 Detected on Corridor
                  </div>
                </div>

                <div className="z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-white pt-6 border-t border-white/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent -mx-6 md:-mx-10 px-6 md:px-10 pb-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-1">CPO Interoperability</p>
                    <p className="font-extrabold text-sm">Full Sync</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-1">Total Distance</p>
                    <p className="font-extrabold text-sm font-mono">385 km</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-1">Active Optimizer</p>
                    <p className="font-extrabold text-sm">Gradient & Temp</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-1">Unified CPO Wallet</p>
                    <p className="font-extrabold text-sm">Connected (4 CPOs)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Unified EV Wallet Section */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 relative overflow-hidden bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side description */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Unified EV Wallet</span>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tight leading-none">
                ONE WALLET. <br />
                <span className="text-outline">EVERY CHARGER.</span>
              </h2>
              <p className="text-base text-black/50 dark:text-white/50 leading-relaxed">
                No more switching apps. No more separate logins. Connect all your CPO wallets into a single unified balance and charge seamlessly across India's entire EV network. Crivo consolidates accounts from Zeon, ChargeZone, Statiq, Jio-bp, and more.
              </p>

              {/* Transaction Simulator Trigger */}
              <div className="pt-4">
                <button 
                  onClick={triggerUnifiedPayment}
                  disabled={isPaying || paySuccess}
                  className={`px-8 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-all text-xs tracking-wider flex items-center gap-3 disabled:scale-100 disabled:opacity-60 shadow-lg`}
                >
                  {isPaying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      SECURELY ROUTING PAYMENT...
                    </>
                  ) : paySuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      ₹320 PAID SUCCESSFULLY
                    </>
                  ) : (
                    <>
                      <Wallet className="w-4 h-4" />
                      SIMULATE TRANSACTION (₹320)
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right side Wallet Display */}
            <div className="lg:col-span-7 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-sm text-left relative overflow-hidden backdrop-blur-md">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-black/[0.02] dark:from-white/[0.02] via-transparent to-transparent pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-6">
                <h3 className="text-lg font-bold uppercase tracking-tight">CPO Network Status</h3>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60">
                  4 WALLETS ACTIVE
                </span>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { name: "ChargeZone", balance: walletBalances.chargeZone },
                  { name: "Statiq", balance: walletBalances.statiq },
                  { name: "Jio-bp pulse", balance: walletBalances.jioBp },
                  { name: "Zeon", balance: walletBalances.zeon }
                ].map((cpo, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-black/[0.01] dark:bg-white/[0.02] hover:bg-black/5 dark:hover:bg-white/5 border border-black/5 dark:border-white/5 transition-all duration-300 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-black/30 dark:bg-white/30 animate-pulse" />
                      <div>
                        <p className="font-extrabold text-sm">{cpo.name}</p>
                        <p className="text-[9px] text-black/40 dark:text-white/40 uppercase font-bold tracking-wider">Connected · Auto-sync</p>
                      </div>
                    </div>
                    <span className="font-mono font-extrabold text-base">₹ {cpo.balance.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {/* Total Unified Balance Card */}
              <div className="bg-[#111110] text-white dark:bg-white dark:text-black rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl border border-transparent">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest opacity-60">Consolidated CPO Reserves</h4>
                  <p className="text-xs font-medium opacity-80 mt-0.5">Use balance seamlessly on any operator network</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <p className="text-[9px] uppercase tracking-widest font-bold opacity-50">Total Unified Balance</p>
                  <p className="font-mono font-black text-2xl">₹ {totalWalletBalance.toLocaleString('en-IN')}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Core Capabilities Section (06 Modules Grid) */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Core Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
                EVERYTHING YOUR <br />
                <span className="text-outline">EV JOURNEY NEEDS.</span>
              </h2>
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#111110]/50 dark:text-white/50 shrink-0">
              06 MODULES COMPLETE
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Range Prediction",
                desc: "Real-world range estimation using battery %, speed, terrain, weather, AC load, passenger count, and driving environment.",
                icon: Activity
              },
              {
                title: "Intelligent Route Planning",
                desc: "Multi-stop trip optimization with automatic charging point insertion and minimal travel time routing.",
                icon: Compass
              },
              {
                title: "Smart Charging Stops",
                desc: "Ranks stations by charger compatibility, speed, availability, cost, deviation, wait time, ratings, and nearby amenities.",
                icon: Zap
              },
              {
                title: "Unified EV Wallet",
                desc: "Single wallet integrating Zeon, ChargeZone, Statiq, ChargeMOD, Jio-bp pulse and more — pay once, charge anywhere.",
                icon: Wallet
              },
              {
                title: "Emergency Low-Battery Mode",
                desc: "Detects critical battery levels and instantly routes to the nearest compatible chargers with real-time availability.",
                icon: AlertTriangle
              },
              {
                title: "Flutter Mobile App",
                desc: "Seamless cross-platform app for EV users paired with a web-based admin dashboard for operators and managers.",
                icon: Smartphone
              }
            ].map((mod, idx) => {
              const Icon = mod.icon;
              return (
                <div 
                  key={idx}
                  className="group relative flex flex-col justify-between p-8 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] hover:bg-[#111110] dark:hover:bg-white hover:border-[#111110] dark:hover:border-white transition-all duration-500 overflow-hidden text-left"
                >
                  <div className="space-y-6 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/10 group-hover:bg-white/10 dark:group-hover:bg-black/10 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-[#111110] dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold tracking-tight group-hover:text-white dark:group-hover:text-black transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed group-hover:text-white/70 dark:group-hover:text-black/70 transition-colors">
                        {mod.desc}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-black/5 dark:bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-all pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specifications & Technical Details */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.01] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            
            {/* Left Column */}
            <div className="md:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">AI Engine Architecture</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                PREDICTIVE ENGINE <br />
                <span className="text-outline">SPECIFICATIONS</span>
              </h2>
              <p className="text-base text-black/50 dark:text-white/50 leading-relaxed">
                We integrate elevation curves, weather profiles, real-time charger statuses, and battery telemetry into a high-performance optimization grid.
              </p>
              
              <div className="border border-black/15 dark:border-white/10 rounded-[2rem] p-2 bg-white dark:bg-white/5 shadow-md overflow-hidden hover:translate-y-[-4px] transition-transform duration-500">
                <img 
                  src="/feetracker.png" 
                  alt="Fleet Tracker Live Telemetry Console" 
                  className="rounded-[1.6rem] w-full object-cover filter contrast-[1.01] shadow-sm" 
                />
              </div>
            </div>

            {/* Right Column Specifications Table */}
            <div className="md:col-span-7 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left">
              <h3 className="text-xl font-bold uppercase mb-8 border-b border-black/5 dark:border-white/5 pb-4">Core Planner Specifications</h3>
              
              <div className="divide-y divide-black/5 dark:divide-white/5 text-sm">
                {[
                  { label: "Supported Vehicles", val: "All major Indian EVs (Tata Nexon EV, Tiago EV, Punch EV, MG ZS EV, BYD Atto 3, Hyundai Ioniq 5, Mahindra XUV400, etc.)" },
                  { label: "Predictive Variables", val: "AC settings, speed profile, weather drag, ambient temperature, elevation ratio, vehicle cargo load" },
                  { label: "Consolidated CPOs", val: "Zeon, ChargeZone, Statiq, Jio-bp pulse, ChargeMOD, EVRE, and other OCPP-connected networks" },
                  { label: "Application Handshakes", val: "Flutter-based Android/iOS mobile clients, React Admin Dashboard, secure REST APIs" },
                  { label: "Smart Routing Core", val: "Automatic charging station recommendation, amenities filtering, waiting time predictions" }
                ].map((spec, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 py-5 first:pt-0 last:pb-0">
                    <span className="font-extrabold uppercase tracking-wide text-xs text-black/50 dark:text-white/40 sm:w-1/3 shrink-0">{spec.label}</span>
                    <span className="font-medium text-black/80 dark:text-white/80 sm:w-2/3 text-left">{spec.val}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 border-t border-black/10 dark:border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-black/[0.01] dark:bg-white/[0.01] rounded-full blur-[130px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#111110]/50 dark:text-white/50 block">Experience Smart Mobility</span>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            PLAN YOUR TRIP <br />
            <span className="text-outline">WITHOUT RANGE ANXIETY.</span>
          </h2>
          
          <p className="text-lg text-black/60 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
            Consolidate your charging payments and optimize your long-distance routes. Schedule a demo session with our EV engineering team today.
          </p>

          <Link to="/book-meet">
            <button className="px-12 py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-base tracking-wide shadow-xl">
              BOOK A MEET
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Planner;
