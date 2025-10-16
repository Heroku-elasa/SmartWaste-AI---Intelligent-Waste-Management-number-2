

import React, { useState, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import SiteHeader from './components/Header';
import HomePage from './components/Hero';
import WasteSiteAnalysisPage from './components/LegalDrafter';
import GrantFinderPage from './components/CafeFinderPage';
import SupplierFinderPage from './components/LawyerFinder';
import WasteNewsPage from './components/NewsSummarizer';
import AIResearcherPage from './components/AIResearcherPage';
import ProjectsPage from './components/StartupShowcase';
import ImpactReporterPage from './components/ConceptAnalyzer';
import RecyclingCalculatorPage from './components/StartupPlannerPage';
import AIAssistantPage from './components/BaristaCoach';
import WasteCollectorPage from './components/VideoGenerator';
import SmartWasteDashboard from './components/SmartWasteDashboard';
import SiteFooter from './components/Footer';
import QuotaErrorModal from './components/QuotaErrorModal';
import ConfirmationModal from './components/ConfirmationModal';

import { useLanguage, Page, Message, WasteSiteAnalysisInput, WasteSiteAnalysisResult, Grant, EnvironmentalReport, RecyclingCalculatorResult, NewsSummaryResult, ApplicationDraft, Supplier, ResearchReport, WasteAnalysisResult, WasteReport, WastePrediction, DashboardAnalytics } from './types';
import * as geminiService from './services/geminiService';

const initialWasteSiteInputs: WasteSiteAnalysisInput = {
  description: '',
  locationText: '',
  locationImage: null,
};

const App: React.FC = () => {
  const { language, t } = useLanguage();
  const [page, setPage] = useState<Page>('home');
  
  // State for Waste Site Analysis
  const [wasteSiteAnalysisInputs, setWasteSiteAnalysisInputs] = useState<WasteSiteAnalysisInput>(initialWasteSiteInputs);
  const [wasteSiteAnalysisResult, setWasteSiteAnalysisResult] = useState<WasteSiteAnalysisResult | null>(null);
  const [isAnalyzingWasteSite, setIsAnalyzingWasteSite] = useState(false);
  const [wasteSiteAnalysisError, setWasteSiteAnalysisError] = useState<string | null>(null);
  
  // State for Grant Finder
  const [grantFinderResults, setGrantFinderResults] = useState<Grant[] | null>(null);
  const [isFindingGrants, setIsFindingGrants] = useState(false);
  const [grantFinderError, setGrantFinderError] = useState<string | null>(null);

  // State for Supplier Finder
  const [supplierFinderResults, setSupplierFinderResults] = useState<Supplier[] | null>(null);
  const [isFindingSuppliers, setIsFindingSuppliers] = useState(false);
  const [supplierFinderError, setSupplierFinderError] = useState<string | null>(null);

  // State for Grant Application Drafter
  const [applicationDraft, setApplicationDraft] = useState<ApplicationDraft | null>(null);
  const [isGeneratingApplication, setIsGeneratingApplication] = useState(false);
  const [applicationError, setApplicationError] = useState<string | null>(null);

  // State for Impact Reporter
  const [impactReport, setImpactReport] = useState<EnvironmentalReport | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [reportError, setReportError] = useState<string | null>(null);

  // State for Recycling Calculator
  const [recyclingCalculatorResult, setRecyclingCalculatorResult] = useState<RecyclingCalculatorResult | null>(null);
  const [isCalculatingRecycling, setIsCalculatingRecycling] = useState(false);
  const [recyclingCalculatorError, setRecyclingCalculatorError] = useState<string | null>(null);

  // State for AI Assistant
  const [chat, setChat] = useState<Chat | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isChatStreaming, setIsChatStreaming] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // State for Waste & Recycling News
  const [newsResult, setNewsResult] = useState<NewsSummaryResult | null>(null);
  const [isResearchingNews, setIsResearchingNews] = useState(false);
  const [newsError, setNewsError] = useState<string | null>(null);

  // State for AI Researcher
  const [researchReport, setResearchReport] = useState<ResearchReport | null>(null);
  const [isResearching, setIsResearching] = useState(false);
  const [researchError, setResearchError] = useState<string | null>(null);
  
  // State for Waste Collector
  const [wasteAnalysisResult, setWasteAnalysisResult] = useState<WasteAnalysisResult | null>(null);
  const [isAnalyzingWaste, setIsAnalyzingWaste] = useState(false);
  const [wasteAnalysisError, setWasteAnalysisError] = useState<string | null>(null);
  
  // State for pickup confirmation
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false);

  // State for Smart Waste Dashboard
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSubmissionResult, setReportSubmissionResult] = useState<string | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<WastePrediction | null>(null);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(false);
  const [analyticsResult, setAnalyticsResult] = useState<DashboardAnalytics | null>(null);
  const [dashboardError, setDashboardError] = useState<string | null>(null);

  // Global State
  const [isQuotaExhausted, setIsQuotaExhausted] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  }, [language]);
  
  const handleApiError = (error: unknown): string => {
    console.error("API Error:", error);
    const errorString = (error instanceof Error) ? String(error) : JSON.stringify(error);
    if (errorString.includes('429') || errorString.includes('RESOURCE_EXHAUSTED')) {
       setIsQuotaExhausted(true);
       return t('quotaErrorModal.body');
    }
    return 'An unexpected error occurred. Please try again.';
  };

  // --- Smart Waste Dashboard Logic ---
  const handleWasteReportSubmit = async (report: WasteReport) => {
    setIsSubmittingReport(true);
    setDashboardError(null);
    setReportSubmissionResult(null);
    try {
      const result = await geminiService.submitWasteReport(report, language);
      setReportSubmissionResult(result);
    } catch (err) {
      setDashboardError(handleApiError(err));
    } finally {
      setIsSubmittingReport(false);
    }
  };

  const handleWastePrediction = async (location: string) => {
    setIsPredicting(true);
    setDashboardError(null);
    setPredictionResult(null);
    try {
      const result = await geminiService.predictWasteVolume(location, language);
      setPredictionResult(result);
    } catch (err) {
      setDashboardError(handleApiError(err));
    } finally {
      setIsPredicting(false);
    }
  };

  const handleFetchAnalytics = useCallback(async () => {
    setIsFetchingAnalytics(true);
    setDashboardError(null);
    setAnalyticsResult(null);
    try {
      // In a real app, these numbers would come from a backend. Here they are mocked.
      const mockMetrics = {
          aiAccuracy: 85,
          todayReports: 24,
          routingImprovement: 92,
      };
      const result = await geminiService.getDashboardAnalytics(mockMetrics, language);
      setAnalyticsResult(result);
    } catch (err) {
      setDashboardError(handleApiError(err));
    } finally {
      setIsFetchingAnalytics(false);
    }
  }, [language, t]);


  // --- AI Assistant Logic ---
  useEffect(() => {
    if (page === 'ai_assistant') {
      const newChat = geminiService.startChat(language);
      setChat(newChat);
      setChatHistory([{
        role: 'model',
        parts: [{ text: t('aiAssistantPage.welcomeMessage') }]
      }]);
    } else {
      setChat(null);
      setChatHistory([]);
    }
  }, [page, language, t]);

  const handleSendMessage = async (message: string) => {
    if (!chat) return;
    const userMessage: Message = { role: 'user', parts: [{ text: message }] };
    setChatHistory(prev => [...prev, userMessage]);
    setIsChatStreaming(true);
    setChatError(null);
    try {
      const stream = await chat.sendMessageStream({ message });
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse = chunk.text;
        setChatHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1].parts[0].text = fullResponse;
          return newHistory;
        });
      }
    } catch (err) {
      const errorMessage = handleApiError(err);
      setChatError(errorMessage);
      setChatHistory(prev => prev.slice(0, -1));
    } finally {
      setIsChatStreaming(false);
    }
  };

  // --- Waste Site Analysis Logic ---
  const handleGenerateWasteSiteAnalysis = useCallback(async () => {
    setIsAnalyzingWasteSite(true);
    setWasteSiteAnalysisError(null);
    setWasteSiteAnalysisResult(null);
    try {
      const result = await geminiService.generateWasteSiteAnalysis(wasteSiteAnalysisInputs, language);
      setWasteSiteAnalysisResult(result);
    } catch (err) {
      setWasteSiteAnalysisError(handleApiError(err));
    } finally {
      setIsAnalyzingWasteSite(false);
    }
  }, [wasteSiteAnalysisInputs, language]);

  // --- Grant Finder Logic ---
  const handleFindGrants = async (query: string) => {
    setIsFindingGrants(true);
    setGrantFinderError(null);
    setGrantFinderResults(null);
    setApplicationDraft(null);
    try {
      const results = await geminiService.findGrants(query, language);
      setGrantFinderResults(results);
    } catch (err) {
      setGrantFinderError(handleApiError(err));
    } finally {
      setIsFindingGrants(false);
    }
  };

  // --- Supplier Finder Logic ---
  const handleFindSuppliers = async (query: string) => {
    setIsFindingSuppliers(true);
    setSupplierFinderError(null);
    setSupplierFinderResults(null);
    try {
      const results = await geminiService.findSuppliers(query, language);
      setSupplierFinderResults(results);
    } catch (err) {
      setSupplierFinderError(handleApiError(err));
    } finally {
      setIsFindingSuppliers(false);
    }
  };

  // --- Grant Application Drafter Logic ---
  const handleGenerateApplication = async (projectDescription: string, grant: Grant) => {
    setIsGeneratingApplication(true);
    setApplicationError(null);
    setApplicationDraft(null);
    try {
      const result = await geminiService.generateApplicationDraft(projectDescription, grant, language);
      setApplicationDraft(result);
    } catch (err) {
      setApplicationError(handleApiError(err));
    } finally {
      setIsGeneratingApplication(false);
    }
  };

  // --- Impact Reporter Logic ---
  const handleGenerateImpactReport = async (description: string) => {
    setIsGeneratingReport(true);
    setReportError(null);
    setImpactReport(null);
    try {
      const result = await geminiService.generateImpactReport(description, language);
      setImpactReport(result);
    } catch (err) {
      setReportError(handleApiError(err));
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  // --- Recycling Calculator Logic ---
  const handleCalculateRecycling = async (monthlyWasteTonnes: number) => {
      setIsCalculatingRecycling(true);
      setRecyclingCalculatorError(null);
      setRecyclingCalculatorResult(null);
      try {
          const result = await geminiService.calculateRecyclingValue(monthlyWasteTonnes, language);
          setRecyclingCalculatorResult(result);
      } catch (err) {
          setRecyclingCalculatorError(handleApiError(err));
      } finally {
          setIsCalculatingRecycling(false);
      }
  };
  
  // --- Waste & Recycling News Logic ---
  const handleResearchNews = async (query: string) => {
    setIsResearchingNews(true);
    setNewsError(null);
    setNewsResult(null);
    try {
        const result = await geminiService.summarizeNews(query, language);
        setNewsResult(result);
    } catch (err) {
        setNewsError(handleApiError(err));
    } finally {
        setIsResearchingNews(false);
    }
  };

  // --- AI Researcher Logic ---
  const handleDeepResearch = async (query: string) => {
    setIsResearching(true);
    setResearchError(null);
    setResearchReport(null);
    try {
        const result = await geminiService.conductDeepResearch(query, language);
        setResearchReport(result);
    } catch (err) {
        setResearchError(handleApiError(err));
    } finally {
        setIsResearching(false);
    }
  };

  // --- Waste Collector Logic ---
  const handleAnalyzeWaste = async (image: { base64: string; mimeType: string; }) => {
    setIsAnalyzingWaste(true);
    setWasteAnalysisError(null);
    setWasteAnalysisResult(null);
    try {
        const result = await geminiService.analyzeWasteImage(image, language);
        setWasteAnalysisResult(result);
    } catch (err) {
        setWasteAnalysisError(handleApiError(err));
    } finally {
        setIsAnalyzingWaste(false);
    }
  };

  // --- Pickup Confirmation Logic ---
  const handleRequestPickup = () => {
    if (wasteAnalysisResult) {
      setIsConfirmationModalOpen(true);
      setIsPickupConfirmed(false); // Reset confirmation state
    }
  };
  
  const handleConfirmPickup = () => {
    // In a real app, this would trigger a backend API call.
    // Here, we just update the UI state to show a success message.
    setIsPickupConfirmed(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    // After a successful pickup is confirmed and the modal is closed, reset the state.
    if (isPickupConfirmed) {
      setWasteAnalysisResult(null);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 'smart_dashboard':
        return <SmartWasteDashboard
                  setPage={setPage}
                  onReportSubmit={handleWasteReportSubmit}
                  isSubmittingReport={isSubmittingReport}
                  reportSubmissionResult={reportSubmissionResult}
                  onPredict={handleWastePrediction}
                  isPredicting={isPredicting}
                  predictionResult={predictionResult}
                  onFetchAnalytics={handleFetchAnalytics}
                  isFetchingAnalytics={isFetchingAnalytics}
                  analyticsResult={analyticsResult}
                  error={dashboardError}
                />;
      case 'waste_collection':
        return <WasteCollectorPage
                  onAnalyze={handleAnalyzeWaste}
                  isLoading={isAnalyzingWaste}
                  error={wasteAnalysisError}
                  result={wasteAnalysisResult}
                  onRequestPickup={handleRequestPickup}
                />;
      case 'waste_site_analysis':
        return <WasteSiteAnalysisPage
                  onGenerate={handleGenerateWasteSiteAnalysis}
                  isLoading={isAnalyzingWasteSite}
                  error={wasteSiteAnalysisError}
                  inputs={wasteSiteAnalysisInputs}
                  setInputs={setWasteSiteAnalysisInputs}
                  result={wasteSiteAnalysisResult}
                  isQuotaExhausted={isQuotaExhausted}
                />;
      case 'grant_finder':
        return <GrantFinderPage
                  onSearch={handleFindGrants}
                  isLoading={isFindingGrants}
                  error={grantFinderError}
                  results={grantFinderResults}
                  isQuotaExhausted={isQuotaExhausted}
                  onGenerateApplication={handleGenerateApplication}
                  isGeneratingApplication={isGeneratingApplication}
                  applicationDraft={applicationDraft}
                  applicationError={applicationError}
                />;
      case 'supplier_finder':
        return <SupplierFinderPage
                  onSearch={handleFindSuppliers}
                  isLoading={isFindingSuppliers}
                  error={supplierFinderError}
                  results={supplierFinderResults}
                  isQuotaExhausted={isQuotaExhausted}
                />;
      case 'impact_reporter':
        return <ImpactReporterPage
                  onGenerate={handleGenerateImpactReport}
                  isLoading={isGeneratingReport}
                  error={reportError}
                  report={impactReport}
                  isQuotaExhausted={isQuotaExhausted}
                />;
      case 'waste_news':
        return <WasteNewsPage
                  onSearch={handleResearchNews}
                  isLoading={isResearchingNews}
                  error={newsError}
                  result={newsResult}
                />;
      case 'ai_researcher':
        return <AIResearcherPage
                  onSearch={handleDeepResearch}
                  isLoading={isResearching}
                  error={researchError}
                  report={researchReport}
                />;
      case 'projects_showcase':
        return <ProjectsPage setPage={setPage} />;
      case 'ai_assistant':
        return <AIAssistantPage
                  chatHistory={chatHistory}
                  isStreaming={isChatStreaming}
                  error={chatError}
                  onSendMessage={handleSendMessage}
                />;
      case 'recycling_calculator':
        return <RecyclingCalculatorPage 
                  onCalculate={handleCalculateRecycling}
                  isLoading={isCalculatingRecycling}
                  error={recyclingCalculatorError}
                  result={recyclingCalculatorResult}
                  isQuotaExhausted={isQuotaExhausted}
                />;
      case 'home':
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="bg-light text-dark min-h-screen">
      <SiteHeader 
        currentPage={page} 
        setPage={setPage}
      />
      <main>
        {renderPage()}
      </main>
      <SiteFooter setPage={setPage} />
      <QuotaErrorModal 
        isOpen={isQuotaExhausted} 
        onClose={() => setIsQuotaExhausted(false)}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={handleConfirmPickup}
        result={wasteAnalysisResult}
        isConfirmed={isPickupConfirmed}
      />
    </div>
  );
};

export default App;