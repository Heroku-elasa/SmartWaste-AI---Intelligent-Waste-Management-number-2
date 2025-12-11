
import React, { useState, useEffect } from 'react';
import { useLanguage, Page, WasteReport, WastePrediction, DashboardAnalytics, TuningHyperparameters, TuningLog, Grant, Transaction, BlockchainState } from '../types';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type Tab = 'report' | 'predict' | 'analytics' | 'tuning' | 'special_grants' | 'recycle_chain';
type ReportStatus = 'Pending' | 'En Route' | 'Completed';
type ViewMode = 'list' | 'map';
type RCTab = 'dashboard' | 'wallet' | 'mining' | 'classification' | 'chat';

interface MapCoordinate {
    x: number; // percentage 0-100
    y: number; // percentage 0-100
}

interface LiveWasteReport extends WasteReport {
  id: number;
  status: ReportStatus;
  coordinates: MapCoordinate;
}

interface CollectionVehicle {
    id: string;
    coordinates: MapCoordinate;
    status: 'Idle' | 'Moving' | 'Collection';
    type: 'Truck' | 'Van';
}

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-gray-500 font-medium self-center">{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

interface SmartWasteDashboardProps {
  setPage: (page: Page) => void;
  onReportSubmit: (report: WasteReport) => void;
  isSubmittingReport: boolean;
  reportSubmissionResult: string | null;
  onPredict: (location: string) => void;
  isPredicting: boolean;
  predictionResult: WastePrediction | null;
  onFetchAnalytics: () => void;
  isFetchingAnalytics: boolean;
  analyticsResult: DashboardAnalytics | null;
  error: string | null;
  onViewGrant: (grant: Grant) => void;
}

const SmartWasteDashboard: React.FC<SmartWasteDashboardProps> = (props) => {
    const { 
        setPage, 
        onReportSubmit, isSubmittingReport, reportSubmissionResult,
        onPredict, isPredicting, predictionResult,
        onFetchAnalytics, isFetchingAnalytics, analyticsResult,
        error,
        onViewGrant
    } = props;
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('report');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [predictionLocation, setPredictionLocation] = useState('');
  
  // Tuning State
  const [tuningFile, setTuningFile] = useState<File | null>(null);
  const [hyperparameters, setHyperparameters] = useState<TuningHyperparameters>({ epochs: 10, batchSize: 32, learningRate: 0.001 });
  const [tuningStatus, setTuningStatus] = useState<'idle' | 'uploading' | 'training' | 'completed'>('idle');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [tuningLogs, setTuningLogs] = useState<TuningLog[]>([]);

  // RecycleChain State
  const [rcTab, setRcTab] = useState<RCTab>('dashboard');
  const [walletState, setWalletState] = useState<BlockchainState>({
      isConnected: false,
      walletAddress: '0x32c5ce7aac2e4f929d82c29079248f20', // Pre-filled for demo
      balance: 0.00,
      networkStatus: 'Active'
  });
  // Using dummy transactions for dashboard
  const transactions: Transaction[] = [
      { hash: '0x3a...e1b', block: 1405923, from: 'Network', to: '0x71C...9A23', amount: '+50 ECO', timestamp: '2 mins ago', type: 'Reward' },
      { hash: '0x8f...2c9', block: 1405920, from: '0x71C...9A23', to: '0x42B...1F2', amount: '-120 ECO', timestamp: '1 hr ago', type: 'Transfer' },
      { hash: '0x1d...a44', block: 1405915, from: 'Network', to: '0x71C...9A23', amount: '+25 ECO', timestamp: '5 hrs ago', type: 'Reward' },
      { hash: '0x9e...f77', block: 1405901, from: 'Network', to: '0x71C...9A23', amount: '+10 ECO', timestamp: '1 day ago', type: 'Reward' },
  ];

  // Mock data for the live feed with coordinates
  const initialRequests: LiveWasteReport[] = [
    { id: 1, location: 'Tehran, Velenjak', wasteType: 'Recyclable', volume: 'Large', status: 'Pending', description: '', coordinates: { x: 60, y: 15 } },
    { id: 2, location: 'Tehran, Saadat Abad', wasteType: 'Mixed', volume: 'Medium', status: 'Pending', description: '', coordinates: { x: 30, y: 25 } },
    { id: 3, location: 'Karaj, Mehrshahr', wasteType: 'Organic', volume: 'Small', status: 'En Route', description: '', coordinates: { x: 10, y: 55 } },
    { id: 4, location: 'Tehran, Ekbatan', wasteType: 'Hazardous', volume: 'Small', status: 'Completed', description: '', coordinates: { x: 25, y: 50 } },
    { id: 5, location: 'Tehran, Pars', wasteType: 'Recyclable', volume: 'Medium', status: 'Pending', description: '', coordinates: { x: 80, y: 35 } },
  ];
  
  const [requests, setRequests] = useState<LiveWasteReport[]>(initialRequests);

  // Mock vehicles
  const [vehicles] = useState<CollectionVehicle[]>([
      { id: 'TRK-01', coordinates: { x: 45, y: 40 }, status: 'Moving', type: 'Truck' },
      { id: 'TRK-02', coordinates: { x: 75, y: 20 }, status: 'Idle', type: 'Truck' },
      { id: 'VAN-05', coordinates: { x: 15, y: 52 }, status: 'Collection', type: 'Van' },
  ]);
  
  const handleDispatch = (id: number) => {
      setRequests(prev => prev.map(r => (r.id === id && r.status === 'Pending' ? { ...r, status: 'En Route' } : r)));
  };


  useEffect(() => {
    if (activeTab === 'analytics' && !analyticsResult) {
      onFetchAnalytics();
    }
  }, [activeTab, analyticsResult, onFetchAnalytics]);
  
  const handlePredictClick = () => {
    if (!predictionLocation.trim()) return;
    onPredict(predictionLocation);
  };
  
  // Tuning Simulation
  const handleTuningFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
          setTuningFile(e.target.files[0]);
      }
  };

  const startTuning = () => {
      if(!tuningFile) return;
      
      setTuningStatus('uploading');
      setTrainingProgress(0);
      setTuningLogs([{ timestamp: new Date().toLocaleTimeString(), message: 'Initiating upload...', type: 'info'}]);

      // Simulate Upload
      setTimeout(() => {
          setTuningStatus('training');
          setTuningLogs(prev => [...prev, { timestamp: new Date().toLocaleTimeString(), message: 'Dataset uploaded successfully. Validating schema...', type: 'success'}]);
          
          let progress = 0;
          const interval = setInterval(() => {
              progress += 5;
              setTrainingProgress(progress);
              
              // Simulate logs
              if (progress % 20 === 0) {
                   const epoch = Math.ceil((progress / 100) * hyperparameters.epochs);
                   const loss = (Math.random() * 0.5 + (100 - progress)/200).toFixed(4);
                   setTuningLogs(prev => [...prev, { 
                       timestamp: new Date().toLocaleTimeString(), 
                       message: `Epoch ${epoch}/${hyperparameters.epochs} - Loss: ${loss} - Accuracy: ${(progress * 0.9 + 10).toFixed(2)}%`, 
                       type: 'info'
                   }]);
              }

              if (progress >= 100) {
                  clearInterval(interval);
                  setTuningStatus('completed');
                  setTuningLogs(prev => [...prev, { timestamp: new Date().toLocaleTimeString(), message: 'Model training completed. Deployed to production.', type: 'success'}]);
              }
          }, 500);

      }, 2000);
  };

  // Special Grants Data Objects
  const cifiaGrant: Grant = {
      grantTitle: 'Carbon Dioxide Transportation Infrastructure Finance (CIFIA)',
      grantNumber: 'DE-FOA-0002966',
      issuingAgency: 'Department of Energy - National Energy Technology Laboratory',
      amount: '$500,000,000 (Up to $500M per award)',
      fundingAvailable: '$500,000,000 (Up to $500M per award)',
      deadline: 'January 2, 2026',
      status: 'OPEN - Posted',
      link: 'https://www.fedconnect.net',
      description: 'Part of the Bipartisan Infrastructure Law, this program supports carbon dioxide transportation infrastructure that enables future growth in carbon capture, utilization, and storage. This directly aligns with waste-to-carbon removal technologies that require CO2 transport infrastructure.',
      programOverview: 'Part of the Bipartisan Infrastructure Law, this program supports carbon dioxide transportation infrastructure that enables future growth in carbon capture, utilization, and storage. This directly aligns with waste-to-carbon removal technologies that require CO2 transport infrastructure.',
      keyFeatures: [
          'Funding Type: Cooperative Agreement',
          'Cost Sharing: Required',
          'Expected Awards: 5 grants',
          'Award Range: $1 - $500,000,000 per project',
          'Program Focus: Infrastructure for carbon dioxide transportation systems'
      ],
      eligibility: 'See Section III.A.i of the FOA for detailed eligibility requirements. Restricted eligibility applies.',
      whyThisFits: 'This grant is ideal for scaling waste-to-carbon removal technologies that require infrastructure for CO2 capture, transport, and sequestration. The large funding amount supports demonstration and commercial-scale deployment.',
      contactInformation: 'Program Officer: Dorothy J. Pitre\nEmail: dorothy.pitre@netl.doe.gov\nPhone: 412-386-9398',
      applicationMaterials: [
          'Full announcement available on FedConnect',
          'Budget Justification Workbook required',
          'Project Management Plan (PMP) required'
      ]
  };

  const swifrGrant: Grant = {
      grantTitle: 'Solid Waste Infrastructure for Recycling (SWIFR) - Tribal Program',
      grantNumber: 'EPA-I-OLEM-ORCR-25-02',
      issuingAgency: 'Environmental Protection Agency',
      amount: '$20,000,000 total',
      deadline: 'January 23, 2026 (Extended)',
      status: 'OPEN - Posted',
      link: 'https://www.epa.gov/grants',
      description: 'The SWIFR grant program assists local waste management authorities in improving post-consumer materials management and municipal recycling programs. Supports a circular economy approach that is restorative and regenerative by design.',
      programOverview: 'The SWIFR grant program assists local waste management authorities in improving post-consumer materials management and municipal recycling programs. Supports a circular economy approach that is restorative and regenerative by design.',
      keyFeatures: [
          'Funding Type: Cooperative Agreement',
          'Cost Sharing: Not required',
          'Expected Awards: 20 grants',
          'Award Range: $100,000 - $1,500,000 per project',
          'Program Focus: Waste management systems, recycling infrastructure, circular economy'
      ],
      eligibility: 'Tribes and Intertribal Consortia (See Section 2 of the FOA for complete eligibility)',
      whyThisFits: 'Directly supports waste management innovation and infrastructure improvements. The circular economy focus aligns with waste-to-carbon removal approaches that eliminate waste while capturing carbon.',
      contactInformation: 'Program Contacts: Chris Carusiello and Jamie Lutz\nEmail: SWIFRTribal@epa.gov\nPhone: 202-564-1584',
      applicationMaterials: [
          'Full announcement: EPA-I-OLEM-ORCR-25-02_Revised Dec 2025.pdf',
          'CFDA Number: 66.920'
      ]
  };

  const statusColors: { [key in ReportStatus]: string } = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'En Route': 'bg-blue-100 text-blue-800 border-blue-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
  };

  const statusMapColors: { [key in ReportStatus]: string } = {
    Pending: 'bg-yellow-500 border-yellow-200 shadow-yellow-500/50',
    'En Route': 'bg-blue-500 border-blue-200 shadow-blue-500/50',
    Completed: 'bg-green-500 border-green-200 shadow-green-500/50',
  };

  const renderMap = () => (
      <div className="relative w-full h-[600px] bg-[#eef2f6] rounded-xl overflow-hidden shadow-inner border border-gray-300 group">
          {/* Abstract City Background */}
          <div className="absolute inset-0 opacity-20" style={{ 
              backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
          }}></div>
          
          {/* Abstract Roads SVG */}
          <svg className="absolute inset-0 w-full h-full text-gray-300 pointer-events-none opacity-60">
             <path d="M-50 200 Q 250 350 500 200 T 1000 250" fill="none" stroke="currentColor" strokeWidth="25" />
             <path d="M300 -50 Q 200 250 400 500 T 250 1000" fill="none" stroke="currentColor" strokeWidth="25" />
             <path d="M700 -50 L 500 1000" fill="none" stroke="currentColor" strokeWidth="15" />
             <path d="M-50 450 L 1000 350" fill="none" stroke="currentColor" strokeWidth="20" />
             <circle cx="60%" cy="15%" r="80" fill="currentColor" className="opacity-10" />
             <rect x="20%" y="60%" width="150" height="150" fill="currentColor" className="opacity-10" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-200 text-xs z-10 space-y-2">
              <div className="font-bold text-gray-700 mb-1">Map Legend</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span> Pending Request</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> En Route</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Completed</div>
              <div className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-800" viewBox="0 0 20 20" fill="currentColor"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" /></svg>
                   Collection Vehicle
              </div>
          </div>

          {/* Requests Markers */}
          {requests.map((req) => (
              <div 
                key={req.id} 
                className="absolute flex flex-col items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200 hover:z-20 group"
                style={{ top: `${req.coordinates.y}%`, left: `${req.coordinates.x}%` }}
              >
                 {/* Prominent Marker Icon */}
                 <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-white shadow-xl ${statusMapColors[req.status]} text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {/* Pulse effect for pending items */}
                    {req.status === 'Pending' && (
                         <span className="absolute -inset-1 rounded-full bg-yellow-400 opacity-40 animate-ping"></span>
                    )}
                 </div>
                 
                 {/* Triangle pointer for pin effect */}
                 <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] -mt-0.5 ${req.status === 'Pending' ? 'border-t-yellow-500' : req.status === 'En Route' ? 'border-t-blue-500' : 'border-t-green-500'}`}></div>

                 {/* Tooltip */}
                 <div className="absolute bottom-full mb-3 w-48 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg py-2 px-3 hidden group-hover:block z-30 shadow-2xl border border-gray-700">
                    <div className="flex justify-between items-start">
                         <p className="font-bold text-sm text-gray-100">{req.location}</p>
                         <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${req.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' : req.status === 'En Route' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'}`}>
                             {req.status}
                         </span>
                    </div>
                    <div className="mt-2 space-y-1 text-gray-300">
                         <p><span className="text-gray-500">Type:</span> {req.wasteType}</p>
                         <p><span className="text-gray-500">Volume:</span> {req.volume}</p>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-700 flex justify-between items-center text-[10px] text-gray-400">
                        <span>ID: #{req.id}</span>
                        <span>Click to view</span>
                    </div>
                 </div>
              </div>
          ))}

          {/* Vehicle Markers */}
          {vehicles.map((v) => (
              <div 
                key={v.id} 
                className="absolute flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform hover:z-20 group"
                style={{ top: `${v.coordinates.y}%`, left: `${v.coordinates.x}%` }}
              >
                  <div className="relative bg-white p-1.5 rounded-full shadow-lg border border-gray-300 text-gray-800">
                     <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                         <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                         <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                     </svg>
                     {/* Status Dot */}
                     <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white ${v.status === 'Moving' ? 'bg-green-500 animate-pulse' : v.status === 'Collection' ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                  </div>
                  {/* Tooltip */}
                 <div className="absolute bottom-full mb-2 w-32 bg-gray-900 text-white text-xs rounded-md py-2 px-3 hidden group-hover:block z-20 pointer-events-none shadow-xl text-center">
                    <p className="font-bold">{v.id}</p>
                    <p className="opacity-80">{v.type}</p>
                    <p className="mt-1 text-gray-300">Status: {v.status}</p>
                 </div>
              </div>
          ))}
      </div>
  );

  // New Charts Data
  const tokenDistributionData = [
      { name: 'Miners', value: 45, color: '#4ade80' },
      { name: 'Liquidity', value: 25, color: '#fbbf24' },
      { name: 'Team', value: 15, color: '#60a5fa' },
      { name: 'Burn', value: 10, color: '#f87171' },
      { name: 'DAO', value: 5, color: '#a78bfa' },
  ];

  const nodeStatusData = [
      { name: 'Mining', value: 85, fill: '#4ade80' },
      { name: 'Syncing', value: 10, fill: '#fbbf24' },
      { name: 'Offline', value: 5, fill: '#f87171' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'report':
        return (
          <div className="bg-white rounded-2xl animate-fade-in border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">{language === 'fa' ? 'زنده' : 'Live'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{t('smartWasteDashboard.liveFeed.title')}</h3>
                    <p className="text-sm text-gray-500 mt-1">{t('smartWasteDashboard.liveFeed.subtitle')}</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-xl mt-4 sm:mt-0">
                    <button 
                        onClick={() => setViewMode('list')}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${viewMode === 'list' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        {language === 'fa' ? 'لیست' : 'List'}
                    </button>
                    <button 
                         onClick={() => setViewMode('map')}
                         className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 ${viewMode === 'map' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                        {language === 'fa' ? 'نقشه' : 'Map'}
                    </button>
                </div>
            </div>

            <div className="p-6">
                {viewMode === 'list' ? (
                    <div className="space-y-3">
                    {requests.map((req, index) => (
                        <div key={req.id} className="bg-gray-50 hover:bg-gray-100 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200 hover:border-primary/40 transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-200 text-gray-400 group-hover:border-primary/30 group-hover:text-primary transition-colors">
                                    <span className="text-lg font-bold">#{index + 1}</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-900">{req.location}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-white border border-gray-200 rounded-md text-gray-600">{req.wasteType}</span>
                                        <span className="text-gray-300">|</span>
                                        <span className="text-xs text-gray-500">{req.volume}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg border ${statusColors[req.status]}`}>
                                    {t(`smartWasteDashboard.liveFeed.statuses.${req.status.toLowerCase().replace(' ', '')}`)}
                                </span>
                                <button 
                                    onClick={() => handleDispatch(req.id)}
                                    disabled={req.status !== 'Pending'}
                                    className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-600 transition-all shadow-sm hover:shadow disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
                                >
                                    {t('smartWasteDashboard.liveFeed.dispatch')}
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                ) : (
                    <div className="animate-fade-in">
                        {renderMap()}
                    </div>
                )}
            </div>
          </div>
        );
      case 'predict':
        return (
            <div className="bg-white rounded-2xl animate-fade-in border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{t('smartWasteDashboard.prediction.title')}</h3>
                            <p className="text-sm text-gray-500 mt-1">{t('smartWasteDashboard.prediction.subtitle')}</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-6">
                    <form onSubmit={(e) => { e.preventDefault(); handlePredictClick(); }} className="space-y-4">
                        <div>
                            <label htmlFor="prediction-location" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('smartWasteDashboard.prediction.locationLabel')}
                            </label>
                            <input
                                id="prediction-location"
                                type="text"
                                value={predictionLocation}
                                onChange={(e) => setPredictionLocation(e.target.value)}
                                placeholder={t('smartWasteDashboard.prediction.locationPlaceholder')}
                                className="block w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-gray-900 placeholder-gray-400 transition-all"
                            />
                            <ExamplePrompts 
                                prompts={t('examplePrompts.smartPrediction')} 
                                onPromptClick={setPredictionLocation} 
                                t={t} 
                            />
                        </div>
                        
                        <button type="submit" disabled={isPredicting || !predictionLocation.trim()} className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 disabled:bg-gray-300 transition-all shadow-sm hover:shadow-md disabled:shadow-none">
                            {isPredicting ? t('smartWasteDashboard.prediction.predicting') : t('smartWasteDashboard.prediction.button')}
                        </button>
                    </form>

                    <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-xl min-h-[120px] flex items-center justify-center text-center">
                        {isPredicting && (
                            <div>
                                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
                                <p className="mt-4 text-sm text-gray-600 font-medium">{t('smartWasteDashboard.prediction.predicting')}</p>
                            </div>
                        )}
                        {predictionResult && !isPredicting && <p className="text-gray-800 leading-relaxed">{predictionResult.predictionText}</p>}
                        {!isPredicting && !predictionResult && <p className="text-gray-400">{t('smartWasteDashboard.prediction.placeholder')}</p>}
                    </div>
                </div>
            </div>
        );
      case 'analytics':
        return (
            <div className="bg-white rounded-2xl animate-fade-in border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-white">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 flex-shrink-0">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{t('smartWasteDashboard.analytics.title')}</h3>
                            <p className="text-sm text-gray-500 mt-1">{language === 'fa' ? 'بررسی شاخص‌های کلیدی عملکرد سیستم' : 'Review key performance indicators and system metrics'}</p>
                        </div>
                    </div>
                </div>
                 
                <div className="p-6">
                    {isFetchingAnalytics && (
                        <div className="text-center py-8">
                            <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
                            <p className="mt-4 text-sm text-gray-500">{t('smartWasteDashboard.analytics.summaryPlaceholder')}</p>
                        </div>
                    )}
                    {analyticsResult && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 text-center group hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mx-auto mb-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('smartWasteDashboard.analytics.aiAccuracy')}</p>
                                    <p className="text-3xl font-bold text-green-600">{analyticsResult.aiAccuracy}%</p>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-100 text-center group hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mx-auto mb-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('smartWasteDashboard.analytics.todayReports')}</p>
                                    <p className="text-3xl font-bold text-blue-600">{analyticsResult.todayReports}</p>
                                </div>
                                <div className="p-5 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-100 text-center group hover:shadow-md transition-shadow">
                                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mx-auto mb-3">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('smartWasteDashboard.analytics.routingImprovement')}</p>
                                    <p className="text-3xl font-bold text-orange-600">{analyticsResult.routingImprovement}%</p>
                                </div>
                            </div>
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    {t('smartWasteDashboard.analytics.performanceReport')}
                                </h4>
                                <p className="text-sm text-gray-600 leading-relaxed">{analyticsResult.summary}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
      case 'tuning':
        return (
            <div className="p-6 bg-white rounded-lg animate-fade-in border border-gray-200 shadow-sm">
                <div>
                    <h3 className="text-lg font-semibold text-dark">{t('smartWasteDashboard.tuning.title')}</h3>
                    <p className="text-sm text-gray-600">{t('smartWasteDashboard.tuning.subtitle')}</p>
                </div>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Col: Config */}
                    <div className="space-y-6">
                        {/* File Upload */}
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                            <input 
                                type="file" 
                                id="dataset-upload" 
                                accept=".csv,.jsonl" 
                                onChange={handleTuningFileChange} 
                                className="hidden"
                                disabled={tuningStatus !== 'idle'} 
                            />
                            <label htmlFor="dataset-upload" className={`cursor-pointer flex flex-col items-center ${tuningStatus !== 'idle' ? 'cursor-not-allowed opacity-50' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                                <span className="text-sm font-medium text-gray-700">{tuningFile ? tuningFile.name : t('smartWasteDashboard.tuning.uploadTitle')}</span>
                                <span className="text-xs text-gray-500 mt-1">{tuningFile ? `${(tuningFile.size / 1024).toFixed(2)} KB` : t('smartWasteDashboard.tuning.uploadPlaceholder')}</span>
                            </label>
                        </div>

                        {/* Hyperparameters */}
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <h4 className="text-sm font-bold text-dark mb-4 border-b border-gray-200 pb-2">{t('smartWasteDashboard.tuning.paramsTitle')}</h4>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('smartWasteDashboard.tuning.epochs')}</label>
                                    <input 
                                        type="number" 
                                        value={hyperparameters.epochs} 
                                        onChange={(e) => setHyperparameters({...hyperparameters, epochs: parseInt(e.target.value)})}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
                                        disabled={tuningStatus !== 'idle'}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('smartWasteDashboard.tuning.batchSize')}</label>
                                    <select 
                                        value={hyperparameters.batchSize}
                                        onChange={(e) => setHyperparameters({...hyperparameters, batchSize: parseInt(e.target.value)})}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
                                        disabled={tuningStatus !== 'idle'}
                                    >
                                        <option value="8">8</option>
                                        <option value="16">16</option>
                                        <option value="32">32</option>
                                        <option value="64">64</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-600 mb-1">{t('smartWasteDashboard.tuning.learningRate')}</label>
                                    <input 
                                        type="number" 
                                        step="0.0001"
                                        value={hyperparameters.learningRate} 
                                        onChange={(e) => setHyperparameters({...hyperparameters, learningRate: parseFloat(e.target.value)})}
                                        className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-primary focus:border-primary"
                                        disabled={tuningStatus !== 'idle'}
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={startTuning}
                            disabled={tuningStatus !== 'idle' || !tuningFile}
                            className={`w-full py-2.5 rounded-lg font-bold text-white transition-all ${tuningStatus === 'idle' ? 'bg-primary hover:bg-primary-700 shadow-md' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {tuningStatus === 'idle' ? t('smartWasteDashboard.tuning.startTraining') : t('smartWasteDashboard.tuning.training')}
                        </button>
                    </div>

                    {/* Right Col: Logs & Status */}
                    <div className="flex flex-col h-full bg-[#1e1e1e] rounded-lg overflow-hidden text-gray-300 font-mono text-xs border border-gray-700 shadow-inner">
                        <div className="bg-[#2d2d2d] px-4 py-2 flex justify-between items-center border-b border-gray-700">
                             <span className="font-bold text-gray-100">{t('smartWasteDashboard.tuning.logsTitle')}</span>
                             <div className="flex gap-1.5">
                                 <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                                 <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                             </div>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 max-h-[400px]">
                            {tuningLogs.length === 0 && <span className="text-gray-600 italic">Waiting to start...</span>}
                            {tuningLogs.map((log, idx) => (
                                <div key={idx} className={`${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-gray-300'}`}>
                                    <span className="opacity-50">[{log.timestamp}]</span> {log.message}
                                </div>
                            ))}
                        </div>

                        {/* Status Footer */}
                        <div className="bg-[#252526] p-4 border-t border-gray-700">
                             <div className="flex justify-between mb-2 text-xs">
                                 <span>Status: <span className={`${tuningStatus === 'training' ? 'text-blue-400 animate-pulse' : tuningStatus === 'completed' ? 'text-green-400' : 'text-gray-400'}`}>{t(`smartWasteDashboard.tuning.status.${tuningStatus}`)}</span></span>
                                 <span>{trainingProgress}%</span>
                             </div>
                             <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                                 <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${trainingProgress}%` }}></div>
                             </div>
                             {tuningStatus === 'completed' && (
                                 <div className="mt-3 pt-3 border-t border-gray-600 text-center">
                                     <span className="text-gray-400 block mb-1">{t('smartWasteDashboard.tuning.modelId')}</span>
                                     <code className="bg-black px-2 py-1 rounded text-green-500 select-all cursor-pointer">tuned-gemini-v2-waste-001</code>
                                 </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        );
      case 'special_grants':
        return (
            <div className="p-8 bg-white rounded-lg animate-fade-in border border-gray-200 shadow-sm">
                <div className="text-center mb-8">
                     <h3 className="text-2xl font-bold text-dark">{t('smartWasteDashboard.specialGrants.title')}</h3>
                     <p className="text-gray-600 mt-2">{t('smartWasteDashboard.specialGrants.subtitle')}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     {/* Grant Card 1: CIFIA */}
                     <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10 flex-grow">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-3">Priority 1</span>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{t('smartWasteDashboard.specialGrants.cifia.title')}</h4>
                            <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">{t('smartWasteDashboard.specialGrants.cifia.desc')}</p>
                            
                            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
                                    <p className="text-xl font-bold text-primary">{t('smartWasteDashboard.specialGrants.cifia.amount')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Deadline</p>
                                    <p className="font-semibold text-gray-800">{t('smartWasteDashboard.specialGrants.cifia.deadline')}</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => onViewGrant(cifiaGrant)}
                            className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                            {t('smartWasteDashboard.specialGrants.viewDetails')}
                        </button>
                     </div>

                     {/* Grant Card 2: SWIFR */}
                     <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group flex flex-col">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50 group-hover:scale-110 transition-transform"></div>
                        <div className="relative z-10 flex-grow">
                             <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-3">Priority 2</span>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">{t('smartWasteDashboard.specialGrants.swifr.title')}</h4>
                            <p className="text-sm text-gray-600 mb-4 h-12 overflow-hidden">{t('smartWasteDashboard.specialGrants.swifr.desc')}</p>
                            
                            <div className="flex justify-between items-end border-t border-gray-100 pt-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
                                    <p className="text-xl font-bold text-primary">{t('smartWasteDashboard.specialGrants.swifr.amount')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-500 uppercase tracking-wide">Deadline</p>
                                    <p className="font-semibold text-gray-800">{t('smartWasteDashboard.specialGrants.swifr.deadline')}</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => onViewGrant(swifrGrant)}
                            className="w-full py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                            {t('smartWasteDashboard.specialGrants.viewDetails')}
                        </button>
                     </div>
                </div>

                <div className="text-center">
                    <button 
                        onClick={() => setPage('grant_opportunities')}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary/30"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        {t('smartWasteDashboard.specialGrants.viewFullReport')}
                    </button>
                </div>
            </div>
        );
      case 'recycle_chain':
        const rc = t('smartWasteDashboard.recycleChain.rcDashboard');
        const tokenDistributionData = [
            { name: rc.minersReward, value: 45, color: '#4ade80' },
            { name: rc.liquidity, value: 25, color: '#60a5fa' },
            { name: rc.team, value: 15, color: '#a78bfa' },
            { name: rc.burn, value: 10, color: '#f87171' },
            { name: rc.dao, value: 5, color: '#fbbf24' },
        ];
        const nodeStatusData = [
            { name: rc.mining, value: 85, fill: '#4ade80' },
            { name: rc.syncing, value: 10, fill: '#60a5fa' },
            { name: rc.offline, value: 5, fill: '#f87171' },
        ];

        return (
            <div className="flex bg-[#0f172a] text-white min-h-[700px] rounded-xl overflow-hidden font-sans border border-gray-800 shadow-2xl">
                {/* Sidebar */}
                <div className="w-16 md:w-64 bg-[#1e293b] border-r border-gray-700 flex flex-col flex-shrink-0">
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-black text-black text-xl shadow-[0_0_15px_rgba(74,222,128,0.5)]">RC</div>
                            <div className="hidden md:block">
                                <h4 className="font-bold text-sm text-green-400">RecycleChain</h4>
                                <p className="text-[10px] text-gray-400 tracking-wider">Protocol v2.1.0</p>
                            </div>
                        </div>
                    </div>
                    
                    <nav className="flex-1 py-4 space-y-1">
                        <button onClick={() => setRcTab('dashboard')} className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${rcTab === 'dashboard' ? 'bg-[#334155] text-white border-green-500' : 'text-gray-400 hover:text-white border-transparent hover:bg-[#334155]'}`}>
                            <span className="text-lg">📊</span>
                            <span className="hidden md:block">{rc.sidebar.dashboard}</span>
                        </button>
                        <button onClick={() => setRcTab('wallet')} className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${rcTab === 'wallet' ? 'bg-[#334155] text-white border-green-500' : 'text-gray-400 hover:text-white border-transparent hover:bg-[#334155]'}`}>
                            <span className="text-lg">💼</span>
                            <span className="hidden md:block">{rc.sidebar.wallet}</span>
                        </button>
                        <button onClick={() => setRcTab('mining')} className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${rcTab === 'mining' ? 'bg-[#334155] text-white border-green-500' : 'text-gray-400 hover:text-white border-transparent hover:bg-[#334155]'}`}>
                            <span className="text-lg">⛏️</span>
                            <span className="hidden md:block">{rc.sidebar.mining}</span>
                        </button>
                        <button onClick={() => setRcTab('classification')} className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${rcTab === 'classification' ? 'bg-[#334155] text-white border-green-500' : 'text-gray-400 hover:text-white border-transparent hover:bg-[#334155]'}`}>
                            <span className="text-lg">🗑️</span>
                            <span className="hidden md:block">{rc.sidebar.classification}</span>
                        </button>
                        <button onClick={() => setRcTab('chat')} className={`w-full flex items-center gap-4 px-4 py-3 text-sm font-medium transition-colors border-l-4 ${rcTab === 'chat' ? 'bg-[#334155] text-white border-green-500' : 'text-gray-400 hover:text-white border-transparent hover:bg-[#334155]'}`}>
                            <span className="text-lg">🤖</span>
                            <span className="hidden md:block">{rc.sidebar.chat}</span>
                        </button>
                    </nav>

                    <div className="p-4 border-t border-gray-700">
                        <div className="text-center text-[10px] text-gray-500">
                            Powered by <br/><span className="text-green-500 font-bold">Gaia Chain</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-[#0f172a] overflow-y-auto p-4 md:p-8">
                    {rcTab === 'dashboard' && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-6">
                                <h2 className="text-2xl font-bold text-green-400 font-mono tracking-tight">{rc.title}</h2>
                                <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    {rc.networkStatus}
                                </span>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow-lg hover:border-gray-600 transition-colors">
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">{rc.blockHeight}</div>
                                    <div className="text-2xl font-mono text-white flex items-center justify-between">
                                        #0 
                                        <span className="text-lg opacity-50">⛓</span>
                                    </div>
                                </div>
                                <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow-lg hover:border-gray-600 transition-colors">
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">{rc.mempool}</div>
                                    <div className="text-2xl font-mono text-orange-400 flex items-center justify-between">
                                        1 
                                        <span className="text-lg opacity-50">⏳</span>
                                    </div>
                                </div>
                                <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow-lg hover:border-gray-600 transition-colors">
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">{rc.hashrate}</div>
                                    <div className="text-2xl font-mono text-blue-400 flex items-center justify-between">
                                        13.7 TH/s
                                        <span className="text-lg opacity-50">⚡</span>
                                    </div>
                                </div>
                                <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-700 shadow-lg hover:border-gray-600 transition-colors">
                                    <div className="text-gray-400 text-xs font-bold uppercase mb-1">{rc.price}</div>
                                    <div className="text-2xl font-mono text-purple-400 flex items-center justify-between">
                                        $2.47
                                        <span className="text-lg opacity-50">🪙</span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-green-400 font-bold mb-4 font-mono">{rc.distribution}</h3>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={tokenDistributionData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={60}
                                                    outerRadius={80}
                                                    paddingAngle={5}
                                                    dataKey="value"
                                                >
                                                    {tokenDistributionData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                                    ))}
                                                </Pie>
                                                <Tooltip 
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                                                    itemStyle={{ color: '#fff' }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs mt-4">
                                        {tokenDistributionData.map((d, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full" style={{backgroundColor: d.color}}></span>
                                                <span className="text-gray-300">{d.name}: {d.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#1e293b] p-6 rounded-xl border border-gray-700 shadow-lg">
                                    <h3 className="text-blue-400 font-bold mb-4 font-mono">{rc.nodeStatus}</h3>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={nodeStatusData} layout="vertical" margin={{ left: 40 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                                                <XAxis type="number" stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
                                                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={10} tick={false} />
                                                <Tooltip 
                                                    cursor={{fill: 'transparent'}}
                                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                                                />
                                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'insideLeft', fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }}>
                                                    {nodeStatusData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-400 mt-4 px-2">
                                        {nodeStatusData.map((d, i) => (
                                            <span key={i} style={{color: d.fill}}>{d.name}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-[#1e293b] border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                                <div className="px-6 py-4 border-b border-gray-700 bg-[#0f172a]/50">
                                    <h4 className="font-bold text-gray-100 font-mono">{rc.recentTxs}</h4>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-500 uppercase bg-[#0f172a] border-b border-gray-700">
                                            <tr>
                                                <th className="px-6 py-3">{rc.sender}</th>
                                                <th className="px-6 py-3">{rc.receiver}</th>
                                                <th className="px-6 py-3">{rc.amount}</th>
                                                <th className="px-6 py-3">{rc.type}</th>
                                                <th className="px-6 py-3 text-right">{rc.timestamp}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-700">
                                            {transactions.map((tx, idx) => (
                                                <tr key={idx} className="hover:bg-gray-700/30 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-blue-400">{tx.from}</td>
                                                    <td className="px-6 py-4 font-mono text-gray-300">{tx.to}</td>
                                                    <td className={`px-6 py-4 font-mono font-bold ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                                        {tx.amount}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${tx.type === 'Reward' ? 'bg-green-900/30 text-green-400 border border-green-500/30' : tx.type === 'Transfer' ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' : 'bg-red-900/30 text-red-400 border border-red-500/30'}`}>
                                                            {tx.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-gray-400 text-xs">
                                                        {tx.timestamp}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {rcTab === 'wallet' && (
                        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
                            <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-2">
                                💼 {rc.walletTitle}
                            </h2>

                            {/* Balance Card */}
                            <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 border border-green-700 shadow-[0_0_30px_rgba(16,185,129,0.2)] text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mt-10 -mr-10 blur-2xl"></div>
                                <p className="text-green-200 text-sm font-bold uppercase tracking-widest mb-2">{rc.yourBalance}</p>
                                <h3 className="text-5xl font-mono font-bold text-white mb-6">
                                    {walletState.balance.toFixed(2)} <span className="text-2xl text-green-400">PSC</span>
                                </h3>
                                <div className="bg-black/30 inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-white/10">
                                    <span className="text-xs text-gray-400">{rc.walletAddress}:</span>
                                    <code className="text-sm font-mono text-green-300">{walletState.walletAddress}</code>
                                    <button className="text-gray-400 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(walletState.walletAddress || '')}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    </button>
                                </div>
                            </div>

                            {/* Send Form */}
                            <div className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-lg">
                                <h3 className="text-xl font-bold text-white mb-6 border-b border-gray-700 pb-4">{rc.sendTx}</h3>
                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">{rc.recipient}</label>
                                        <input type="text" placeholder="0x..." className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">{rc.amount}</label>
                                            <input type="number" placeholder="0.00" className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">{rc.wasteType}</label>
                                            <select className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
                                                <option>Plastic</option>
                                                <option>Metal</option>
                                                <option>Glass</option>
                                                <option>Paper</option>
                                                <option>Organic</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">{rc.weight}</label>
                                        <input type="number" placeholder="0.0" className="w-full bg-[#0f172a] border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 font-mono" />
                                    </div>
                                    <button className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-900/50 transition-all transform hover:-translate-y-1 mt-4">
                                        {rc.sendBtn}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {(rcTab === 'mining' || rcTab === 'classification' || rcTab === 'chat') && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-50">
                            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-700 border-dashed">
                                <span className="text-4xl">🚧</span>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-400">Coming Soon</h3>
                                <p className="text-gray-500 mt-2">This module is under development for Protocol v2.2</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
      default:
        return null;
    }
  };

  const tabIcons: { [key in Tab]: React.ReactNode } = {
    report: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
    predict: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    analytics: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    tuning: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    special_grants: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    recycle_chain: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
  };

  const TabButton: React.FC<{ tab: Tab, label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
        activeTab === tab 
          ? 'bg-primary text-white shadow-md shadow-primary/25' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className={activeTab === tab ? 'opacity-100' : 'opacity-60'}>{tabIcons[tab]}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <section id="smart-dashboard" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8 sm:py-12 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <header className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{t('smartWasteDashboard.title')}</h1>
                        <p className="text-sm text-gray-500 mt-0.5">{language === 'fa' ? 'مدیریت و نظارت یکپارچه بر عملیات پسماند' : 'Unified waste operations management & monitoring'}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setPage('dashboard_lesson')} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 hover:text-primary-800 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-xl border border-primary-200 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {t('smartWasteDashboard.tutorial')}
                    </button>
                    <button onClick={() => setPage('home')} className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-xl transition-colors shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t('smartWasteDashboard.backButton')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex flex-wrap gap-1 overflow-x-auto">
                <TabButton tab="report" label={t('smartWasteDashboard.tabReport')} />
                <TabButton tab="predict" label={t('smartWasteDashboard.tabPredict')} />
                <TabButton tab="analytics" label={t('smartWasteDashboard.tabAnalytics')} />
                <TabButton tab="tuning" label={t('smartWasteDashboard.tabTuning')} />
                <TabButton tab="special_grants" label={t('smartWasteDashboard.tabSpecialGrants')} />
                <TabButton tab="recycle_chain" label={t('smartWasteDashboard.tabRecycleChain')} />
            </div>
        </header>
        
        {error && (
            <div className="mb-6 flex items-center gap-3 text-red-700 p-4 bg-red-50 border border-red-200 rounded-xl text-sm">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
            </div>
        )}

        <div className="mt-6">{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default SmartWasteDashboard;
