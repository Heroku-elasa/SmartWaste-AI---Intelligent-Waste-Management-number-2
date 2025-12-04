
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, ComposedChart, Cell } from 'recharts';
import { useLanguage, Page } from '../types';

interface RealTimeDashboardProps {
  setPage: (page: Page) => void;
}

interface DataPoint {
  time: string;
  fillLevel: number;
  confidence: number;
}

interface CandleDataPoint {
  time: string;
  open: number;
  close: number;
  high: number;
  low: number;
  body: [number, number];
  wick: [number, number];
}

interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: 'INFO' | 'WARN' | 'ERROR';
}

const RealTimeDashboard: React.FC<RealTimeDashboardProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const [data, setData] = useState<DataPoint[]>([]);
  const [candleData, setCandleData] = useState<CandleDataPoint[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [stats, setStats] = useState({
      ingestionRate: 850,
      latency: 45,
      activeSensors: 1240,
      anomalies: 3
  });

  // Helper to generate candlestick data
  const generateNextCandle = (time: string, prevClose: number): CandleDataPoint => {
      const volatility = 8;
      const open = prevClose;
      const change = (Math.random() - 0.5) * volatility;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * (volatility / 3);
      const low = Math.min(open, close) - Math.random() * (volatility / 3);
      
      return {
          time,
          open,
          close,
          high,
          low,
          body: [Math.min(open, close), Math.max(open, close)],
          wick: [low, high]
      };
  };

  // Simulate real-time data stream
  useEffect(() => {
    // Initialize candle data
    const initialCandles: CandleDataPoint[] = [];
    let lastClose = 50;
    const now = new Date();
    for (let i = 20; i > 0; i--) {
        const time = new Date(now.getTime() - i * 1000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
        const candle = generateNextCandle(time, lastClose);
        initialCandles.push(candle);
        lastClose = candle.close;
    }
    setCandleData(initialCandles);

    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });
      
      // Update Area/Bar data
      setData(prevData => {
        const newData = [...prevData, {
          time: timeString,
          fillLevel: Math.floor(Math.random() * (90 - 30 + 1) + 30), // Random between 30 and 90
          confidence: Math.floor(Math.random() * (99 - 85 + 1) + 85) // Random between 85 and 99
        }];
        if (newData.length > 30) newData.shift();
        return newData;
      });

      // Update Candle Data
      setCandleData(prev => {
          const last = prev[prev.length - 1];
          const newCandle = generateNextCandle(timeString, last ? last.close : 50);
          const newCandles = [...prev, newCandle];
          if (newCandles.length > 30) newCandles.shift();
          return newCandles;
      });

      // Update stats slightly to simulate fluctuation
      setStats(prev => ({
          ...prev,
          ingestionRate: prev.ingestionRate + Math.floor(Math.random() * 20 - 10),
          latency: Math.max(20, prev.latency + Math.floor(Math.random() * 10 - 5))
      }));

      // Simulate Logs
      if (Math.random() > 0.7) {
          const sources = ['Kafka-Broker-1', 'RisingWave-Compute-Node', 'ML-Inference-Service'];
          const msgs = ['High latency detected', 'Batch processed successfully', 'Feature drift warning', 'Rebalancing partition'];
          const source = sources[Math.floor(Math.random() * sources.length)];
          const msg = msgs[Math.floor(Math.random() * msgs.length)];
          
          const newLog: LogEntry = {
              id: Date.now(),
              timestamp: timeString,
              message: `[${source}] ${msg}`,
              type: Math.random() > 0.85 ? 'WARN' : Math.random() > 0.95 ? 'ERROR' : 'INFO'
          };
          setLogs(prev => [newLog, ...prev].slice(0, 8));
      }

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-xl text-xs text-gray-200">
          <p className="label font-bold">{label}</p>
          <p>{`Value: ${Number(payload[0].value).toFixed(2)}`}</p>
        </div>
      );
    }
    return null;
  };
  
  const CandleTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          const data = payload[0].payload;
          return (
            <div className="bg-gray-800 border border-gray-700 p-2 rounded shadow-xl text-xs text-gray-200">
              <p className="label font-bold">{label}</p>
              <p className="text-green-400">High: {data.high.toFixed(2)}</p>
              <p className="text-white">Open: {data.open.toFixed(2)}</p>
              <p className="text-white">Close: {data.close.toFixed(2)}</p>
              <p className="text-red-400">Low: {data.low.toFixed(2)}</p>
            </div>
          );
      }
      return null;
  };

  const StatCard = ({ title, value, unit, color = "text-white" }: { title: string, value: string | number, unit?: string, color?: string }) => (
      <div className="bg-[#1f2833] border border-gray-700 p-4 rounded-lg shadow-sm hover:border-gray-500 transition-colors">
          <p className="text-gray-400 text-xs uppercase font-bold tracking-wider">{title}</p>
          <p className={`text-2xl font-mono mt-1 ${color}`}>{value}<span className="text-sm text-gray-500 ml-1">{unit}</span></p>
      </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-300 font-sans animate-fade-in pb-12">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0b0c10] py-4 px-6 shadow-md sticky top-0 z-30 flex justify-between items-center backdrop-blur-md bg-opacity-80">
        <div className="flex items-center gap-4">
            <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.7)]"></span>
                    {t('realTimeDashboard.title')}
                </h1>
                <p className="text-xs text-gray-400 mt-1">{t('realTimeDashboard.subtitle')}</p>
            </div>
            <div className="hidden md:flex gap-2 ml-6">
                <span className="px-2 py-0.5 rounded text-[10px] border border-orange-500/30 text-orange-400 bg-orange-500/10 font-mono">Kafka Connect: OK</span>
                <span className="px-2 py-0.5 rounded text-[10px] border border-blue-500/30 text-blue-400 bg-blue-500/10 font-mono">RisingWave: Active</span>
            </div>
        </div>
        <button onClick={() => setPage('home')} className="text-sm text-gray-400 hover:text-white transition-colors border border-gray-700 px-3 py-1.5 rounded hover:bg-gray-800">
            &larr; {t('realTimeDashboard.back')}
        </button>
      </header>

      <div className="p-6 max-w-7xl mx-auto space-y-6">
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard title={t('realTimeDashboard.stat1')} value={stats.ingestionRate} unit="events/s" color="text-green-400" />
              <StatCard title={t('realTimeDashboard.stat2')} value={stats.latency} unit="ms" color="text-blue-400" />
              <StatCard title={t('realTimeDashboard.stat3')} value={stats.activeSensors} color="text-purple-400" />
              <StatCard title={t('realTimeDashboard.stat4')} value={stats.anomalies} color="text-red-400" />
          </div>

          {/* Main Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Candlestick Chart (Simulated with ComposedChart) */}
              <div className="lg:col-span-2 bg-[#1f2833] border border-gray-700 rounded-lg p-5 shadow-lg relative group">
                  <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                          Metric Volatility (Candlestick)
                      </h3>
                      <div className="flex gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                          <span className="text-[10px] text-gray-400">Rising</span>
                          <span className="w-2 h-2 rounded-full bg-red-500 ml-2"></span>
                          <span className="text-[10px] text-gray-400">Falling</span>
                      </div>
                  </div>
                  <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={candleData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                              <XAxis dataKey="time" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                              <Tooltip content={<CandleTooltip />} cursor={{ stroke: '#666', strokeWidth: 1, strokeDasharray: '3 3' }} />
                              {/* Wick */}
                              <Bar dataKey="wick" barSize={1} fill="#9ca3af" />
                              {/* Body */}
                              <Bar dataKey="body" barSize={8}>
                                {candleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.close > entry.open ? '#10B981' : '#EF4444'} />
                                ))}
                              </Bar>
                          </ComposedChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="absolute top-5 right-5 opacity-20 text-4xl font-black text-white pointer-events-none">Grafana</div>
              </div>

              {/* Side Panels Column */}
              <div className="space-y-6">
                  {/* ML Confidence Chart */}
                  <div className="bg-[#1f2833] border border-gray-700 rounded-lg p-5 shadow-lg h-1/2">
                      <h3 className="text-sm font-bold text-gray-200 mb-4">{t('realTimeDashboard.chart2')}</h3>
                      <div className="h-32 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={data}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                  <XAxis dataKey="time" hide />
                                  <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={[80, 100]} />
                                  <Tooltip content={<CustomTooltip />} />
                                  <Bar dataKey="confidence" fill="#66FCF1" radius={[2, 2, 0, 0]} isAnimationActive={false} />
                              </BarChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
                  
                   {/* Ingestion Rate Mini Chart */}
                   <div className="bg-[#1f2833] border border-gray-700 rounded-lg p-5 shadow-lg h-[45%]">
                      <h3 className="text-sm font-bold text-gray-200 mb-4">Ingestion Stream</h3>
                      <div className="h-32 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={data}>
                                  <defs>
                                      <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#45C4B0" stopOpacity={0.3}/>
                                          <stop offset="95%" stopColor="#45C4B0" stopOpacity={0}/>
                                      </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                  <YAxis hide domain={[0, 100]} />
                                  <Area type="monotone" dataKey="fillLevel" stroke="#45C4B0" fillOpacity={1} fill="url(#colorFill)" isAnimationActive={false} />
                              </AreaChart>
                          </ResponsiveContainer>
                      </div>
                  </div>
              </div>
          </div>

          {/* Logs Panel */}
          <div className="bg-[#1f2833] border border-gray-700 rounded-lg p-5 shadow-lg">
              <h3 className="text-sm font-bold text-gray-200 mb-4 flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                    {t('realTimeDashboard.log')}
                  </span>
                  <span className="text-[10px] text-green-400 font-mono animate-pulse">● LIVE STREAM</span>
              </h3>
              <div className="h-48 overflow-y-auto font-mono text-xs space-y-2 pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent bg-[#0b0c10] p-4 rounded border border-gray-800">
                  {logs.map(log => (
                      <div key={log.id} className="border-b border-gray-800/50 pb-1 last:border-0 hover:bg-white/5 transition-colors">
                          <span className="text-gray-500 mr-3">[{log.timestamp}]</span>
                          <span className={`mr-3 font-bold ${log.type === 'ERROR' ? 'text-red-500' : log.type === 'WARN' ? 'text-yellow-500' : 'text-blue-400'}`}>{log.type}</span>
                          <span className="text-gray-300">{log.message}</span>
                      </div>
                  ))}
                  {logs.length === 0 && <p className="text-gray-600 italic">Waiting for events from RisingWave...</p>}
              </div>
          </div>

      </div>
    </div>
  );
};

export default RealTimeDashboard;
