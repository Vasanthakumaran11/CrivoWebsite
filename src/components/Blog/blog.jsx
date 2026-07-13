import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Zap, 
  Cpu, 
  Terminal, 
  Sliders, 
  Activity, 
  Wifi, 
  Database, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Car,
  AlertTriangle,
  Server
} from 'lucide-react';
import Footer from '../Home/footer';

// Moved outside the component to prevent React dependency recreation warnings in useEffect
const carSpecs = {
  tesla: { name: 'Tesla Model 3', maxPower: 11 },
  taycan: { name: 'Porsche Taycan', maxPower: 22 },
  leaf: { name: 'Nissan Leaf', maxPower: 6.6 },
};

// --- Live Telemetry Dashboard Widget (Replaces static Hero Image) ---
function DashboardHero() {
  const [loadHistory, setLoadHistory] = useState([15, 16.2, 14.8, 17.1, 18.2, 19.5, 17.8, 18.0, 18.2, 19.1, 18.5, 18.2]);
  const [voltage, setVoltage] = useState(230.1);
  const [freq, setFreq] = useState(50.01);
  const [mode, setMode] = useState('balance'); // 'balance', 'peaking', 'v2g'
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time voltage and frequency fluctuations
      setVoltage(Math.round((230 + (Math.random() - 0.5) * 1.6) * 10) / 10);
      setFreq(Math.round((50 + (Math.random() - 0.5) * 0.04) * 100) / 100);
      
      // Animate active load values depending on chosen CSMS mode
      setLoadHistory(prev => {
        const last = prev[prev.length - 1];
        let nextVal = last + (Math.random() - 0.5) * 2.5;
        if (mode === 'v2g') {
          nextVal = Math.max(nextVal, -6.0); // battery feed back
          nextVal = Math.min(nextVal, 6.0);
        } else if (mode === 'peaking') {
          nextVal = Math.min(nextVal, 16.0); // peak shaving ceiling
          nextVal = Math.max(nextVal, 8.0);
        } else {
          nextVal = Math.min(nextVal, 32.0); // load balancing range
          nextVal = Math.max(nextVal, 12.0);
        }
        nextVal = Math.round(nextVal * 10) / 10;
        return [...prev.slice(1), nextVal];
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [mode]);

  const activeLoad = loadHistory[loadHistory.length - 1];
  const activeCurrent = Math.round(((activeLoad * 1000) / voltage) * 10) / 10;

  // Generate dynamic line graph svg elements
  const svgWidth = 400;
  const svgHeight = 70;
  const points = loadHistory.map((val, idx) => {
    const x = (idx / (loadHistory.length - 1)) * svgWidth;
    // Map -10kW to 40kW into SVG height range (0 to svgHeight)
    const normalized = (val + 10) / 50;
    const y = svgHeight - normalized * svgHeight;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${-mousePos.y * 6}deg) scale3d(1.01, 1.01, 1.01)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.4s ease-out'
      }}
      className="w-full bg-[#111110] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] overflow-hidden p-6 md:p-8 text-white font-mono text-xs select-none relative"
    >
      {/* Subtle overlay grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

      {/* Floating tracker coordinate readout */}
      <div className="absolute top-4 right-6 text-[8px] text-white/30 hidden md:block">
        SYS.VIEWPORT: {Math.round((mousePos.x + 0.5) * 100)}% / {Math.round((mousePos.y + 0.5) * 100)}%
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 border-b border-white/10 pb-6 mb-6 relative z-10">
        <div>
          <div className="text-[9px] text-white/40 uppercase tracking-widest font-bold mb-1">Central Orchestration Dashboard</div>
          <div className="text-base font-black tracking-tight text-white flex items-center gap-2 font-sans">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            CRIVO CSMS TELEMETRY FEED
          </div>
        </div>
        <div className="flex gap-2">
          {['balance', 'peaking', 'v2g'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 rounded-xl border text-[9px] uppercase font-bold transition-all duration-300 ${
                mode === m
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {m === 'balance' ? 'Load Balance' : m === 'peaking' ? 'Peak Shave' : 'V2G Feedback'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Core telemetry readings */}
        <div className="space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="text-white/40 text-[9px] uppercase tracking-wider mb-1">AGGREGATE DEMAND</div>
            <div className="text-3xl font-black tracking-tight text-white">
              {activeLoad} <span className="text-xs text-white/40 font-normal">kW</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="text-white/40 text-[9px] uppercase tracking-wider mb-1">GRID VOLTAGE</div>
              <div className="text-sm font-bold text-white">{voltage} V</div>
            </div>
            <div className="bg-white/5 rounded-xl p-3 border border-white/5">
              <div className="text-white/40 text-[9px] uppercase tracking-wider mb-1">GRID FREQ</div>
              <div className="text-sm font-bold text-white">{freq} Hz</div>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex justify-between items-center text-[10px]">
            <span className="text-white/40 uppercase tracking-wider">TOTAL INGEST CURRENT</span>
            <span className="font-bold text-white">{activeCurrent} A</span>
          </div>
        </div>

        {/* Real-time Scrolling Line Chart */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between h-full min-h-[140px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/40 text-[9px] uppercase tracking-wider">LOAD CURVE SPECTRUM</span>
            <span className="text-[8px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">LIVE</span>
          </div>
          <div className="flex-1 flex items-end">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full overflow-visible">
              <polyline
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="2.5"
                points={points}
                className="transition-all duration-300"
              />
              <line x1="0" y1={svgHeight * 0.25} x2={svgWidth} y2={svgHeight * 0.25} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2,2" />
              <line x1="0" y1={svgHeight * 0.5} x2={svgWidth} y2={svgHeight * 0.5} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2,2" />
              <line x1="0" y1={svgHeight * 0.75} x2={svgWidth} y2={svgHeight * 0.75} stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2,2" />
            </svg>
          </div>
        </div>

        {/* Charge Points list status feed */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
          <div className="text-white/40 text-[9px] uppercase tracking-wider mb-3">CHARGE POINT STATUS LIST</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">CP-ALPHA (Type 2)</span>
              <span className="px-1.5 py-0.5 rounded bg-white text-black font-bold text-[8px] uppercase">CHARGING</span>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-white/80">CP-BETA (CCS2)</span>
              <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-bold text-[8px] uppercase">CHARGING</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[10px]">
              <span className="text-white/40">CP-GAMMA (CCS2)</span>
              <span className="px-1.5 py-0.5 rounded bg-white/5 text-white/30 font-bold text-[8px] uppercase">STANDBY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Blog() {
  // --- OCPP Simulator State ---
  const [ocppState, setOcppState] = useState('offline'); // offline, online, authorized, charging
  const [ocppLogs, setOcppLogs] = useState([]);
  const [soc, setSoc] = useState(30);
  const [energy, setEnergy] = useState(0);
  const logContainerRef = useRef(null);

  // --- Load Balancing State ---
  const [gridLimit, setGridLimit] = useState(24); // kW
  const [pluggedCars, setPluggedCars] = useState({
    tesla: true,
    taycan: true,
    leaf: false,
  });

  // Calculate dynamic load balancing allocations (derived state)
  const allocatedPower = useMemo(() => {
    let activeCars = Object.keys(pluggedCars).filter(key => pluggedCars[key]);
    if (activeCars.length === 0) {
      return { tesla: 0, taycan: 0, leaf: 0 };
    }

    let totalDemand = activeCars.reduce((sum, key) => sum + carSpecs[key].maxPower, 0);
    let newAllocations = { tesla: 0, taycan: 0, leaf: 0 };
    
    if (totalDemand <= gridLimit) {
      activeCars.forEach(key => {
        newAllocations[key] = carSpecs[key].maxPower;
      });
    } else {
      activeCars.forEach(key => {
        const share = carSpecs[key].maxPower / totalDemand;
        newAllocations[key] = Math.round(gridLimit * share * 10) / 10;
      });
    }

    return newAllocations;
  }, [gridLimit, pluggedCars]);

  // OCPP Log Helper
  const addOcppLog = (type, action, payload) => {
    const timestamp = new Date().toLocaleTimeString();
    setOcppLogs(prev => [...prev, { id: Date.now(), type, timestamp, action, payload }]);
  };

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [ocppLogs]);

  // OCPP Action Handlers
  const handleOcppBoot = () => {
    setOcppState('online');
    addOcppLog('sent', 'BootNotificationRequest', {
      chargePointVendor: "CrivoPower",
      chargePointModel: "CP-SmartAC-22",
      chargeBoxSerialNumber: "CRV-2026-X99",
      firmwareVersion: "v2.4.11-beta"
    });
    
    setTimeout(() => {
      addOcppLog('received', 'BootNotificationResponse', {
        currentTime: new Date().toISOString(),
        interval: 60,
        status: "Accepted"
      });
    }, 600);
  };

  const handleOcppAuthorize = () => {
    if (ocppState === 'offline') return;
    addOcppLog('sent', 'AuthorizeRequest', {
      idToken: "RFID-99A8B7C6",
      type: "ISO14443"
    });

    setTimeout(() => {
      addOcppLog('received', 'AuthorizeResponse', {
        idTokenInfo: {
          status: "Accepted",
          expiryDate: new Date(Date.now() + 86400000).toISOString(),
          parentIdToken: "ADMIN-GRP"
        }
      });
      setOcppState('authorized');
    }, 600);
  };

  const handleOcppStart = () => {
    if (ocppState !== 'authorized') return;
    setOcppState('charging');
    addOcppLog('sent', 'TransactionEventRequest (Started)', {
      eventType: "Started",
      timestamp: new Date().toISOString(),
      triggerReason: "CablePluggedIn",
      transactionInfo: {
        transactionId: "TX-88321",
        chargingState: "Charging"
      },
      evse: { id: 1, connectorId: 1 }
    });

    setTimeout(() => {
      addOcppLog('received', 'TransactionEventResponse', {
        status: "Accepted",
        totalCost: 0.00,
        chargingPriority: "High"
      });
    }, 600);
  };

  // Mock telemetry loop while charging
  useEffect(() => {
    let interval;
    if (ocppState === 'charging') {
      interval = setInterval(() => {
        setSoc(s => {
          if (s >= 100) {
            clearInterval(interval);
            setOcppState('authorized');
            addOcppLog('sent', 'TransactionEventRequest (Ended)', {
              eventType: "Ended",
              timestamp: new Date().toISOString(),
              triggerReason: "EVDetectedFullyCharged",
              transactionInfo: {
                transactionId: "TX-88321",
                chargingState: "Idle"
              }
            });
            return 100;
          }
          return s + 2;
        });

        setEnergy(e => Math.round((e + 0.4) * 10) / 10);

        addOcppLog('sent', 'MeterValuesRequest', {
          evseId: 1,
          meterValue: [{
            timestamp: new Date().toISOString(),
            sampledValue: [
              { value: `${soc + 2}`, measurand: "StateOfCharge", unit: "Percent" },
              { value: `${energy + 0.4}`, measurand: "Energy.Active.Import.Register", unit: "Wh" }
            ]
          }]
        });
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [ocppState, soc, energy]);

  const handleOcppStop = () => {
    if (ocppState !== 'charging') return;
    setOcppState('authorized');
    addOcppLog('sent', 'TransactionEventRequest (Ended)', {
      eventType: "Ended",
      timestamp: new Date().toISOString(),
      triggerReason: "RemoteStop",
      transactionInfo: {
        transactionId: "TX-88321",
        chargingState: "Idle",
        stoppedReason: "LocalStop"
      }
    });

    setTimeout(() => {
      addOcppLog('received', 'TransactionEventResponse', {
        status: "Accepted",
        energyDeliveredWh: energy,
        sessionCost: Math.round(energy * 0.15 * 100) / 100
      });
    }, 600);
  };

  const resetOcpp = () => {
    setOcppState('offline');
    setOcppLogs([]);
    setSoc(30);
    setEnergy(0);
  };

  const totalCurrentDraw = Math.round(
    Object.keys(pluggedCars)
      .filter(key => pluggedCars[key])
      .reduce((sum, key) => sum + allocatedPower[key], 0) * 10
  ) / 10;

  const isGridNearLimit = totalCurrentDraw >= gridLimit - 2 && gridLimit > 10;

  return (
    <div className="bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen">
      
      {/* Article Navigation Header */}
      <div className="max-w-4xl mx-auto px-6 pt-32 pb-6">
        <Link to="/blogs" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black/50 dark:text-white/50 hover:text-[#111110] dark:hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO ALL BLOGS
        </Link>
      </div>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto px-6 pb-12">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-3.5 py-1 border border-black/25 dark:border-white/25 rounded-full text-[10px] font-bold uppercase tracking-widest text-black/60 dark:text-white/60 bg-black/5 dark:bg-white/5">
            IoT & Smart Infrastructure
          </span>
          <span className="text-black/40 dark:text-white/40 text-xs">8 min read</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
          Smart Charging Infrastructure: Demystifying EV Chargers & Their Cloud Management Systems
        </h1>
        <p className="text-xl text-black/60 dark:text-white/60 leading-relaxed mb-8 font-light">
          Behind every electric vehicle charger is a complex, distributed network of edge microcontrollers, power electronics, and cloud software communicating in real-time. Here is how modern CSMS platforms orchestrate charging loads, handle grid constraints, and communicate using OCPP.
        </p>
        <div className="flex items-center gap-4 py-6 border-y border-black/10 dark:border-white/10">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-sm">
            CP
          </div>
        </div>
      </header>

      {/* Interactive CSMS Telemetry Dashboard Hero (Monochrome Live Interface) */}
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <DashboardHero />
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-32">
        <article className="prose dark:prose-invert max-w-none text-base md:text-lg leading-relaxed text-black/80 dark:text-white/80 space-y-8">
          
          <p>
            The transition to electric vehicles (EVs) represents one of the largest grid updates in human history. Millions of vehicles, each carrying a battery pack ranging from 40 kWh to over 100 kWh, represent massive shifting electricity demands.
          </p>
          <p>
            An EV charger (properly called an <strong>EVSE</strong>—Electric Vehicle Supply Equipment) is not just a high-power outlet. It is a smart edge computer that negotiates safety metrics with the car, verifies driver permissions, monitors thermal metrics, and communicates with central grid control software.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight pt-6 text-[#111110] dark:text-white">
            1. The Hardware Spectrum: AC vs. DC Infrastructure
          </h2>
          <p>
            From a software and control perspective, charging is split into two primary architectures based on where the conversion from grid Alternating Current (AC) to battery Direct Current (DC) takes place:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
            <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[1.5rem]">
              <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl mb-2">AC Charging (Level 1 & 2)</h3>
              <p className="text-sm text-black/60 dark:text-white/60">
                The charger feeds raw AC grid power directly to the vehicle. The conversion to DC is handled by the vehicle's <strong>Onboard Charger (OBC)</strong>. AC speeds are generally limited by the OBC's capacity—commonly 7 kW to 22 kW.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[1.5rem]">
              <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="font-black text-xl mb-2">DC Fast Charging (Level 3 / High Power)</h3>
              <p className="text-sm text-black/60 dark:text-white/60">
                The converting rectifier is built directly into the charging station cabinet itself. Power is converted to DC external to the vehicle and supplied directly to the battery's BMS. This enables rates from 50 kW to a blazing 350 kW+ (Megawatt charging for logistics rigs).
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight pt-6 text-[#111110] dark:text-white">
            2. The Brain in the Cloud: The CSMS
          </h2>
          <p>
            A standalone charger is a commercial liability. To make infrastructure viable, it must be monitored, monetized, and regulated in real-time. This is accomplished by a <strong>CSMS (Charging Station Management System)</strong>.
          </p>
          <p>
            A CSMS acts as the orchestration layer: communicating via persistent WebSockets to monitor charge point telemetry, authenticate user RFID cards or mobile apps, calculate usage costs, and dynamically push maximum power limits to avoid overloading electrical transformers.
          </p>

          {/* OCPP Section & Widget */}
          <div className="p-1 border border-black/10 dark:border-white/10 rounded-[2rem] dark:bg-black/3 my-12 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-black/10 dark:border-white/10">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
                <Terminal className="w-4 h-4" /> Live Interactive Sandbox
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111110] dark:text-white">
                OCPP 2.0.1 Protocol Simulator
              </h3>
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                Trigger charger events below to witness JSON-RPC WebSocket frames sent between the Charge Point (edge) and the CSMS (cloud).
              </p>
            </div>

            <div className="p-6 md:p-8 bg-[#0F0F11] text-[#E0E0E6] font-mono text-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Simulator Controls */}
                <div className="lg:col-span-4 flex flex-col gap-3 font-sans">
                  <div className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">Charger Physical Controls</div>
                  
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between p-3.5 bg-white/5 rounded-xl border border-white/5 text-xs">
                    <span>Charger Status:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full capitalize border ${
                      ocppState === 'offline' ? 'bg-white/5 text-white/40 border-white/10' :
                      ocppState === 'online' ? 'bg-white/10 text-white/60 border-white/10' :
                      ocppState === 'authorized' ? 'bg-white/20 text-white/80 border-white/20' :
                      'bg-white text-black border-white animate-pulse'
                    }`}>
                      {ocppState}
                    </span>
                  </div>

                  {/* Flow Buttons */}
                  <button 
                    onClick={handleOcppBoot}
                    disabled={ocppState !== 'offline'}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors text-left text-xs font-bold"
                  >
                    <Server className="w-4 h-4 text-white/60" />
                    <span>1. Boot & Connect Station</span>
                  </button>

                  <button 
                    onClick={handleOcppAuthorize}
                    disabled={ocppState !== 'online'}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors text-left text-xs font-bold"
                  >
                    <ShieldCheck className="w-4 h-4 text-white/60" />
                    <span>2. Tap RFID Card</span>
                  </button>

                  <button 
                    onClick={handleOcppStart}
                    disabled={ocppState !== 'authorized'}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 disabled:opacity-30 disabled:pointer-events-none transition-colors text-left text-xs font-bold"
                  >
                    <Car className="w-4 h-4 text-white/60" />
                    <span>3. Plug in EV Connector</span>
                  </button>

                  {ocppState === 'charging' ? (
                    <button 
                      onClick={handleOcppStop}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-white bg-white hover:bg-white/90 active:bg-white/85 text-black transition-colors text-left text-xs font-bold"
                    >
                      <Zap className="w-4 h-4 text-black animate-bounce" />
                      <span>4. Unplug (Stop Charge)</span>
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-white/2 opacity-30 text-left text-xs font-bold"
                    >
                      <Zap className="w-4 h-4" />
                      <span>4. Unplug (Stop Charge)</span>
                    </button>
                  )}

                  <button 
                    onClick={resetOcpp}
                    className="flex items-center justify-center gap-2 mt-4 p-2.5 rounded-xl border border-dashed border-white/10 hover:bg-white/5 transition-colors text-xs text-white/50"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset Console</span>
                  </button>

                  {ocppState === 'charging' && (
                    <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/40">Battery level (SoC):</span>
                        <span className="font-bold text-white">{soc}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-white h-full transition-all duration-1000" style={{ width: `${soc}%` }}></div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Energy Active Import:</span>
                        <span className="font-mono">{energy} kWh</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Log Console Output */}
                <div className="lg:col-span-8 flex flex-col h-[320px] bg-black/40 border border-white/5 rounded-xl overflow-hidden">
                  <div className="px-4 py-2 border-b border-white/5 bg-black/30 flex items-center justify-between text-xs text-white/40">
                    <span className="flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5 text-white/60" /> WebSockets Logger</span>
                    <span>JSON-RPC 2.0</span>
                  </div>
                  <div 
                    ref={logContainerRef} 
                    className="flex-1 p-4 overflow-y-auto space-y-4 text-[11px] leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
                  >
                    {ocppLogs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-white/30 font-sans italic text-xs">
                        No messages logged yet. Start by connecting the station.
                      </div>
                    ) : (
                      ocppLogs.map(log => (
                        <div key={log.id} className={`p-3 rounded-lg border ${
                          log.type === 'sent' 
                            ? 'bg-white/5 border-white/10 text-white/80' 
                            : 'bg-white/10 border-white/20 text-white'
                        }`}>
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-white/50">
                            <span className="font-bold tracking-wider uppercase">
                              {log.type === 'sent' ? '➔ OUTGOING (Charger -> CSMS)' : '➔ INCOMING (CSMS -> Charger)'}
                            </span>
                            <span>{log.timestamp}</span>
                          </div>
                          <div className="font-bold text-xs mb-1">{log.action}</div>
                          <pre className="text-white/80 overflow-x-auto text-[10px] bg-black/30 p-2 rounded max-h-[120px]">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight pt-6 text-[#111110] dark:text-white">
            3. The Standards Interface: OCPP, OCPI, and ISO 15118
          </h2>
          <p>
            To avoid walled ecosystems, the global EV charging market relies on three primary open-source specifications that handle communication at different stages:
          </p>
          <ul className="space-y-4 list-none pl-0">
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <div>
                <strong>OCPP (Open Charge Point Protocol)</strong>: Governs client-server communication between the charging post and the central backend (CSMS). Version 1.6J (JSON over WebSockets) is widely deployed, while OCPP 2.0.1 introduces secure device management, improved smart charging profiles, and rich diagnostic logs.
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <div>
                <strong>OCPI (Open Charge Point Interface)</strong>: Regulates peer-to-peer communication between different network operators (e.g. Charge Point Operators or CPOs) and mobility service providers (e-MSPs). This allows cross-network roaming—so a user with a Shell Recharge card can activate a ChargePoint station seamlessly.
              </div>
            </li>
            <li className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <div>
                <strong>ISO 15118</strong>: Governs the vehicle-to-charger physical communication. It defines the digital handshake that enables <strong>Plug & Charge</strong>—allowing the car to negotiate billing credentials automatically upon plugging, completely removing mobile apps, cards, and SMS logins from the user flow.
              </div>
            </li>
          </ul>

          {/* Section 4 */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight pt-6 text-[#111110] dark:text-white">
            4. Smart Grid Management: Dynamic Load Balancing (DLB)
          </h2>
          <p>
            Charging cars consumes high power. A single dual-connector AC station pulls 44 kW. If ten stations are added to a corporate parking garage, they could call for 440 kW—far exceeding the average building's excess transformer capacity.
          </p>
          <p>
            To prevent grid upgrades costing hundreds of thousands of dollars, software developers use <strong>Dynamic Load Balancing (DLB)</strong>. By monitoring total building energy consumption, the CSMS dynamically recalculates maximum current allowances and transmits throttling signals to charging posts in sub-second loops.
          </p>

          {/* Load Balancer Widget */}
          <div className="p-1 border border-black/10 dark:border-white/10 rounded-[2rem]  dark:bg-black/3 my-12 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-black/10 dark:border-white/10">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">
                <Sliders className="w-4 h-4" /> Live Interactive Simulator
              </span>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#111110] dark:text-white">
                Dynamic Load Balancing (DLB) Controller
              </h3>
              <p className="text-sm text-black/60 dark:text-white/60 mt-1">
                Simulate building energy draw. Plug in vehicles, drag the grid power threshold slider, and observe how the load manager throttles output to prevent transformer trips.
              </p>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left controls */}
                <div className="md:col-span-5 flex flex-col gap-6">
                  {/* Slider control */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-black/60 dark:text-white/60">MAX GRID CAPACITY LIMIT:</span>
                      <span className="font-mono text-sm text-black dark:text-white">{gridLimit} kW</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="40" 
                      value={gridLimit} 
                      onChange={(e) => setGridLimit(Number(e.target.value))}
                      className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#111110] dark:accent-white"
                    />
                    <div className="flex justify-between text-[10px] text-black/40 dark:text-white/40">
                      <span>10 kW (Tight Limit)</span>
                      <span>40 kW (High Capacity)</span>
                    </div>
                  </div>

                  {/* Connected Vehicles */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-wider block">Connected Vehicles:</span>
                    
                    {Object.keys(carSpecs).map(key => (
                      <label key={key} className="flex items-center justify-between p-3.5 bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-xl cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={pluggedCars[key]} 
                            onChange={(e) => setPluggedCars(prev => ({ ...prev, [key]: e.target.checked }))}
                            className="rounded text-black focus:ring-0 w-4 h-4 hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-sm font-bold">{carSpecs[key].name}</div>
                            <div className="text-[10px] text-black/40 dark:text-white/40">Requires: up to {carSpecs[key].maxPower} kW</div>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded border uppercase font-bold transition-all duration-300 ${
                          pluggedCars[key] 
                            ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                            : 'bg-black/5 text-black/40 border-black/10 dark:bg-white/5 dark:text-white/40 dark:border-white/10'
                        }`}>
                          {pluggedCars[key] ? 'Plugged In' : 'Disconnected'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Right visualization */}
                <div className="md:col-span-7 flex flex-col justify-between p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl">
                  {/* Status Ring / Gauge */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-black/60 dark:text-white/60 uppercase tracking-widest">
                        Total Grid Consumption
                      </div>
                      {isGridNearLimit && (
                        <div className="flex items-center gap-1.5 text-xs text-white bg-black dark:text-black dark:bg-white px-2.5 py-1 rounded-full font-bold animate-pulse">
                          <AlertTriangle className="w-3.5 h-3.5" /> Throttling Active
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-black font-mono tracking-tight">
                        {totalCurrentDraw}
                      </span>
                      <span className="text-lg text-black/40 dark:text-white/40">/ {gridLimit} kW</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-black/10 dark:bg-white/10 h-3 rounded-full overflow-hidden relative">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          isGridNearLimit ? 'bg-black/50 dark:bg-white/65' : 'bg-black dark:bg-white'
                        }`}
                        style={{ width: `${Math.min((totalCurrentDraw / gridLimit) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Individual outputs */}
                  <div className="space-y-4 pt-6 border-t border-black/10 dark:border-white/10 mt-6">
                    <div className="text-xs font-bold text-black/60 dark:text-white/60">CHARGING ALLOCATIONS</div>
                    
                    {Object.keys(carSpecs).map(key => {
                      const active = pluggedCars[key];
                      const power = allocatedPower[key];
                      const max = carSpecs[key].maxPower;
                      const percentage = max > 0 ? Math.round((power / max) * 100) : 0;
                      
                      return (
                        <div key={key} className={`space-y-1.5 transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-30'}`}>
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-black/80 dark:text-white/80">{carSpecs[key].name}</span>
                            <span className="font-mono font-bold">
                              {active ? `${power} kW` : '0 kW'}
                              {active && power < max && (
                                <span className="text-[10px] text-black/60 dark:text-white/60 ml-1.5">({percentage}% rate)</span>
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-black/5 dark:bg-white/5 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#111110] dark:bg-white h-full transition-all duration-500" 
                              style={{ width: active ? `${percentage}%` : '0%' }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            </div>
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl md:text-3xl font-black tracking-tight pt-6 text-[#111110] dark:text-white">
            5. Architecting the Future: V2G and AI Dispatch
          </h2>
          <p>
            The future of control systems is bi-directional. <strong>Vehicle-to-Grid (V2G)</strong> capability transforms EVs from simple loads into battery storage banks on wheels. During peak summer grid constraints, a fleet of connected vehicles can dump power back to utility substations, earning money for the drivers.
          </p>
          <p>
            Building software for EV fleets requires deep knowledge of concurrent edge connections, network resiliency in underground concrete garages, and highly performant telemetry ingestion engines. It's a gold mine for engineers excited by the intersection of physical hardware, network logic, and clean energy.
          </p>
        </article>

        {/* Action Call for Book Meet */}
        <section className="mt-20 p-8 md:p-12 bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-lg text-left">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">Need Smart Hardware Integrations?</h3>
            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
              Crivo builds bespoke Charging Station Management Systems, OCPP integrations, and grid automation tools. Let's discuss your hardware architecture.
            </p>
          </div>
          <Link to="/book-meet" className="shrink-0">
            <button className="px-8 py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-sm tracking-wide">
              DISCUSS WITH ENGINEERS
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
