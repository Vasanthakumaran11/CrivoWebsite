import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  FileText, 
  Settings as SettingsIcon, 
  LogOut, 
  Database,
  ArrowLeft
} from 'lucide-react'
import StarsBackground from '../background/StarsBackground'
import Footer from '../Home/footer'

// Initial cities data with coordinates for Screenshot 2 India Map
const INITIAL_CITY_VISITORS = [
  { name: 'New Delhi', region: 'Delhi', count: 215, x: 172, y: 110 },
  { name: 'Mumbai', region: 'Maharashtra', count: 189, x: 122, y: 245 },
  { name: 'Bengaluru', region: 'Karnataka', count: 156, x: 165, y: 310 },
  { name: 'Hyderabad', region: 'Telangana', count: 98, x: 180, y: 250 },
  { name: 'Pune', region: 'Maharashtra', count: 82, x: 135, y: 255 },
  { name: 'Kolkata', region: 'West Bengal', count: 67, x: 260, y: 190 },
  { name: 'Chennai', region: 'Tamil Nadu', count: 63, x: 195, y: 305 },
  { name: 'Ahmedabad', region: 'Gujarat', count: 51, x: 115, y: 210 },
  { name: 'Jaipur', region: 'Rajasthan', count: 44, x: 140, y: 150 },
  { name: 'Lucknow', region: 'Uttar Pradesh', count: 38, x: 205, y: 145 }
]

// Line graph coordinates (May 17 - May 24)
const LINE_GRAPH_DATA = [
  { label: 'May 17', val: 140 },
  { label: 'May 18', val: 170 },
  { label: 'May 19', val: 150 },
  { label: 'May 20', val: 180 },
  { label: 'May 21: ', val: 240 },
  { label: 'May 22', val: 220 },
  { label: 'May 23', val: 280 },
  { label: 'May 24', val: 330 }
]

// Donut data (circumference is based on radius = 30 -> 2 * PI * 30 = 188.5)
const DONUT_RADIUS = 30
const DONUT_CIRCUMFERENCE = 2 * Math.PI * DONUT_RADIUS
const DONUT_DATA = [
  { label: 'Direct', percent: 42.3, color: 'stroke-white dark:stroke-white' },
  { label: 'Organic Search', percent: 28.7, color: 'stroke-[#8f8f93] dark:stroke-[#5c5c5f]' },
  { label: 'Referral', percent: 16.4, color: 'stroke-[#5c5c5f] dark:stroke-[#3c3c3f]' },
  { label: 'Social Media', percent: 8.9, color: 'stroke-[#3c3c3f] dark:stroke-[#202022]' },
  { label: 'Others', percent: 3.7, color: 'stroke-[#1c1c1f] dark:stroke-white/10' }
]

const RECENT_VISITORS = [
  { name: 'John Doe', location: 'New York, USA', source: 'Organic Search', pages: 5, time: 'May 24, 2025 09:45 AM' },
  { name: 'Jane Smith', location: 'London, UK', source: 'Direct', pages: 3, time: 'May 24, 2025 09:30 AM' },
  { name: 'Alex Johnson', location: 'Los Angeles, USA', source: 'Referral', pages: 2, time: 'May 24, 2025 09:15 AM' },
  { name: 'Emily Davis', location: 'Toronto, Canada', source: 'Social Media', pages: 4, time: 'May 24, 2025 09:05 AM' },
  { name: 'Michael Brown', location: 'Sydney, Australia', source: 'Organic Search', pages: 6, time: 'May 24, 2025 08:50 AM' }
]

export default function AdminDashboard() {
  // Trigger Vite Hot Module Replacement (HMR) cache update
  const [view, setView] = useState('landing') // 'landing' | 'cms' | 'cv'
  const [activeTab, setActiveTab] = useState('dashboard') // 'dashboard' | 'visitors' | 'analytics' | 'reports' | 'settings'

  // Dynamic visitors state for counts randomization
  const [cityVisitors, setCityVisitors] = useState(INITIAL_CITY_VISITORS)
  const [totalVisitorsCount, setTotalVisitorsCount] = useState(1248)
  const [systemTime, setSystemTime] = useState(new Date().toISOString())
  const [isLiveTelemetry, setIsLiveTelemetry] = useState(true)
  
  // Navigation pointers for India map
  const [activeCityIndex, setActiveCityIndex] = useState(0)
  const [prevCityIndex, setPrevCityIndex] = useState(0)
  
  // Speed history for Visitors Over Time line chart
  const [speedHistory, setSpeedHistory] = useState([110, 112, 108, 115, 110, 120, 118, 105, 110, 114, 118, 121, 115, 110, 112])

  // System time clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toISOString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Map pointer cycle timer
  useEffect(() => {
    if (!isLiveTelemetry) return
    const mapTimer = setInterval(() => {
      setPrevCityIndex(activeCityIndex)
      setActiveCityIndex((prev) => (prev + 1) % INITIAL_CITY_VISITORS.length)
    }, 2800)
    return () => clearInterval(mapTimer)
  }, [activeCityIndex, isLiveTelemetry])

  // Fluctuate visitor counts and chart data
  useEffect(() => {
    if (!isLiveTelemetry) return
    const interval = setInterval(() => {
      setCityVisitors((prev) => {
        const updated = prev.map((city) => {
          const change = Math.floor((Math.random() - 0.5) * 8)
          const newCount = Math.max(10, city.count + change)
          return { ...city, count: newCount }
        })
        const sum = updated.reduce((acc, c) => acc + c.count, 0)
        setTotalVisitorsCount(sum + 300)
        return updated
      })

      setSpeedHistory((prev) => {
        const next = [...prev.slice(1)]
        const lastVal = prev[prev.length - 1]
        const delta = Math.floor((Math.random() - 0.5) * 4)
        const newVal = Math.max(95, Math.min(125, lastVal + delta))
        next.push(newVal)
        return next
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [isLiveTelemetry])

  // Common Styles congruent with AboutUs
  const wrapperStyle = "relative isolate bg-[#F8F7F2] dark:bg-[#050505] text-[#111110] dark:text-white transition-colors duration-300 min-h-screen text-left"
  const titleHeaderStyle = "text-sm font-bold uppercase tracking-[0.3em] text-black/40 dark:text-white/50 block mb-6"
  const headingStyle = "text-5xl md:text-[5.5rem] font-black tracking-tighter leading-none mb-8 font-['Outfit']"
  const cardStyle = "bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-[1.5rem] p-6 flex flex-col transition-colors duration-300 shadow-sm"
  const textSubTitleStyle = "text-xs font-bold uppercase tracking-wider text-black/45 dark:text-white/45 mb-4"

  // Donut accumulated percent helper
  let accumulatedPercent = 0

  // ----------------------------------------------------
  // VIEW: LANDING SELECTION GRID
  // ----------------------------------------------------
  if (view === 'landing') {
    return (
      <div className={wrapperStyle}>
        <StarsBackground />
        
        {/* Hero */}
        <section className="relative min-h-[50vh] flex items-end pb-12 overflow-hidden pt-32">
          <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
            <span className={titleHeaderStyle}>Administrative Access</span>
            <h1 className={headingStyle}>
              CRIVO SYSTEM <br /><span className="text-outline">ADMINISTRATION.</span>
            </h1>
            
          </div>
        </section>

        {/* Option cards grid */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              
              {/* CMS Card */}
              <div className={`${cardStyle} min-h-[260px] justify-between`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Database className="w-8 h-8 stroke-current" />
                    <span className="text-xs uppercase tracking-wider bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 rounded-full font-bold">
                      Offline
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase font-['Outfit']">CMS</h2>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Content Management System nodes. Link directories, templates, blog metadata, and spec features.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setView('cms')}
                    className="px-8 py-3.5 border border-black/20 dark:border-white/20 font-bold rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs"
                  >
                    Configure CMS
                  </button>
                </div>
              </div>

              {/* CV Card */}
              <div className={`${cardStyle} min-h-[260px] justify-between`}>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <LayoutDashboard className="w-8 h-8 stroke-current animate-pulse" />
                    <span className="text-xs uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full font-extrabold">
                      Live Feed
                    </span>
                  </div>
                  <h2 className="text-2xl font-black uppercase font-['Outfit']">Customer Views (CV)</h2>
                  <p className="text-sm text-black/60 dark:text-white/60">
                    Live analytics tracking client vectors, visitors metrics, geographical hotspots, and traffic routes.
                  </p>
                </div>
                <div className="pt-4">
                  <button 
                    onClick={() => setView('cv')}
                    className="px-8 py-3.5 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-xs"
                  >
                    Open Live Feed
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // ----------------------------------------------------
  // VIEW: CMS Placeholder
  // ----------------------------------------------------
  if (view === 'cms') {
    return (
      <div className={wrapperStyle}>
        <StarsBackground />
        
        <section className="relative min-h-[70vh] flex items-center pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6 w-full flex justify-center">
            <div className={`${cardStyle} max-w-md w-full text-center space-y-6`}>
              <Database className="w-12 h-12 stroke-current mx-auto" />
              <h2 className="text-2xl font-black uppercase font-['Outfit']">CMS Unconnected</h2>
              
              

              <p className="text-sm text-black/60 dark:text-white/60">
                Database hooks are offline. Configure correct network credentials to sync repository directories.
              </p>

              <button 
                onClick={() => setView('landing')}
                className="w-full py-4 bg-[#111110] dark:bg-white text-white dark:text-black font-bold rounded-full hover:scale-105 transition-transform text-sm"
              >
                Return to Gate
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    )
  }

  // ----------------------------------------------------
  // VIEW: CV (CUSTOMER VIEWS SIDEBAR DASHBOARD - SCREENSHOT 1 & 2)
  // ----------------------------------------------------
  return (
    <div className={wrapperStyle}>
      <StarsBackground />
      
      <div className="max-w-7xl mx-auto px-6 w-full flex-1 flex flex-col relative z-10 pt-32 pb-16">
        
        {/* Header Title area */}
        <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-4 mb-8">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-2xl font-black uppercase font-['Outfit']">System Dashboard</h1>
              <p className="text-xs text-black/45 dark:text-white/45 font-['Inter']">Overview of your website visitors</p>
            </div>
          </div>
          <div className="text-xs font-mono select-none opacity-60">
            SYSTEM_TIME: {systemTime}
          </div>
        </div>

        {/* Sidebar + Main panel Layout (Duplicate of Screenshot 1) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR (w-64 style selector layout) */}
          <div className="col-span-1 md:col-span-3 flex flex-col gap-2 border-r border-black/10 dark:border-white/10 pr-6">
            
            {/* Dashboard Tab */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide transition-all flex items-center gap-3 ${
                activeTab === 'dashboard'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            {/* Visitors Tab */}
            <button 
              onClick={() => setActiveTab('visitors')}
              className={`w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide transition-all flex items-center gap-3 ${
                activeTab === 'visitors'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60'
              }`}
            >
              <Users className="w-4 h-4" />
              Visitors
            </button>


            {/* Reports Tab */}
            <button 
              onClick={() => setActiveTab('reports')}
              className={`w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide transition-all flex items-center gap-3 ${
                activeTab === 'reports'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              Reports
            </button>

            {/* Settings Tab */}
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide transition-all flex items-center gap-3 ${
                activeTab === 'settings'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-black/60 dark:text-white/60'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              Settings
            </button>

            {/* Divider */}
            <div className="h-[1px] bg-black/10 dark:bg-white/10 my-4" />

            {/* Logout Tab */}
            <button 
              onClick={() => setView('landing')}
              className="w-full py-3 px-4 rounded-xl text-left font-bold text-sm tracking-wide text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center gap-3"
            >
              <LogOut className="w-4 h-4" />
              Return 
            </button>
          </div>

          {/* RIGHT CONTENT DISPLAY PANEL */}
          <div className="col-span-1 md:col-span-9 space-y-8 min-h-[500px]">
            
            {/* ==================================================== */}
            {/* TAB: DASHBOARD OVERVIEW (SCREENSHOT 1) */}
            {/* ==================================================== */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fadeIn">
                
                {/* Four Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Total Visitors */}
                  <div className={cardStyle}>
                    <span className="text-xs uppercase font-bold text-black/50 dark:text-white/40 tracking-wider">Total Visitors</span>
                    <span className="text-3xl font-black mt-2 font-['Outfit']">{totalVisitorsCount.toLocaleString()}</span>
                    <span className="text-[10px] text-black/60 dark:text-white/60 font-bold mt-2">
                      ↑ 12.5% from last week
                    </span>
                  </div>

                  {/* New Visitors */}
                  <div className={cardStyle}>
                    <span className="text-xs uppercase font-bold text-black/50 dark:text-white/40 tracking-wider">New Visitors</span>
                    <span className="text-3xl font-black mt-2 font-['Outfit']">{Math.floor(totalVisitorsCount * 0.675).toLocaleString()}</span>
                    <span className="text-[10px] text-black/60 dark:text-white/60 font-bold mt-2">
                      ↑ 10.3% from last week
                    </span>
                  </div>

                  {/* Returning Visitors */}
                  <div className={cardStyle}>
                    <span className="text-xs uppercase font-bold text-black/50 dark:text-white/40 tracking-wider">Returning Visitors</span>
                    <span className="text-3xl font-black mt-2 font-['Outfit']">{Math.floor(totalVisitorsCount * 0.325).toLocaleString()}</span>
                    <span className="text-[10px] text-black/60 dark:text-white/60 font-bold mt-2">
                      ↑ 15.8% from last week
                    </span>
                  </div>

                  {/* Page Views */}
                  <div className={cardStyle}>
                    <span className="text-xs uppercase font-bold text-black/50 dark:text-white/40 tracking-wider">Page Views</span>
                    <span className="text-3xl font-black mt-2 font-['Outfit']">{Math.floor(totalVisitorsCount * 2.6).toLocaleString()}</span>
                    <span className="text-[10px] text-black/60 dark:text-white/60 font-bold mt-2">
                      ↑ 14.2% from last week
                    </span>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Column 1: Visitors Over Time line chart */}
                  <div className={`${cardStyle} lg:col-span-8 justify-between`}>
                    <div className="flex justify-between items-center border-b border-black/10 dark:border-white/10 pb-3 mb-4 select-none">
                      <span className="text-xs font-bold uppercase tracking-wider">Visitors Over Time</span>
                      <span className="text-[10px] border border-black/20 dark:border-white/20 px-2 py-0.5 rounded font-mono">
                        Daily
                      </span>
                    </div>

                    {/* SVG Line Graph */}
                    <div className="h-48 w-full relative">
                      <svg className="w-full h-full stroke-black dark:stroke-white fill-none" viewBox="0 0 100 40" preserveAspectRatio="none">
                        {/* Horizontal grid lines */}
                        <line x1="0" y1="10" x2="100" y2="10" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="opacity-20" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="opacity-20" />
                        <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 1" className="opacity-20" />
                        
                        {/* Smooth path vector lines connecting May 17 to May 24 */}
                        <path
                          d={`M ${speedHistory.map((val, idx) => `${idx * (100 / (speedHistory.length - 1))},${40 - ((val - 95) * (30 / 30)) - 5}`).join(' L')}`}
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />

                        {/* Nodes */}
                        {speedHistory.map((val, idx) => {
                          const cx = idx * (100 / (speedHistory.length - 1))
                          const cy = 40 - ((val - 95) * (30 / 30)) - 5
                          return (
                            <circle 
                              key={idx} 
                              cx={cx} 
                              cy={cy} 
                              r="1.2" 
                              fill="currentColor" 
                              stroke="none" 
                            />
                          )
                        })}
                      </svg>
                      
                      {/* Timeline dates below SVG */}
                      <div className="flex justify-between text-[8px] font-mono opacity-65 border-t border-black/10 dark:border-white/10 pt-2 select-none">
                        {LINE_GRAPH_DATA.map((d, i) => (
                          <span key={i}>{d.label}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Visitors by Source Donut chart */}
                  <div className={`${cardStyle} lg:col-span-4`}>
                    <div className="text-xs font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-3 mb-4 select-none">
                      Visitors by Source
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-between gap-6">
                      {/* SVG Donut */}
                      <div className="relative flex items-center justify-center shrink-0">
                        <svg width="120" height="120" viewBox="0 0 100 100" className="transform -rotate-90">
                          {DONUT_DATA.map((seg, idx) => {
                            const strokeOffset = DONUT_CIRCUMFERENCE - (seg.percent / 100) * DONUT_CIRCUMFERENCE
                            const rotateAngle = (accumulatedPercent / 100) * 360
                          
                            return (
                              <circle
                                key={idx}
                                cx="50"
                                cy="50"
                                r={DONUT_RADIUS}
                                fill="none"
                                className={`${seg.color}`}
                                strokeWidth="12"
                                strokeDasharray={DONUT_CIRCUMFERENCE}
                                strokeDashoffset={strokeOffset}
                                transform={`rotate(${rotateAngle} 50 50)`}
                              />
                            )
                          })}
                        </svg>
                        
                        {/* Center cut-out text */}
                        <div className="absolute text-center select-none font-['Outfit']">
                          <div className="text-lg font-black">100%</div>
                          <div className="text-[8px] uppercase tracking-wider opacity-60">Traffic</div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="flex-1 w-full text-[10px] space-y-1.5 select-text text-left">
                        {DONUT_DATA.map((seg, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 inline-block ${seg.color.split(' ')[0]} border border-black/15 dark:border-white/10`} style={{ borderWidth: '4px' }} />
                              <span>{seg.label}</span>
                            </div>
                            <span className="font-bold">{seg.percent}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Recent Visitors Table */}
                <div className={cardStyle}>
                  <div className="text-xs font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-3 mb-4 select-none">
                    Recent Visitors
                  </div>
                  
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left text-xs select-text">
                      <thead>
                        <tr className="border-b border-black/20 dark:border-white/20 opacity-60 uppercase select-none">
                          <th className="pb-2">Name</th>
                          <th className="pb-2">Location</th>
                          <th className="pb-2">Source</th>
                          <th className="pb-2 text-center">Pages Viewed</th>
                          <th className="pb-2 text-right">Visit Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 dark:divide-white/5 opacity-90">
                        {RECENT_VISITORS.map((visitor, idx) => (
                          <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <td className="py-3 font-semibold">{visitor.name}</td>
                            <td className="py-3">{visitor.location}</td>
                            <td className="py-3">{visitor.source}</td>
                            <td className="py-3 text-center">{visitor.pages}</td>
                            <td className="py-3 text-right font-mono">{visitor.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-4 text-center border-t border-black/5 dark:border-white/5 select-none">
                    <button className="px-6 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs font-bold rounded-full">
                      View All Visitors
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB: VISITORS BY LOCATION */}
            {/* ==================================================== */}
            {activeTab === 'visitors' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-fadeIn">
                
                {/* Left Column: Recent Visitors Table */}
                <div className={`${cardStyle} lg:col-span-8 justify-between`}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-3 mb-4 select-none">
                      Recent Visitors
                    </div>
                    
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-left text-xs select-text">
                        <thead>
                          <tr className="border-b border-black/20 dark:border-white/20 opacity-60 uppercase select-none">
                            <th className="pb-2">Name</th>
                            <th className="pb-2">Location</th>
                            <th className="pb-2">Source</th>
                            <th className="pb-2 text-center">Pages Viewed</th>
                            <th className="pb-2 text-right">Visit Time</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5 opacity-90">
                          {RECENT_VISITORS.map((visitor, idx) => (
                            <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                              <td className="py-3 font-semibold">{visitor.name}</td>
                              <td className="py-3">{visitor.location}</td>
                              <td className="py-3">{visitor.source}</td>
                              <td className="py-3 text-center">{visitor.pages}</td>
                              <td className="py-3 text-right font-mono">{visitor.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-4 text-center border-t border-black/5 dark:border-white/5 select-none">
                    <button className="px-6 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-xs font-bold rounded-full">
                      View All Visitors
                    </button>
                  </div>
                </div>

                {/* Right Column: Top Cities list with randomized counts */}
                <div className={`${cardStyle} lg:col-span-4 justify-between`}>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider border-b border-black/10 dark:border-white/10 pb-3 mb-4 select-none">
                      Top Cities
                    </div>
                    
                    <div className="overflow-y-auto max-h-[360px] pr-1 select-text">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-black/20 dark:border-white/20 opacity-60 uppercase select-none">
                            <th className="pb-2">City</th>
                            <th className="pb-2 text-right">Visitors</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                          {cityVisitors
                            .sort((a, b) => b.count - a.count)
                            .map((city, idx) => (
                              <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <td className="py-2.5 font-bold font-['Inter']">{city.name}</td>
                                <td className="py-2.5 text-right font-extrabold">{city.count}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="pt-4 text-center border-t border-black/5 dark:border-white/5 select-none">
                    <button className="px-8 py-2.5 bg-[#111110] dark:bg-white text-white dark:text-black hover:scale-105 transition-transform text-xs font-bold rounded-full">
                      View Full Report
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* OTHER TAB PLACEHOLDERS (Reports, Settings) */}
            {/* ==================================================== */}
            {(activeTab === 'reports' || activeTab === 'settings') && (
              <div className={`${cardStyle} justify-center items-center py-20 text-center select-none animate-fadeIn`}>
                <Database className="w-12 h-12 stroke-current mb-4" />
                <h3 className="text-lg font-bold uppercase mb-2">
                  {activeTab} Sector Offline
                </h3>
                <p className="text-sm text-black/60 dark:text-white/60 max-w-sm">
                  This administrative module is currently unlinked. Database configuration variables are pending setup.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </div>
  )
}
