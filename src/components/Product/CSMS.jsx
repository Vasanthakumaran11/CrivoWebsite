import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Monitor, Zap, Shield, Activity, Database, 
  TrendingUp, Play, Square, RefreshCw, AlertTriangle, 
  CheckCircle2, ArrowRight, Clock, Power, Sliders, Server, 
  Cpu, FileText, ChevronRight, Check
} from 'lucide-react';
import Footer from '../Home/footer';
import StarsBackground from '../background/StarsBackground';

// Initial stations state
const initialStations = [
  { 
    id: 1, 
    name: "Tiruppur Plaza - AC Charger (Dual)", 
    location: "Tiruppur, India",
    status: "Available", 
    energy: 14.8, 
    rate: 0, 
    time: 0, 
    vehicle: "None",
    connector: "Type-2 AC",
    maxPower: 22
  },
  { 
    id: 2, 
    name: "Highway Hub - DC Fast Charger", 
    location: "NH-544 Corridor",
    status: "Charging", 
    energy: 42.6, 
    rate: 98.4, 
    time: 28, 
    vehicle: "BYD Atto 3",
    connector: "CCS-2 DC",
    maxPower: 120
  },
  { 
    id: 3, 
    name: "City Mall - DC Fast Charger", 
    location: "Coimbatore, India",
    status: "Preparing", 
    energy: 0.0, 
    rate: 0, 
    time: 1, 
    vehicle: "Tata Nexon EV",
    connector: "CCS-2 DC",
    maxPower: 60
  }
];

function CSMS() {
  const [stations, setStations] = useState(initialStations);
  const [selectedStationId, setSelectedStationId] = useState(2);
  const [imgFailed, setImgFailed] = useState(false);
  const [ocppLogs, setOcppLogs] = useState([
    { id: 1, timestamp: new Date(Date.now() - 60000).toLocaleTimeString(), direction: 'INCOMING', payload: '[2, "10001", "BootNotification", {"chargePointVendor": "CrivoHardware", "chargePointModel": "C-Fast120"}]' },
    { id: 2, timestamp: new Date(Date.now() - 55000).toLocaleTimeString(), direction: 'OUTGOING', payload: '[3, "10001", {"status": "Accepted", "currentTime": "' + new Date().toISOString() + '", "interval": 14400}]' },
    { id: 3, timestamp: new Date(Date.now() - 40000).toLocaleTimeString(), direction: 'INCOMING', payload: '[2, "10002", "StatusNotification", {"connectorId": 1, "errorCode": "NoError", "status": "Charging"}]' }
  ]);
  const [activeTab, setActiveTab] = useState('sim'); // sim, features, specs
  const logsContainerRef = useRef(null);

  // Sync ref to avoid stale state in interval
  const stationsRef = useRef(stations);
  useEffect(() => {
    stationsRef.current = stations;
  }, [stations]);

  // Derived state to avoid duplicate rendering cycles
  const simulatedLoad = React.useMemo(() => {
    const total = stations.reduce((sum, s) => sum + (s.status === "Charging" ? s.rate : 0), 0);
    return parseFloat(total.toFixed(1));
  }, [stations]);

  // Auto-scrolling logs container internally (prevents page movement jumps)
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [ocppLogs]);

  // Selected station helper
  const selectedStation = stations.find(s => s.id === selectedStationId) || stations[0];

  // OCPP logger helper
  const logOcpp = (direction, action, data) => {
    const msgId = Math.floor(10000 + Math.random() * 90000).toString();
    const timestamp = new Date().toLocaleTimeString();
    let payload = '';

    if (direction === 'INCOMING') {
      payload = `[2, "${msgId}", "${action}", ${JSON.stringify(data)}]`;
    } else {
      payload = `[3, "${msgId}", ${JSON.stringify(data)}]`;
    }

    setOcppLogs(prev => [...prev, {
      id: Date.now() + Math.random(),
      timestamp,
      direction,
      payload
    }].slice(-30)); // limit to last 30 logs
  };

  // Simulating active charging process
  useEffect(() => {
    const timer = setInterval(() => {
      const currentStations = stationsRef.current;
      const updated = currentStations.map(station => {
        if (station.status === "Charging") {
          // energy increment (kW * hours)
          const chargePower = station.rate;
          const energyAdded = (chargePower * 1.5) / 3600; // 1.5s step
          const newEnergy = parseFloat((station.energy + energyAdded).toFixed(3));
          
          // random power fluctuation +/- 2kW
          const jitter = (Math.random() - 0.5) * 4;
          const newRate = Math.max(10, Math.min(station.maxPower, parseFloat((station.rate + jitter).toFixed(1))));

          // Occasionally trigger OCPP MeterValues
          if (Math.random() > 0.7) {
            logOcpp('INCOMING', 'MeterValues', {
              connectorId: 1,
              transactionId: 4820 + station.id,
              meterValue: [{
                timestamp: new Date().toISOString(),
                sampledValue: [
                  { value: newEnergy.toString(), context: "Sample.Periodic", format: "Raw", measurand: "Energy.Active.Import.Register", unit: "Wh" },
                  { value: newRate.toString(), context: "Sample.Periodic", format: "Raw", measurand: "Power.Active.Import", unit: "W" }
                ]
              }]
            });
          }

          return {
            ...station,
            energy: newEnergy,
            rate: newRate,
            time: station.time + 1
          };
        } else {
          // Heartbeat
          if (Math.random() > 0.9) {
            logOcpp('INCOMING', 'Heartbeat', {});
          }
        }
        return station;
      });

      setStations(updated);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  // Action: Start Charging
  const handleStartCharging = (id) => {
    const targetStation = stations.find(s => s.id === id);
    if (!targetStation) return;

    logOcpp('INCOMING', 'Authorize', { idTag: "CRIVO_RFID_9942" });
    
    setTimeout(() => {
      logOcpp('OUTGOING', 'AuthorizeResponse', { idTagInfo: { status: "Accepted", expiryDate: new Date(Date.now() + 86400000).toISOString() } });
    }, 300);

    setTimeout(() => {
      logOcpp('INCOMING', 'StartTransaction', {
        connectorId: 1,
        idTag: "CRIVO_RFID_9942",
        meterStart: Math.floor(targetStation.energy * 1000),
        timestamp: new Date().toISOString()
      });
    }, 600);

    setTimeout(() => {
      logOcpp('OUTGOING', 'StartTransactionResponse', {
        transactionId: 4820 + id,
        idTagInfo: { status: "Accepted" }
      });
    }, 950);

    setStations(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: "Charging",
          rate: Math.round(s.maxPower * 0.8),
          vehicle: s.id === 1 ? "Tesla Model 3" : s.id === 3 ? "Tata Nexon EV" : "Hyundai Ioniq 5"
        };
      }
      return s;
    }));
  };

  // Action: Stop Charging
  const handleStopCharging = (id) => {
    const targetStation = stations.find(s => s.id === id);
    if (!targetStation) return;

    logOcpp('INCOMING', 'StopTransaction', {
      transactionId: 4820 + id,
      meterStop: Math.floor(targetStation.energy * 1000 + 5000),
      timestamp: new Date().toISOString(),
      reason: "Local"
    });

    setTimeout(() => {
      logOcpp('OUTGOING', 'StopTransactionResponse', {
        idTagInfo: { status: "Accepted" }
      });
    }, 400);

    setStations(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: "Available",
          rate: 0,
          vehicle: "None"
        };
      }
      return s;
    }));
  };

  // Action: Trigger Fault
  const handleTriggerFault = (id) => {
    logOcpp('INCOMING', 'StatusNotification', {
      connectorId: 1,
      errorCode: "OverCurrentFailure",
      status: "Faulted",
      info: "Current limit exceeded. Temperature limit threshold trigger.",
      timestamp: new Date().toISOString()
    });

    setStations(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: "Faulted",
          rate: 0,
          vehicle: "None"
        };
      }
      return s;
    }));
  };

  // Action: Remote Reset
  const handleRemoteReset = (id) => {
    logOcpp('OUTGOING', 'Reset', { type: "Hard" });
    
    setTimeout(() => {
      logOcpp('INCOMING', 'ResetResponse', { status: "Accepted" });
    }, 200);

    setTimeout(() => {
      logOcpp('INCOMING', 'StatusNotification', {
        connectorId: 1,
        errorCode: "NoError",
        status: "Preparing"
      });
    }, 1200);

    setTimeout(() => {
      logOcpp('INCOMING', 'StatusNotification', {
        connectorId: 1,
        errorCode: "NoError",
        status: "Available"
      });
      setStations(prevInner => prevInner.map(inner => {
        if (inner.id === id) {
          return { ...inner, status: "Available", energy: 0, time: 0 };
        }
        return inner;
      }));
    }, 4000);

    setStations(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: "Preparing",
          rate: 0,
          vehicle: "None"
        };
      }
      return s;
    }));
  };

  return (
    <div className="relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen">
      <StarsBackground />

      {/* Back Button */}
      

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        
        {/* Glow Layer */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-black/3 dark:bg-white/[0.02] rounded-full blur-[150px]"></div>
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center relative z-10 w-full">
          {/* Left Column: Headline */}
          <div className="md:col-span-7 space-y-8 text-left">
            

            <h1 className="text-5xl md:text-[5.5rem] font-black tracking-tighter leading-[1.05] text-[#111110] dark:text-white uppercase">
               <br />
              <span className="text-outline">CONNECT THROUGH CRIVO
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-medium tracking-tight text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
              CONNECT, MONITOR, CONTROL, AND SCALE YOUR EV CHARGING INFRASTRUCTURE WITH PRECISION.
            </p>

            <p className="text-base text-black/50 dark:text-white/45 leading-relaxed max-w-xl">
              Crivo CSMS (Charging Station Management System) is an intelligent, cloud-based platform built to power the future of electric vehicle charging networks. Enable seamless monitoring, diagnostics, and control of your chargers from a single centralized hub.
            </p>

            
          </div>

          {/* Right Column: Visual Device/Ecosystem Illustration */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            {/* Ambient circle glow */}
            <div className="absolute w-[350px] h-[350px] bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 rounded-full animate-[spin_40s_linear_infinite]" />
            <div className="absolute w-[450px] h-[450px] bg-transparent border border-dashed border-black/10 dark:border-white/5 rounded-full" />
            
            <div className="relative group max-w-[340px] md:max-w-none p-6">
              {/* Glassmorphic Charger Display */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-black/5 dark:from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl blur-2xl transition-opacity duration-700" />
              <div className="relative bg-white dark:bg-white/5 border border-black/15 dark:border-white/10 p-5 rounded-[2.5rem] shadow-2xl backdrop-blur-xl transition-all duration-700 hover:translate-y-[-8px]">
                {!imgFailed ? (
                  <img 
                    src="/ev_charger.png" 
                    alt="Crivo CSMS Intelligent EV Charging Hub"
                    className="rounded-[1.8rem] w-full max-h-[460px] object-cover filter brightness-[0.97] dark:brightness-[0.85] contrast-[1.05]"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  /* Fallback code illustration if image is missing */
                  <div className="h-[380px] w-full rounded-[1.8rem] bg-[#0c0c0e] border border-white/5 flex flex-col justify-between p-6 text-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/70">OCPP Link Active</span>
                      </div>
                      <Zap className="w-4 h-4 text-white animate-pulse" />
                    </div>
                    <div className="space-y-4 my-auto">
                      <p className="text-2xl font-black tracking-tight text-white leading-none">CR-FAST-120</p>
                      <p className="text-xs text-white/50">CCS-2 DC High Power Dispenser</p>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-[11px] font-mono text-white/70 space-y-1">
                        <div>Voltage: 415 V AC</div>
                        <div>Current: 180 A</div>
                        <div>Temp Sensor: 36.4°C</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-white/30 pt-4 border-t border-white/5">
                      <span>Vendor: CrivoTech</span>
                      <span>v1.6.4</span>
                    </div>
                  </div>
                )}

                {/* Overlay widgets */}
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#111112] border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold">Active Grid Load</p>
                    <p className="font-extrabold text-sm text-[#111110] dark:text-white">{simulatedLoad} kW</p>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white dark:bg-[#111112] border border-black/10 dark:border-white/10 rounded-2xl p-4 shadow-xl flex items-center gap-3 backdrop-blur-md">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-black dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-black/40 dark:text-white/40 font-bold">Uptime Rate</p>
                    <p className="font-extrabold text-sm text-[#111110] dark:text-white">99.98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Description */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
              A Cloud-Native Operating System <br />
              <span className="text-outline">For EV Charging Infrastructure</span>
            </h2>
            <p className="text-lg text-black/60 dark:text-white/60 leading-relaxed font-normal">
              Crivo CSMS is built to connect, monitor, control, and optimize EV charging operations at scale. From charger connectivity and remote diagnostic runs to session analytics, billing management, and intelligent power distribution — manage your entire charging ecosystem from one centralized platform.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Live Simulator Section */}
      <section id="demo" className="py-28 bg-black/[0.01] dark:bg-white/[0.01] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Interactive Live Demo</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">
              EXPERIENCE THE <br />
              <span className="text-outline">LIVE OPERATOR HUB</span>
            </h2>
            <p className="text-base text-black/50 dark:text-white/50 max-w-2xl mx-auto">
              Simulate actual charging station workflows, trigger OCPP requests, control connectors remotely, and see protocol transactions update in real-time.
            </p>
          </div>

          {/* Simulator Main View */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Connected Charge Points */}
              <div className="md:col-span-6">
                {/* Stations List */}
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-4 md:p-6 shadow-md backdrop-blur-md space-y-4 h-full">
                  <h3 className="text-lg font-bold tracking-tight mb-2 uppercase flex items-center gap-2">
                    <Server className="w-4 h-4 text-black dark:text-white" />
                    Connected Charge Points
                  </h3>
                  
                  <div className="space-y-3">
                    {stations.map((station) => {
                      const isSelected = station.id === selectedStationId;
                      return (
                        <div 
                          key={station.id}
                          onClick={() => setSelectedStationId(station.id)}
                          className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isSelected 
                              ? 'bg-black/5 dark:bg-white/10 border-black/30 dark:border-white/30 shadow-sm' 
                              : 'bg-black/[0.01] dark:bg-white/[0.02] border-black/5 dark:border-white/5 hover:bg-black/3 dark:hover:bg-white/5'
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-sm text-[#111110] dark:text-white text-left">{station.name}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase shrink-0 ${
                                station.status === 'Available' ? 'bg-black/5 dark:bg-white/5 text-black/60 dark:text-white/60 border border-black/10 dark:border-white/10 font-bold' :
                                station.status === 'Charging' ? 'bg-[#111110] text-white dark:bg-white dark:text-black border border-transparent font-extrabold' :
                                station.status === 'Faulted' ? 'border-2 border-black dark:border-white bg-transparent text-black dark:text-white font-black uppercase' :
                                // Preparing
                                'border border-dashed border-black/30 dark:border-white/30 bg-black/5 dark:bg-white/5 text-black/70 dark:text-white/70 font-semibold'
                              }`}>
                                {station.status}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-black/40 dark:text-white/40 font-mono text-left">
                              <span>Location: {station.location}</span>
                              <span>Connector: {station.connector}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-6 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-black/5 dark:border-white/5 justify-between sm:justify-end">
                            <div className="text-left sm:text-right">
                              <p className="text-[9px] uppercase tracking-widest font-bold text-black/40 dark:text-white/45">Active Draw</p>
                              <p className="font-extrabold text-sm font-mono">{station.rate} kW</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-[9px] uppercase tracking-widest font-bold text-black/40 dark:text-white/45">Energy Dispensed</p>
                              <p className="font-extrabold text-sm font-mono text-[#111110] dark:text-white">{station.energy} kWh</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Remote Commands */}
              <div className="md:col-span-6">
                {/* Operations Control Panel */}
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2rem] p-4 md:p-6 shadow-md backdrop-blur-md space-y-6 h-full flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/5 pb-3">
                    <div className="text-left">
                      <h3 className="text-lg font-bold tracking-tight uppercase">Remote Commands</h3>
                      <p className="text-xs text-black/40 dark:text-white/40">Remote commands sent via OCPP client gateway</p>
                    </div>
                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[#111110]/60 dark:text-white/60">
                        {selectedStation.name}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Start Command */}
                    <button
                      onClick={() => handleStartCharging(selectedStation.id)}
                      disabled={selectedStation.status === 'Charging' || selectedStation.status === 'Faulted'}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/5 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-white/5 transition-all duration-300 text-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white leading-tight">Start Charge</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40 mt-1">Transaction.Start</p>
                      </div>
                    </button>

                    {/* Stop Command */}
                    <button
                      onClick={() => handleStopCharging(selectedStation.id)}
                      disabled={selectedStation.status !== 'Charging'}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/5 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-white/5 transition-all duration-300 text-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Square className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white leading-tight">Stop Charge</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40 mt-1">Transaction.Stop</p>
                      </div>
                    </button>

                    {/* Trigger Fault */}
                    <button
                      onClick={() => handleTriggerFault(selectedStation.id)}
                      disabled={selectedStation.status === 'Faulted' || selectedStation.status === 'Available'}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/5 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:border-white/5 transition-all duration-300 text-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white leading-tight">Trigger Fault</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40 mt-1">Status.Faulted</p>
                      </div>
                    </button>

                    {/* Remote Reset */}
                    <button
                      onClick={() => handleRemoteReset(selectedStation.id)}
                      className="group flex flex-col items-center justify-center p-4 rounded-2xl border border-black/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/5 hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center group-hover:spin transition-transform">
                        <RefreshCw className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-xs uppercase text-[#111110] dark:text-white leading-tight">Soft Reset</p>
                        <p className="text-[9px] text-black/45 dark:text-white/40 mt-1">RemoteReboot</p>
                      </div>
                    </button>
                  </div>

                  {/* Active Station Info Display */}
                  <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/5 border border-black/10 dark:border-white/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Station Type</p>
                      <p className="font-extrabold text-sm">{selectedStation.connector}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Max capacity</p>
                      <p className="font-extrabold text-sm font-mono text-[#111110] dark:text-white">{selectedStation.maxPower} kW</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Vehicle Connected</p>
                      <p className="font-extrabold text-sm truncate">{selectedStation.vehicle}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-black/40 dark:text-white/40 font-bold mb-1">Elapsed Duration</p>
                      <p className="font-extrabold text-sm font-mono">{selectedStation.time} min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Dashboard Image */}
            <div className="relative group overflow-hidden rounded-[2rem] border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 p-2 shadow-2xl backdrop-blur-md">
              <img
                src="/real_time_ops.png"
                alt="Crivo CSMS Real-Time Operations Dashboard"
                className="w-full aspect-[16/9] object-cover rounded-[1.8rem] transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / OCPP Cloud Pipeline */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">System Architecture</span>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter leading-none uppercase">
              CONNECTING EV CHARGERS TO <br />
              <span className="text-outline " style={{ fontSize: '4.5rem' }}>A SMART CENTRAL SYSTEM</span >        </h2>
            <p className="text-base text-black/50 dark:text-white/50">
              Every charger connects securely to the Crivo CSMS platform through OCPP. Real-time charger data, session activity, health monitoring, alerts, and remote operations are managed from a centralized cloud dashboard.
            </p>
          </div>

          {/* System Architecture Flow Image */}
          <div className="max-w-5xl mx-auto p-2 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl overflow-hidden">
            <img 
              src="/how_it_works.png" 
              alt="Crivo CSMS System Architecture Flow: Live in Five Steps"
              className="w-full rounded-[2.2rem] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Bento Grid Feature Layout */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8">
            <div className="text-left space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Core Infrastructure Capabilities</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight uppercase">
                COMPLETE CONTROL. <br />
                <span className="text-outline">ANY NETWORK SIZE.</span>
              </h2>
            </div>
            <p className="text-lg text-black/60 dark:text-white/60 text-left max-w-md leading-relaxed">
              We translate raw charger telemetry into automated optimization algorithms, helping operators cut maintenance overheads by up to 40%.
            </p>
          </div>

          {/* Built for the Business of Charging Image */}
          <div className="max-w-5xl mx-auto p-2 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 shadow-xl overflow-hidden">
            <img 
              src="/why_crivo.png" 
              alt="Built for the Business of Charging Features Grid"
              className="w-full rounded-[2.2rem] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Specifications / Highlights Section */}
      <section className="py-32 bg-black/[0.01] dark:bg-white/[0.01] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            
            {/* Left specifications list */}
            <div className="md:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 block">Technical Standards</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight">
                BUILT ON INDUSTRY <br />
                <span className="text-outline">OPEN STANDARD PROTOCOLS</span>
              </h2>
              <p className="text-base text-black/50 dark:text-white/50 leading-relaxed">
                We design our systems for maximum interoperability. By building natively on Open Charge Alliance protocols, Crivo ensures you are never locked into a single hardware vendor.
              </p>
              
              <div className="space-y-3 pt-4">
                {[
                  "Natively supports OCPP 1.6J (JSON over WebSockets)",
                  "Compatible with OCPP 2.0.1 core features & security profiles",
                  "Industry-standard security (TLS 1.3, basic auth profiles)",
                  "Custom REST APIs for third-party billing & CRM integrations",
                  "Support for OpenADR 2.0b for smart grid dynamic demand response"
                ].map((std, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="w-5 h-5 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{std}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right tech specs list */}
            <div className="md:col-span-7 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-sm text-left">
              <h3 className="text-xl font-bold uppercase mb-8 border-b border-black/5 dark:border-white/5 pb-4">CSMS Core Architecture Specifications</h3>
              
              <div className="divide-y divide-black/5 dark:divide-white/5 text-sm">
                {[
                  { label: "Deployment Modes", val: "Cloud hosting (AWS Serverless) / On-premise local servers options" },
                  { label: "Charger Interoperability", val: "Any OCPP compliant hardware (Tritium, ABB, Delta, Alpitronic, EVBox, etc.)" },
                  { label: "Real-time Notifications", val: "WebSocket message relays, Webhooks alerts, email triggers, Slack/Telegram bots alerts" },
                  { label: "Smart Power Distribution", val: "Dynamic load limits updates, daisy-chained charging prioritizations, local grid peak-shaving overrides" },
                  { label: "User Authentication", val: "RFID cards authorization, Mobile app QR scanner start, local pinpad unlock, Autocharge (Plug & Charge ISO 15118)" }
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
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-black/[0.01] dark:bg-white/[0.01] rounded-full blur-[130px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10 space-y-10">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-[#111110]/50 dark:text-white/50 block">Scale Smarter, Operate Faster</span>
          
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight">
            READY TO RUN <br />
            <span className="text-outline">YOUR CHARGING NETWORK?</span>
          </h2>
          
          <p className="text-lg text-black/60 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
            Configure, manage, and scale your EV charging assets seamlessly with Crivo CSMS. Schedule a demo session with our operations team today.
          </p>

          <Link to="/book-meet">
            <button className="px-12 py-5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-base tracking-wide shadow-xl">
              BOOK A MEET
            </button>
          </Link>
        </div>
        <div className="pb-16" />
      </section>

      <Footer />
    </div>
  );
}

export default CSMS;
