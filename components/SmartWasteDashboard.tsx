

import React, { useState, useEffect } from 'react';
import { useLanguage, Page, WasteReport, WastePrediction, DashboardAnalytics } from '../types';

type Tab = 'report' | 'predict' | 'analytics';
type ReportStatus = 'Pending' | 'En Route' | 'Completed';

interface LiveWasteReport extends WasteReport {
  id: number;
  status: ReportStatus;
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
}

const SmartWasteDashboard: React.FC<SmartWasteDashboardProps> = (props) => {
    const { 
        setPage, 
        onReportSubmit, isSubmittingReport, reportSubmissionResult,
        onPredict, isPredicting, predictionResult,
        onFetchAnalytics, isFetchingAnalytics, analyticsResult,
        error 
    } = props;
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('report');
  const [predictionLocation, setPredictionLocation] = useState('');
  
  // Mock data for the live feed
  const initialRequests: LiveWasteReport[] = [
    { id: 1, location: 'Tehran, Velenjak', wasteType: 'Recyclable', volume: 'Large', status: 'Pending', description: '' },
    { id: 2, location: 'Tehran, Saadat Abad', wasteType: 'Mixed', volume: 'Medium', status: 'Pending', description: '' },
    { id: 3, location: 'Karaj, Mehrshahr', wasteType: 'Organic', volume: 'Small', status: 'En Route', description: '' },
    { id: 4, location: 'Tehran, Ekbatan', wasteType: 'Hazardous', volume: 'Small', status: 'Completed', description: '' },
  ];
  
  const [requests, setRequests] = useState<LiveWasteReport[]>(initialRequests);
  
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'report':
        const statusColors: { [key in ReportStatus]: string } = {
            Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            'En Route': 'bg-blue-100 text-blue-800 border-blue-200',
            Completed: 'bg-green-100 text-green-800 border-green-200',
        };
        return (
          <div className="p-6 bg-white rounded-lg animate-fade-in border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-dark">{t('smartWasteDashboard.liveFeed.title')}</h3>
            <p className="text-sm text-gray-600 mb-6">{t('smartWasteDashboard.liveFeed.subtitle')}</p>
            <div className="space-y-3">
              {requests.map((req) => (
                <div key={req.id} className="bg-white p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border border-gray-200">
                    <div className="flex-1">
                        <p className="font-bold text-dark">{req.location}</p>
                        <p className="text-xs text-gray-500">{req.wasteType} &bull; {req.volume}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusColors[req.status]}`}>{t(`smartWasteDashboard.liveFeed.statuses.${req.status.toLowerCase().replace(' ', '')}`)}</span>
                        <button 
                            onClick={() => handleDispatch(req.id)}
                            disabled={req.status !== 'Pending'}
                            className="px-4 py-1.5 text-xs font-semibold text-white bg-primary rounded-md hover:bg-primary-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {t('smartWasteDashboard.liveFeed.dispatch')}
                        </button>
                    </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'predict':
        return (
            <div className="p-6 bg-white rounded-lg animate-fade-in border border-gray-200 shadow-sm">
                <div className="text-center">
                    <div className="flex items-center justify-center text-blue-600 bg-blue-100 rounded-full w-12 h-12 mx-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <h3 className="text-lg font-semibold text-dark mt-4">{t('smartWasteDashboard.prediction.title')}</h3>
                    <p className="text-sm text-gray-600 mt-1">{t('smartWasteDashboard.prediction.subtitle')}</p>
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); handlePredictClick(); }} className="mt-6 space-y-2">
                    <div>
                        <label htmlFor="prediction-location" className="sr-only">
                            {t('smartWasteDashboard.prediction.locationLabel')}
                        </label>
                        <input
                            id="prediction-location"
                            type="text"
                            value={predictionLocation}
                            onChange={(e) => setPredictionLocation(e.target.value)}
                            placeholder={t('smartWasteDashboard.prediction.locationPlaceholder')}
                            className="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark placeholder-gray-500"
                        />
                        <ExamplePrompts 
                            prompts={t('examplePrompts.smartPrediction')} 
                            onPromptClick={setPredictionLocation} 
                            t={t} 
                        />
                    </div>
                    
                    <button type="submit" disabled={isPredicting || !predictionLocation.trim()} className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-600 disabled:bg-gray-400 transition-colors !mt-4">
                        {isPredicting ? t('smartWasteDashboard.prediction.predicting') : t('smartWasteDashboard.prediction.button')}
                    </button>
                </form>

                <div className="mt-4 p-4 border border-dashed border-gray-300 rounded-md min-h-[100px] flex items-center justify-center text-center">
                    {isPredicting && (
                        <div>
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary mx-auto"></div>
                            <p className="mt-3 text-sm text-gray-600">{t('smartWasteDashboard.prediction.predicting')}</p>
                        </div>
                    )}
                    {predictionResult && !isPredicting && <p className="text-gray-800">{predictionResult.predictionText}</p>}
                    {!isPredicting && !predictionResult && <p className="text-gray-500">{t('smartWasteDashboard.prediction.placeholder')}</p>}
                </div>
            </div>
        );
      case 'analytics':
        return (
            <div className="p-6 bg-white rounded-lg animate-fade-in border border-gray-200 shadow-sm">
                 <h3 className="text-lg font-semibold text-dark text-center">{t('smartWasteDashboard.analytics.title')}</h3>
                 {isFetchingAnalytics && <p className="text-center text-gray-500 mt-4">{t('smartWasteDashboard.analytics.summaryPlaceholder')}</p>}
                 {analyticsResult && (
                     <div className="mt-6 space-y-4">
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">{t('smartWasteDashboard.analytics.aiAccuracy')}</p>
                                <p className="text-3xl font-bold text-primary">{analyticsResult.aiAccuracy}%</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">{t('smartWasteDashboard.analytics.todayReports')}</p>
                                <p className="text-3xl font-bold text-primary">{analyticsResult.todayReports}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-gray-500">{t('smartWasteDashboard.analytics.routingImprovement')}</p>
                                <p className="text-3xl font-bold text-primary">{analyticsResult.routingImprovement}%</p>
                            </div>
                         </div>
                         <div className="pt-4">
                             <h4 className="font-semibold text-dark">{t('smartWasteDashboard.analytics.performanceReport')}</h4>
                             <p className="text-sm text-gray-700 mt-2">{analyticsResult.summary}</p>
                         </div>
                     </div>
                 )}
            </div>
        );
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tab: Tab, label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab ? 'bg-primary text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      {label}
    </button>
  );

  return (
    <section id="smart-dashboard" className="py-12 sm:py-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-dark">{t('smartWasteDashboard.title')}</h1>
            <button onClick={() => setPage('home')} className="text-sm font-medium text-primary-600 hover:text-primary-500">
                &larr; {t('smartWasteDashboard.backButton')}
            </button>
        </header>

        <div className="p-1 bg-gray-200/70 rounded-lg flex items-center space-x-1 rtl:space-x-reverse mb-4">
          <TabButton tab="report" label={t('smartWasteDashboard.tabReport')} />
          <TabButton tab="predict" label={t('smartWasteDashboard.tabPredict')} />
          <TabButton tab="analytics" label={t('smartWasteDashboard.tabAnalytics')} />
        </div>
        
        {error && <div className="my-4 text-red-700 p-3 bg-red-100 border border-red-300 rounded-md text-sm">{error}</div>}

        <div>{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default SmartWasteDashboard;