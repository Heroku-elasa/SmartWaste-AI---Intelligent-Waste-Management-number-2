
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { translations } from './constants';

export type Language = 'en' | 'fa';
export type Page = 'home' | 'waste_collection' | 'smart_dashboard' | 'waste_site_analysis' | 'grant_finder' | 'impact_reporter' | 'waste_news' | 'ai_assistant' | 'recycling_calculator' | 'supplier_finder' | 'ai_researcher' | 'zero_waste' | 'real_time_dashboard' | 'dashboard_lesson' | 'wordpress_dashboard' | 'grant_opportunities';


export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: { [key: string]: string | number }) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fa');

  const t = (key: string, replacements: { [key: string]: string | number } = {}): any => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        console.warn(`Translation not found for key: ${key}`);
        return key;
      }
    }

    if (typeof result === 'string') {
      return Object.entries(replacements).reduce((acc, [placeholder, value]) => {
        return acc.replace(new RegExp(`{${placeholder}}`, 'g'), String(value));
      }, result);
    }
    
    return result;
  };

  return React.createElement(LanguageContext.Provider, { value: { language, setLanguage, t } }, children);
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// --- SmartWaste AI Types ---

// For Smart Waste Dashboard
export interface WasteReport {
  location: string;
  wasteType: 'Mixed' | 'Recyclable' | 'Organic' | 'Hazardous';
  volume: 'Small' | 'Medium' | 'Large';
  description?: string;
}

export interface WastePrediction {
    predictionText: string;
}

export interface DashboardAnalytics {
    aiAccuracy: number;
    todayReports: number;
    routingImprovement: number;
    summary: string;
}

export interface TuningHyperparameters {
  epochs: number;
  batchSize: number;
  learningRate: number;
}

export interface TuningLog {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error';
}


// For Waste Collection Page
export interface WasteItem {
  item: string;
  category: 'Recycling' | 'Landfill' | 'Compost' | 'Special';
  instructions: string;
}

export interface WasteAnalysisResult {
  identifiedItems: WasteItem[];
  estimatedWeightKg: number;
  pickupQuote: number;
  recyclingPotential: string;
}

// For Waste Site Analysis Page
export interface WasteSiteAnalysisInput {
  description: string;
  locationText: string;
  locationImage: {
    base64: string;
    mimeType: string;
  } | null;
}

export interface BinRecommendation {
  binType: string;
  binCount: number;
  reasoning: string;
}

export interface MonthlyData {
  month: string;
  value: number;
}

export interface WasteSiteAnalysisResult {
  siteSuitability: string;
  estimatedMonthlyDiversion: {
    total: string;
    monthlyBreakdown: MonthlyData[];
  };
  potentialAnnualSavings: {
    total: string;
    monthlyBreakdown: MonthlyData[];
  };
  recommendations: BinRecommendation[];
  logisticsConsiderations: string[];
}

// For Recycling Calculator Page
export interface RecyclingCalculatorResult {
    annualLandfillFeeSavings: number;
    annualRecyclingRevenue: number;
    totalAnnualBenefit: number;
    notes: string;
}

// For Zero Waste Page
export interface ZeroWasteTip {
  title: string;
  description: string;
  difficulty: "very-easy" | "easy" | "medium" | "hard";
  estimatedCost: "no-cost" | "low" | "medium" | "high";
}

export interface ZeroWasteAdviceOutput {
  summary: string;
  tips: ZeroWasteTip[];
}

export interface ContentGenerationResult {
  title: string;
  platform: 'YouTube' | 'Book';
  content: string; // Markdown script or story
  monetizationTips: string[];
}

export interface ZeroWasteProduct {
  part: string;
  category: string;
  name: string;
  description: string;
  price: string;
  goal: string;
  searchTerm: string;
}

// Common Types
export interface Grant {
  grantTitle: string; 
  name?: string; 
  issuingAgency?: string; 
  fundingBody?: string;
  description?: string; 
  summary?: string;
  eligibility: string;
  link: string;
  // New fields for GrantFinder
  linkTitle?: string;
  requirementDocuments?: { title: string; url: string }[];
  relevanceScore?: number;
  amount?: string;
  geography?: string;
  deadline?: string;
  notes?: string;
}

export interface GrantSummary {
    grantTitle: string;
    relevancePercentage: number;
    fundingBody: string;
    deadline: string;
    amount: string;
    duration: string;
    geography: string;
    eligibility: string;
    scope: string;
    howToApply: string;
    contact: string;
}

export interface EnvironmentalReport {
  executiveSummary: string;
  positiveImpacts: string[];
  potentialRisks: string[];
  mitigationStrategies: string[];
  sustainabilityScore: number; // Out of 100
}

export interface Project {
  name: string;
  image: string;
  description: string;
  link?: Page;
  color?: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface NewsSummaryResult {
  summary: string;
  sources: { title: string; uri: string; }[];
  suggestedQueries: string[];
}

export interface ApplicationDraft {
  businessPlanOutline: {
    section: string;
    content: string;
  }[];
  applicationSections: {
    sectionTitle: string;
    draftedContent: string;
  }[];
  nextSteps: string[];
}

export interface Supplier {
  name: string;
  description: string;
  websiteUrl: string;
}

export interface KeyFinding {
  finding: string;
  explanation: string;
}

export interface ConceptExplanation {
  concept: string;
  definition: string;
}

export interface ResearchReport {
  keyFindings: KeyFinding[];
  detailedSummary: string;
  keyConcepts: ConceptExplanation[];
  futureOutlook: string;
  sources: { title: string; uri: string; }[];
}

// For AI Assistant (Chat)
export interface Message {
  role: 'user' | 'model';
  parts: [{ text: string }];
}
