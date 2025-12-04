import React, { useState, useEffect } from 'react';
import { useLanguage, Page, WasteReport, WastePrediction, DashboardAnalytics, TuningHyperparameters, TuningLog, Grant } from '../types';

type Tab = 'report' | 'predict' | 'analytics' | 'tuning' | 'special_grants';
type ReportStatus = 'Pending' | 'En Route' | 'Completed';
type ViewMode = 'list' | 'map';

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
                className="absolute flex flex-col items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform duration-200 hover:z